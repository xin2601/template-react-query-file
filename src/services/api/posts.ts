import { BaseApiService } from './base'
import { http } from '../../lib/http/interceptors'
import type {
    ApiResponse,
    PaginatedResponse,
    RequestConfig
} from '../../lib/http/types'
import type {
    Post,
    CreatePostRequest,
    UpdatePostRequest,
    PostQueryParams
} from '../../types'

/**
 * 文章 API 服务类
 */
class PostApiService extends BaseApiService<Post, CreatePostRequest, UpdatePostRequest> {
    constructor() {
        super('/posts')
    }

    /**
     * 根据作者 ID 获取文章列表
     */
    async getByAuthor(authorId: number, params?: PostQueryParams, config?: RequestConfig): Promise<Post[]> {
        const queryParams = new URLSearchParams()
        queryParams.append('authorId', authorId.toString())

        if (params?.page) queryParams.append('page', params.page.toString())
        if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString())
        if (params?.sortBy) queryParams.append('sortBy', params.sortBy)
        if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder)
        if (params?.status) queryParams.append('status', params.status)
        if (params?.search) queryParams.append('search', params.search)
        if (params?.tags) {
            params.tags.forEach((tag: string) => queryParams.append('tags', tag))
        }

        const url = `${this.baseUrl}?${queryParams.toString()}`
        const response = await http.get<ApiResponse<Post[]>>(url, config)
        return response.data.data
    }

    /**
     * 分页获取作者文章
     */
    async getByAuthorPaginated(
        authorId: number,
        params?: PostQueryParams,
        config?: RequestConfig
    ): Promise<PaginatedResponse<Post>['data']> {
        const queryParams = new URLSearchParams()
        queryParams.append('authorId', authorId.toString())

        if (params?.page) queryParams.append('page', params.page.toString())
        if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString())
        if (params?.sortBy) queryParams.append('sortBy', params.sortBy)
        if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder)
        if (params?.status) queryParams.append('status', params.status)
        if (params?.search) queryParams.append('search', params.search)
        if (params?.tags) {
            params.tags.forEach((tag: string) => queryParams.append('tags', tag))
        }

        const url = `${this.baseUrl}?${queryParams.toString()}`
        const response = await http.get<PaginatedResponse<Post>>(url, config)
        return response.data.data
    }

    /**
     * 搜索文章
     */
    async search(params: PostQueryParams, config?: RequestConfig): Promise<Post[]> {
        const queryParams = new URLSearchParams()

        if (params.page) queryParams.append('page', params.page.toString())
        if (params.pageSize) queryParams.append('pageSize', params.pageSize.toString())
        if (params.sortBy) queryParams.append('sortBy', params.sortBy)
        if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder)
        if (params.authorId) queryParams.append('authorId', params.authorId.toString())
        if (params.status) queryParams.append('status', params.status)
        if (params.search) queryParams.append('search', params.search)
        if (params.tags) {
            params.tags.forEach((tag: string) => queryParams.append('tags', tag))
        }

        const url = `${this.baseUrl}/search?${queryParams.toString()}`
        const response = await http.get<ApiResponse<Post[]>>(url, config)
        return response.data.data
    }

    /**
     * 分页搜索文章
     */
    async searchPaginated(
        params: PostQueryParams,
        config?: RequestConfig
    ): Promise<PaginatedResponse<Post>['data']> {
        const queryParams = new URLSearchParams()

        if (params.page) queryParams.append('page', params.page.toString())
        if (params.pageSize) queryParams.append('pageSize', params.pageSize.toString())
        if (params.sortBy) queryParams.append('sortBy', params.sortBy)
        if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder)
        if (params.authorId) queryParams.append('authorId', params.authorId.toString())
        if (params.status) queryParams.append('status', params.status)
        if (params.search) queryParams.append('search', params.search)
        if (params.tags) {
            params.tags.forEach((tag: string) => queryParams.append('tags', tag))
        }

        const url = `${this.baseUrl}/search?${queryParams.toString()}`
        const response = await http.get<PaginatedResponse<Post>>(url, config)
        return response.data.data
    }

    /**
     * 根据标签获取文章
     */
    async getByTags(tags: string[], params?: PostQueryParams, config?: RequestConfig): Promise<Post[]> {
        const queryParams = new URLSearchParams()
        tags.forEach(tag => queryParams.append('tags', tag))

        if (params?.page) queryParams.append('page', params.page.toString())
        if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString())
        if (params?.sortBy) queryParams.append('sortBy', params.sortBy)
        if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder)
        if (params?.status) queryParams.append('status', params.status)
        if (params?.search) queryParams.append('search', params.search)

        const url = `${this.baseUrl}/tags?${queryParams.toString()}`
        const response = await http.get<ApiResponse<Post[]>>(url, config)
        return response.data.data
    }

    /**
     * 发布文章
     */
    async publish(id: number | string, config?: RequestConfig): Promise<Post> {
        const response = await http.patch<ApiResponse<Post>>(
            `${this.baseUrl}/${id}/publish`,
            {},
            config
        )
        return response.data.data
    }

    /**
     * 取消发布文章（设为草稿）
     */
    async unpublish(id: number | string, config?: RequestConfig): Promise<Post> {
        const response = await http.patch<ApiResponse<Post>>(
            `${this.baseUrl}/${id}/unpublish`,
            {},
            config
        )
        return response.data.data
    }

    /**
     * 归档文章
     */
    async archive(id: number | string, config?: RequestConfig): Promise<Post> {
        const response = await http.patch<ApiResponse<Post>>(
            `${this.baseUrl}/${id}/archive`,
            {},
            config
        )
        return response.data.data
    }

    /**
     * 获取热门文章
     */
    async getPopular(limit: number = 10, config?: RequestConfig): Promise<Post[]> {
        const response = await http.get<ApiResponse<Post[]>>(
            `${this.baseUrl}/popular?limit=${limit}`,
            config
        )
        return response.data.data
    }

    /**
     * 获取最新文章
     */
    async getLatest(limit: number = 10, config?: RequestConfig): Promise<Post[]> {
        const response = await http.get<ApiResponse<Post[]>>(
            `${this.baseUrl}/latest?limit=${limit}`,
            config
        )
        return response.data.data
    }

    /**
     * 获取推荐文章
     */
    async getRecommended(userId?: number, limit: number = 10, config?: RequestConfig): Promise<Post[]> {
        const queryParams = new URLSearchParams()
        queryParams.append('limit', limit.toString())
        if (userId) queryParams.append('userId', userId.toString())

        const url = `${this.baseUrl}/recommended?${queryParams.toString()}`
        const response = await http.get<ApiResponse<Post[]>>(url, config)
        return response.data.data
    }

    /**
     * 获取所有标签
     */
    async getAllTags(config?: RequestConfig): Promise<string[]> {
        const response = await http.get<ApiResponse<string[]>>(`${this.baseUrl}/tags/all`, config)
        return response.data.data
    }

    /**
     * 获取热门标签
     */
    async getPopularTags(limit: number = 20, config?: RequestConfig): Promise<Array<{
        tag: string
        count: number
    }>> {
        const response = await http.get<ApiResponse<Array<{
            tag: string
            count: number
        }>>>(`${this.baseUrl}/tags/popular?limit=${limit}`, config)
        return response.data.data
    }

    /**
     * 批量更新文章状态
     */
    async batchUpdateStatus(
        ids: (number | string)[],
        status: 'draft' | 'published' | 'archived',
        config?: RequestConfig
    ): Promise<void> {
        await http.post<ApiResponse<void>>(
            `${this.baseUrl}/batch-status`,
            { ids, status },
            config
        )
    }
}

// 创建文章 API 服务实例
export const postApi = new PostApiService()

// 导出类型和服务
export { PostApiService }