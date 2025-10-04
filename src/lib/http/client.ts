import redaxios, { Options } from 'redaxios'
import type { RequestConfig } from './types'

/**
 * HTTP 客户端配置
 */

// 获取环境变量的辅助函数
const getEnvVar = (key: string, defaultValue: string): string => {
    if (typeof window !== 'undefined') {
        // 浏览器环境
        return (window as any).__ENV__?.[key] || defaultValue
    }
    // 构建时环境变量 - 使用静态值避免 import.meta 问题
    return defaultValue
}

// 环境配置
const config: Options = {
    // 基础 URL - 可以通过环境变量配置
    baseURL: getEnvVar('VITE_API_BASE_URL', 'https://jsonplaceholder.typicode.com'),
    // 默认请求头
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
}

// 创建 redaxios 实例
export const httpClient = redaxios.create(config)

// 导出默认实例
export default httpClient

// 合并配置的辅助函数
const mergeConfig = (config?: RequestConfig): Options => {
    if (!config) return {}

    const { skipAuth, skipErrorHandler, retries, ...restConfig } = config
    return restConfig as Options
}

// 导出便捷方法
export const http = {
    get: <T = any>(url: string, config?: RequestConfig) =>
        httpClient.get<T>(url, mergeConfig(config)),

    post: <T = any>(url: string, data?: any, config?: RequestConfig) =>
        httpClient.post<T>(url, data, mergeConfig(config)),

    put: <T = any>(url: string, data?: any, config?: RequestConfig) =>
        httpClient.put<T>(url, data, mergeConfig(config)),

    patch: <T = any>(url: string, data?: any, config?: RequestConfig) =>
        httpClient.patch<T>(url, data, mergeConfig(config)),

    delete: <T = any>(url: string, config?: RequestConfig) =>
        httpClient.delete<T>(url, mergeConfig(config)),
}

// 请求重试工具函数
export const withRetry = async <T>(
    requestFn: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
): Promise<T> => {
    let lastError: Error

    for (let i = 0; i <= maxRetries; i++) {
        try {
            return await requestFn()
        } catch (error) {
            lastError = error as Error

            // 如果是最后一次重试，直接抛出错误
            if (i === maxRetries) {
                throw lastError
            }

            // 等待一段时间后重试
            await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)))
        }
    }

    throw lastError!
}

// 取消请求工具
export const createCancelToken = () => {
    const controller = new AbortController()
    return {
        token: controller.signal,
        cancel: (reason?: string) => controller.abort(reason),
    }
}