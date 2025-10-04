import { BaseApiService } from './base'
import { mockApi } from '../../mocks'
import {
    adaptJSONPlaceholderPosts,
    adaptJSONPlaceholderPost,
    createMockApiResponse,
    createMockPaginatedResponse
} from '../adapters'
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
 * 文章 API 服务类 - 使用 Mock 数据
 */
class PostApiService extends BaseApiService<Post, CreatePostRequest, UpdatePostRequest> {
    constructor() {
        super('/posts')
    }

    /**
     * 重写 getList 方法使用 Mock 数据
     */
    async getList(params?: PostQueryParams, config?: RequestConfig): Promise<Post[]> {
        return await mockApi.getPosts(params)
    }

    /**
     * 重写 getById 方法使用 Mock 数据
     */
    async getById(id: number | string, config?: RequestConfig): Promise<Post> {
        return await mockApi.getPost(id)
    }

    /**
     * 重写 create 方法使用 Mock 数据
     */
    async create(data: CreatePostRequest, config?: RequestConfig): Promise<Post> {
        return await mockApi.createPost(data)
    }

    /**
     * 重写 update 方法使用 Mock 数据
     */
    async update(id: number | string, data: UpdatePostRequest, config?: RequestConfig): Promise<Post> {
        return await mockApi.updatePost(id, data)
    }

    /**
     * 重写 delete 方法使用 Mock 数据
     */
    async delete(id: number | string, config?: RequestConfig): Promise<void> {
        return await mockApi.deletePost(id)
    }

    /**
     * 根据作者 ID 获取文章列表
     */
    async getByAuthor(authorId: number, params?: PostQueryParams, config?: RequestConfig): Promise<Post[]> {
        return await mockApi.getPosts({ ...params, authorId })
    }

    /**
     * 分页获取作者文章
     */
    async getByAuthorPaginated(
        authorId: number,
        params?: PostQueryParams,
        config?: RequestConfig
    ): Promise<PaginatedResponse<Post>['data']> {
        const posts = await mockApi.getPosts({ ...params, authorId })
        const total = await mockApi.getPostsCount({ ...params, authorId })

        return {
            items: posts,
            total,
            page: params?.page || 1,
            pageSize: params?.pageSize || 10,
            totalPages: Math.ceil(total / (params?.pageSize || 10))
        }
    }

    /**
     * 搜索文章
     */
    async search(params: PostQueryParams, config?: RequestConfig): Promise<Post[]> {
        return await mockApi.searchPosts(params)
    }

    /**
     * 分页搜索文章
     */
    async searchPaginated(
        params: PostQueryParams,
        config?: RequestConfig
    ): Promise<PaginatedResponse<Post>['data']> {
        const posts = await mockApi.searchPosts(params)
        const total = await mockApi.getPostsCount(params)

        return {
            items: posts,
            total,
            page: params?.page || 1,
            pageSize: params?.pageSize || 10,
            totalPages: Math.ceil(total / (params?.pageSize || 10))
        }
    }

    /**
     * 根据标签获取文章
     */
    async getByTags(tags: string[], params?: PostQueryParams, config?: RequestConfig): Promise<Post[]> {
        return await mockApi.getPosts({ ...params, tags })
    }

    /**
     * 发布文章
     */
    async publish(id: number | string, config?: RequestConfig): Promise<Post> {
        return await mockApi.updatePost(id, { status: 'published' })
    }

    /**
     * 取消发布文章（设为草稿）
     */
    async unpublish(id: number | string, config?: RequestConfig): Promise<Post> {
        return await mockApi.updatePost(id, { status: 'draft' })
    }

    /**
     * 归档文章
     */
    async archive(id: number | string, config?: RequestConfig): Promise<Post> {
        return await mockApi.updatePost(id, { status: 'archived' })
    }

    /**
     * 获取热门文章
     */
    async getPopular(limit: number = 10, config?: RequestConfig): Promise<Post[]> {
        return await mockApi.getPopularPosts(limit)
    }

    /**
     * 获取最新文章
     */
    async getLatest(limit: number = 10, config?: RequestConfig): Promise<Post[]> {
        return await mockApi.getLatestPosts(limit)
    }

    /**
     * 获取推荐文章
     */
    async getRecommended(userId?: number, limit: number = 10, config?: RequestConfig): Promise<Post[]> {
        return await mockApi.getPopularPosts(limit) // 简化实现，返回热门文章
    }

    /**
     * 获取所有标签
     */
    async getAllTags(config?: RequestConfig): Promise<string[]> {
        return await mockApi.getAllTags()
    }

    /**
     * 获取热门标签
     */
    async getPopularTags(limit: number = 20, config?: RequestConfig): Promise<Array<{
        tag: string
        count: number
    }>> {
        return await mockApi.getPopularTags(limit)
    }

    /**
     * 批量更新文章状态
     */
    async batchUpdateStatus(
        ids: (number | string)[],
        status: 'draft' | 'published' | 'archived',
        config?: RequestConfig
    ): Promise<void> {
        // 批量更新状态
        for (const id of ids) {
            await mockApi.updatePost(id, { status })
        }
    }
}

// 创建文章 API 服务实例
export const postApi = new PostApiService()

// 导出类型和服务
export { PostApiService }