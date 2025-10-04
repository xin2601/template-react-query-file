import { http } from '../../lib/http/interceptors'
import type {
    ApiResponse,
    PaginatedResponse,
    PaginationParams,
    RequestConfig
} from '../../lib/http/types'

/**
 * 基础 API 服务类
 */
export abstract class BaseApiService<T, CreateT = Partial<T>, UpdateT = Partial<T>> {
    protected baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    /**
     * 获取单个资源
     */
    async getById(id: number | string, config?: RequestConfig): Promise<T> {
        const response = await http.get<ApiResponse<T>>(`${this.baseUrl}/${id}`, config)
        return response.data.data
    }

    /**
     * 获取资源列表
     */
    async getList(params?: PaginationParams, config?: RequestConfig): Promise<T[]> {
        const queryParams = new URLSearchParams()

        if (params?.page) queryParams.append('page', params.page.toString())
        if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString())
        if (params?.sortBy) queryParams.append('sortBy', params.sortBy)
        if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder)

        const url = queryParams.toString()
            ? `${this.baseUrl}?${queryParams.toString()}`
            : this.baseUrl

        const response = await http.get<ApiResponse<T[]>>(url, config)
        return response.data.data
    }

    /**
     * 获取分页资源列表
     */
    async getPaginatedList(
        params?: PaginationParams,
        config?: RequestConfig
    ): Promise<PaginatedResponse<T>['data']> {
        const queryParams = new URLSearchParams()

        if (params?.page) queryParams.append('page', params.page.toString())
        if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString())
        if (params?.sortBy) queryParams.append('sortBy', params.sortBy)
        if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder)

        const url = queryParams.toString()
            ? `${this.baseUrl}?${queryParams.toString()}`
            : this.baseUrl

        const response = await http.get<PaginatedResponse<T>>(url, config)
        return response.data.data
    }

    /**
     * 创建资源
     */
    async create(data: CreateT, config?: RequestConfig): Promise<T> {
        const response = await http.post<ApiResponse<T>>(this.baseUrl, data, config)
        return response.data.data
    }

    /**
     * 更新资源
     */
    async update(id: number | string, data: UpdateT, config?: RequestConfig): Promise<T> {
        const response = await http.put<ApiResponse<T>>(`${this.baseUrl}/${id}`, data, config)
        return response.data.data
    }

    /**
     * 部分更新资源
     */
    async patch(id: number | string, data: Partial<UpdateT>, config?: RequestConfig): Promise<T> {
        const response = await http.patch<ApiResponse<T>>(`${this.baseUrl}/${id}`, data, config)
        return response.data.data
    }

    /**
     * 删除资源
     */
    async delete(id: number | string, config?: RequestConfig): Promise<void> {
        await http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`, config)
    }

    /**
     * 批量删除资源
     */
    async batchDelete(ids: (number | string)[], config?: RequestConfig): Promise<void> {
        await http.post<ApiResponse<void>>(`${this.baseUrl}/batch-delete`, { ids }, config)
    }

    /**
     * 检查资源是否存在
     */
    async exists(id: number | string, config?: RequestConfig): Promise<boolean> {
        try {
            await this.getById(id, config)
            return true
        } catch (error: any) {
            if (error.code === 404) {
                return false
            }
            throw error
        }
    }

    /**
     * 获取资源总数
     */
    async count(params?: Record<string, any>, config?: RequestConfig): Promise<number> {
        const queryParams = new URLSearchParams()

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    queryParams.append(key, value.toString())
                }
            })
        }

        const url = queryParams.toString()
            ? `${this.baseUrl}/count?${queryParams.toString()}`
            : `${this.baseUrl}/count`

        const response = await http.get<ApiResponse<{ count: number }>>(url, config)
        return response.data.data.count
    }
}

/**
 * 创建简单的 API 服务实例
 */
export const createApiService = <T, CreateT = Partial<T>, UpdateT = Partial<T>>(
    baseUrl: string
) => {
    return new (class extends BaseApiService<T, CreateT, UpdateT> {
        constructor() {
            super(baseUrl)
        }
    })()
}

/**
 * API 响应数据提取工具
 */
export const extractData = <T>(response: ApiResponse<T>): T => {
    if (!response.success) {
        throw new Error(response.message || '请求失败')
    }
    return response.data
}

/**
 * 分页数据提取工具
 */
export const extractPaginatedData = <T>(response: PaginatedResponse<T>) => {
    if (!response.success) {
        throw new Error(response.message || '请求失败')
    }
    return response.data
}