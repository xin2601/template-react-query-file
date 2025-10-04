/**
 * API 响应格式适配器
 * 用于创建标准的 API 响应格式
 */

import type { ApiResponse, PaginatedResponse } from '../../lib/http/types'

/**
 * 创建模拟的 API 响应格式
 */
export const createMockApiResponse = <T>(
    data: T,
    success: boolean = true,
    message?: string
): ApiResponse<T> => {
    return {
        code: success ? 200 : 500,
        message: message || (success ? 'success' : 'error'),
        data,
        success,
    }
}

/**
 * 创建模拟的分页响应格式
 */
export const createMockPaginatedResponse = <T>(
    items: T[],
    page: number = 1,
    pageSize: number = 10,
    total?: number
): PaginatedResponse<T> => {
    const actualTotal = total ?? items.length
    const totalPages = Math.ceil(actualTotal / pageSize)

    return {
        code: 200,
        message: 'success',
        data: {
            items,
            total: actualTotal,
            page,
            pageSize,
            totalPages,
        },
        success: true,
    }
}

/**
 * 创建错误响应格式
 */
export const createErrorResponse = <T = any>(
    message: string,
    code: number = 500,
    data?: T
): ApiResponse<T> => {
    return {
        code,
        message,
        data: data as T,
        success: false,
    }
}

/**
 * 创建成功响应格式
 */
export const createSuccessResponse = <T>(
    data: T,
    message: string = 'success'
): ApiResponse<T> => {
    return {
        code: 200,
        message,
        data,
        success: true,
    }
}