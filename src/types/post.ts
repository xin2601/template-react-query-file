/**
 * 文章相关类型定义
 */

export interface Post {
    id: number
    title: string
    content: string
    excerpt?: string
    authorId: number
    authorName?: string
    tags?: string[]
    status: 'draft' | 'published' | 'archived'
    createdAt: string
    updatedAt: string
}

export interface CreatePostRequest {
    title: string
    content: string
    excerpt?: string
    tags?: string[]
    status?: 'draft' | 'published'
}

export interface UpdatePostRequest {
    title?: string
    content?: string
    excerpt?: string
    tags?: string[]
    status?: 'draft' | 'published' | 'archived'
}

export interface PostQueryParams {
    page?: number
    pageSize?: number
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
    authorId?: number
    status?: 'draft' | 'published' | 'archived'
    tags?: string[]
    search?: string
}