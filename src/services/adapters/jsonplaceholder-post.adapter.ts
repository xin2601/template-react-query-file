/**
 * JSONPlaceholder Post 数据适配器
 * 用于将 JSONPlaceholder API 的数据转换为内部 Post 类型
 */

import type { Post } from '../../types'

// JSONPlaceholder Post 数据结构
export interface JSONPlaceholderPost {
    userId: number
    id: number
    title: string
    body: string
}

// JSONPlaceholder User 数据结构
export interface JSONPlaceholderUser {
    id: number
    name: string
    username: string
    email: string
}

/**
 * 将 JSONPlaceholder 的 post 数据转换为内部 Post 类型
 */
export const adaptJSONPlaceholderPost = (
    jsonPost: JSONPlaceholderPost,
    user?: JSONPlaceholderUser
): Post => {
    return {
        id: jsonPost.id,
        title: jsonPost.title,
        content: jsonPost.body,
        excerpt: jsonPost.body.substring(0, 100) + (jsonPost.body.length > 100 ? '...' : ''),
        authorId: jsonPost.userId,
        authorName: user?.name || `用户${jsonPost.userId}`,
        tags: ['示例', 'JSONPlaceholder'],
        status: 'published' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
}

/**
 * 批量转换 JSONPlaceholder posts
 */
export const adaptJSONPlaceholderPosts = (
    jsonPosts: JSONPlaceholderPost[],
    users?: JSONPlaceholderUser[]
): Post[] => {
    return jsonPosts.map(post => {
        const user = users?.find(u => u.id === post.userId)
        return adaptJSONPlaceholderPost(post, user)
    })
}