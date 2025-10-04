/**
 * API 服务统一导出
 */

// 导出基础服务类
export { BaseApiService, createApiService, extractData, extractPaginatedData } from './base'

// 导出文章相关 API
export { postApi, PostApiService } from './posts'

// 导出 HTTP 相关
export { http, setAuthToken, getAuthToken, setupInterceptors, withRetry } from '../../lib/http/interceptors'
export { httpClient } from '../../lib/http/client'
export type {
    ApiResponse,
    PaginatedResponse,
    PaginationParams,
    ApiError,
    RequestConfig
} from '../../lib/http/types'

// 创建统一的 API 对象
import { postApi } from './posts'

export const api = {
    posts: postApi,
}

// 导出默认 API 对象
export default api