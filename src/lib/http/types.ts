/**
 * HTTP 相关公共类型定义
 */

// 基础 API 响应格式
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  success: boolean
}

// 分页响应格式
export interface PaginatedResponse<T = any> {
  code: number
  message: string
  data: {
    items: T[]
    total: number
    page: number
    pageSize: number
    totalPages: number
  }
  success: boolean
}

// 分页查询参数
export interface PaginationParams {
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// HTTP 错误类型
export interface ApiError {
  code: number
  message: string
  details?: any
  timestamp?: string
}

// 请求配置扩展
export interface RequestConfig {
  skipAuth?: boolean
  skipErrorHandler?: boolean
  timeout?: number
  retries?: number
}