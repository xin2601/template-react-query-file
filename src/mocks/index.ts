import { mockPosts, filterPosts, getPostsCount } from './posts'
import type { Post, CreatePostRequest, UpdatePostRequest, PostQueryParams } from '../types'

/**
 * Mock API 服务
 */
export class MockApiService {
    private posts: Post[] = [...mockPosts]
    private nextId: number = Math.max(...mockPosts.map(p => p.id)) + 1

    /**
     * 获取文章列表
     */
    async getPosts(params?: PostQueryParams): Promise<Post[]> {
        // 模拟网络延迟
        await this.delay(300)

        return filterPosts(this.posts, params)
    }

    /**
     * 获取文章详情
     */
    async getPost(id: number | string): Promise<Post> {
        await this.delay(200)

        const post = this.posts.find(p => p.id === Number(id))
        if (!post) {
            throw new Error(`文章 ${id} 不存在`)
        }

        return post
    }

    /**
     * 创建文章
     */
    async createPost(data: CreatePostRequest): Promise<Post> {
        await this.delay(500)

        const newPost: Post = {
            id: this.nextId++,
            title: data.title,
            content: data.content,
            excerpt: data.excerpt || data.content.substring(0, 100) + (data.content.length > 100 ? '...' : ''),
            authorId: 1, // 默认作者ID
            authorName: '当前用户',
            tags: data.tags || [],
            status: data.status || 'draft',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        this.posts.unshift(newPost) // 添加到开头
        return newPost
    }

    /**
     * 更新文章
     */
    async updatePost(id: number | string, data: UpdatePostRequest): Promise<Post> {
        await this.delay(400)

        const index = this.posts.findIndex(p => p.id === Number(id))
        if (index === -1) {
            throw new Error(`文章 ${id} 不存在`)
        }

        const updatedPost: Post = {
            ...this.posts[index],
            ...data,
            updatedAt: new Date().toISOString(),
        }

        this.posts[index] = updatedPost
        return updatedPost
    }

    /**
     * 删除文章
     */
    async deletePost(id: number | string): Promise<void> {
        await this.delay(300)

        const index = this.posts.findIndex(p => p.id === Number(id))
        if (index === -1) {
            throw new Error(`文章 ${id} 不存在`)
        }

        this.posts.splice(index, 1)
    }

    /**
     * 获取文章总数
     */
    async getPostsCount(params?: Omit<PostQueryParams, 'page' | 'pageSize'>): Promise<number> {
        await this.delay(100)

        return getPostsCount(this.posts, params)
    }

    /**
     * 搜索文章
     */
    async searchPosts(params: PostQueryParams): Promise<Post[]> {
        await this.delay(400)

        return filterPosts(this.posts, params)
    }

    /**
     * 获取热门文章
     */
    async getPopularPosts(limit: number = 10): Promise<Post[]> {
        await this.delay(300)

        // 模拟热门文章（按ID倒序，取前几篇已发布的文章）
        return this.posts
            .filter(post => post.status === 'published')
            .sort((a, b) => b.id - a.id)
            .slice(0, limit)
    }

    /**
     * 获取最新文章
     */
    async getLatestPosts(limit: number = 10): Promise<Post[]> {
        await this.delay(300)

        return this.posts
            .filter(post => post.status === 'published')
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, limit)
    }

    /**
     * 获取所有标签
     */
    async getAllTags(): Promise<string[]> {
        await this.delay(200)

        const allTags = this.posts.flatMap(post => post.tags || [])
        return [...new Set(allTags)].sort()
    }

    /**
     * 获取热门标签
     */
    async getPopularTags(limit: number = 20): Promise<Array<{ tag: string; count: number }>> {
        await this.delay(200)

        const tagCounts = new Map<string, number>()

        this.posts.forEach(post => {
            post.tags?.forEach(tag => {
                tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
            })
        })

        return Array.from(tagCounts.entries())
            .map(([tag, count]) => ({ tag, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, limit)
    }

    /**
     * 模拟网络延迟
     */
    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    /**
     * 重置数据
     */
    reset(): void {
        this.posts = [...mockPosts]
        this.nextId = Math.max(...mockPosts.map(p => p.id)) + 1
    }
}

// 创建单例实例
export const mockApi = new MockApiService()