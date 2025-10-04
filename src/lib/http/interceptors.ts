import { httpClient } from './client'
import type { ApiError } from './types'

/**
 * HTTP 拦截器配置
 */

// 存储认证 token
let authToken: string | null = null

// 设置认证 token
export const setAuthToken = (token: string | null) => {
    authToken = token
    if (token) {
        localStorage.setItem('auth_token', token)
    } else {
        localStorage.removeItem('auth_token')
    }
}

// 获取认证 token
export const getAuthToken = (): string | null => {
    if (authToken) return authToken

    // 从 localStorage 获取
    if (typeof window !== 'undefined') {
        authToken = localStorage.getItem('auth_token')
    }

    return authToken
}

// 检查是否为开发环境
const isDevelopment = () => {
    return typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' ||
            window.location.hostname === '127.0.0.1' ||
            window.location.hostname.includes('dev'))
}

// 请求包装器 - 添加认证和日志
export const wrapRequest = async <T>(
    requestFn: () => Promise<T>,
    config?: { skipAuth?: boolean; skipErrorHandler?: boolean }
): Promise<T> => {
    try {
        // 生成请求 ID
        const requestId = Math.random().toString(36).substr(2, 9)

        // 请求日志
        if (isDevelopment()) {
            console.log(`[HTTP Request ${requestId}]`, {
                timestamp: new Date().toISOString(),
                config,
            })
        }

        const response = await requestFn()

        // 响应日志
        if (isDevelopment()) {
            console.log(`[HTTP Response ${requestId}]`, {
                timestamp: new Date().toISOString(),
                response,
            })
        }

        return response
    } catch (error: any) {
        // 错误处理
        const apiError: ApiError = {
            code: error.status || error.response?.status || 500,
            message: error.message || '网络请求失败',
            details: error.response?.data,
            timestamp: new Date().toISOString(),
        }

        // 错误日志
        if (isDevelopment()) {
            console.error('[HTTP Error]', apiError)
        }

        // 处理特定错误状态
        if (apiError.code === 401) {
            // 未授权，清除 token
            setAuthToken(null)
            // 触发未授权事件
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('auth:unauthorized'))
            }
        } else if (apiError.code === 403) {
            // 禁止访问
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('auth:forbidden'))
            }
        } else if (apiError.code >= 500) {
            // 服务器错误
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('http:server-error', {
                    detail: apiError
                }))
            }
        }

        // 重新抛出错误
        throw apiError
    }
}

// 带认证的 HTTP 客户端
export const httpWithAuth = {
    get: async <T = any>(url: string, config?: any) => {
        return wrapRequest(async () => {
            const token = getAuthToken()
            const headers = {
                ...config?.headers,
                ...(token && !config?.skipAuth ? { Authorization: `Bearer ${token}` } : {}),
            }

            return httpClient.get<T>(url, { ...config, headers })
        }, config)
    },

    post: async <T = any>(url: string, data?: any, config?: any) => {
        return wrapRequest(async () => {
            const token = getAuthToken()
            const headers = {
                ...config?.headers,
                ...(token && !config?.skipAuth ? { Authorization: `Bearer ${token}` } : {}),
            }

            return httpClient.post<T>(url, data, { ...config, headers })
        }, config)
    },

    put: async <T = any>(url: string, data?: any, config?: any) => {
        return wrapRequest(async () => {
            const token = getAuthToken()
            const headers = {
                ...config?.headers,
                ...(token && !config?.skipAuth ? { Authorization: `Bearer ${token}` } : {}),
            }

            return httpClient.put<T>(url, data, { ...config, headers })
        }, config)
    },

    patch: async <T = any>(url: string, data?: any, config?: any) => {
        return wrapRequest(async () => {
            const token = getAuthToken()
            const headers = {
                ...config?.headers,
                ...(token && !config?.skipAuth ? { Authorization: `Bearer ${token}` } : {}),
            }

            return httpClient.patch<T>(url, data, { ...config, headers })
        }, config)
    },

    delete: async <T = any>(url: string, config?: any) => {
        return wrapRequest(async () => {
            const token = getAuthToken()
            const headers = {
                ...config?.headers,
                ...(token && !config?.skipAuth ? { Authorization: `Bearer ${token}` } : {}),
            }

            return httpClient.delete<T>(url, { ...config, headers })
        }, config)
    },
}

// 错误重试机制
export const withRetry = async <T>(
    requestFn: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000,
    shouldRetry?: (error: ApiError) => boolean
): Promise<T> => {
    let lastError: ApiError

    for (let i = 0; i <= maxRetries; i++) {
        try {
            return await requestFn()
        } catch (error) {
            lastError = error as ApiError

            // 检查是否应该重试
            if (shouldRetry && !shouldRetry(lastError)) {
                throw lastError
            }

            // 某些错误不应该重试
            if (lastError.code === 401 || lastError.code === 403 || lastError.code === 404) {
                throw lastError
            }

            // 如果是最后一次重试，直接抛出错误
            if (i === maxRetries) {
                throw lastError
            }

            // 等待一段时间后重试（指数退避）
            await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)))
        }
    }

    throw lastError!
}

// 初始化拦截器
export const setupInterceptors = () => {
    // 从 localStorage 恢复 token
    if (typeof window !== 'undefined') {
        const savedToken = localStorage.getItem('auth_token')
        if (savedToken) {
            setAuthToken(savedToken)
        }
    }
}

// 导出默认的 HTTP 客户端（带认证）
export const http = httpWithAuth