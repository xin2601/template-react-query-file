import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { postApi } from '../../api/posts'
import type { Post, PostQueryParams } from '../../../types'

/**
 * 文章查询相关 hooks
 */

// 查询键工厂
export const postKeys = {
    all: ['posts'] as const,
    lists: () => [...postKeys.all, 'list'] as const,
    list: (params: PostQueryParams) => [...postKeys.lists(), params] as const,
    details: () => [...postKeys.all, 'detail'] as const,
    detail: (id: number | string) => [...postKeys.details(), id] as const,
    byAuthor: (authorId: number, params?: PostQueryParams) =>
        [...postKeys.all, 'author', authorId, params] as const,
    byTags: (tags: string[], params?: PostQueryParams) =>
        [...postKeys.all, 'tags', tags.sort(), params] as const,
    search: (params: PostQueryParams) => [...postKeys.all, 'search', params] as const,
    popular: (limit: number) => [...postKeys.all, 'popular', limit] as const,
    latest: (limit: number) => [...postKeys.all, 'latest', limit] as const,
    recommended: (userId?: number, limit?: number) =>
        [...postKeys.all, 'recommended', userId, limit] as const,
    tags: () => [...postKeys.all, 'tags'] as const,
    allTags: () => [...postKeys.tags(), 'all'] as const,
    popularTags: (limit: number) => [...postKeys.tags(), 'popular', limit] as const,
}

/**
 * 获取文章详情
 */
export const usePost = (id: number | string, options?: {
    enabled?: boolean
    staleTime?: number
    cacheTime?: number
}) => {
    return useQuery({
        queryKey: postKeys.detail(id),
        queryFn: () => postApi.getById(id),
        enabled: options?.enabled !== false && !!id,
        staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5分钟
        gcTime: options?.cacheTime ?? 10 * 60 * 1000, // 10分钟
    })
}

/**
 * 获取文章列表
 */
export const usePosts = (params?: PostQueryParams, options?: {
    enabled?: boolean
    staleTime?: number
    cacheTime?: number
}) => {
    return useQuery({
        queryKey: postKeys.list(params || {}),
        queryFn: () => postApi.getList(params),
        enabled: options?.enabled !== false,
        staleTime: options?.staleTime ?? 2 * 60 * 1000, // 2分钟
        gcTime: options?.cacheTime ?? 5 * 60 * 1000, // 5分钟
    })
}

/**
 * 分页获取文章列表
 */
export const usePostsPaginated = (params?: PostQueryParams, options?: {
    enabled?: boolean
    staleTime?: number
    cacheTime?: number
}) => {
    return useQuery({
        queryKey: postKeys.list(params || {}),
        queryFn: () => postApi.getPaginatedList(params),
        enabled: options?.enabled !== false,
        staleTime: options?.staleTime ?? 2 * 60 * 1000, // 2分钟
        gcTime: options?.cacheTime ?? 5 * 60 * 1000, // 5分钟
    })
}

/**
 * 无限滚动文章列表
 */
export const usePostsInfinite = (params?: Omit<PostQueryParams, 'page'>, options?: {
    enabled?: boolean
    staleTime?: number
    cacheTime?: number
}) => {
    return useInfiniteQuery({
        queryKey: postKeys.list(params || {}),
        queryFn: ({ pageParam = 1 }) =>
            postApi.getPaginatedList({ ...params, page: pageParam }),
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.totalPages) {
                return lastPage.page + 1
            }
            return undefined
        },
        enabled: options?.enabled !== false,
        staleTime: options?.staleTime ?? 2 * 60 * 1000, // 2分钟
        gcTime: options?.cacheTime ?? 5 * 60 * 1000, // 5分钟
        initialPageParam: 1,
    })
}

/**
 * 根据作者获取文章
 */
export const usePostsByAuthor = (authorId: number, params?: PostQueryParams, options?: {
    enabled?: boolean
    staleTime?: number
    cacheTime?: number
}) => {
    return useQuery({
        queryKey: postKeys.byAuthor(authorId, params),
        queryFn: () => postApi.getByAuthor(authorId, params),
        enabled: options?.enabled !== false && !!authorId,
        staleTime: options?.staleTime ?? 3 * 60 * 1000, // 3分钟
        gcTime: options?.cacheTime ?? 8 * 60 * 1000, // 8分钟
    })
}

/**
 * 分页获取作者文章
 */
export const usePostsByAuthorPaginated = (authorId: number, params?: PostQueryParams, options?: {
    enabled?: boolean
    staleTime?: number
    cacheTime?: number
}) => {
    return useQuery({
        queryKey: postKeys.byAuthor(authorId, params),
        queryFn: () => postApi.getByAuthorPaginated(authorId, params),
        enabled: options?.enabled !== false && !!authorId,
        staleTime: options?.staleTime ?? 3 * 60 * 1000, // 3分钟
        gcTime: options?.cacheTime ?? 8 * 60 * 1000, // 8分钟
    })
}

/**
 * 根据标签获取文章
 */
export const usePostsByTags = (tags: string[], params?: PostQueryParams, options?: {
    enabled?: boolean
    staleTime?: number
    cacheTime?: number
}) => {
    return useQuery({
        queryKey: postKeys.byTags(tags, params),
        queryFn: () => postApi.getByTags(tags, params),
        enabled: options?.enabled !== false && tags.length > 0,
        staleTime: options?.staleTime ?? 3 * 60 * 1000, // 3分钟
        gcTime: options?.cacheTime ?? 8 * 60 * 1000, // 8分钟
    })
}

/**
 * 搜索文章
 */
export const usePostSearch = (params: PostQueryParams, options?: {
    enabled?: boolean
    staleTime?: number
    cacheTime?: number
}) => {
    return useQuery({
        queryKey: postKeys.search(params),
        queryFn: () => postApi.search(params),
        enabled: options?.enabled !== false && (
            !!params.search ||
            !!params.authorId ||
            !!params.status ||
            (params.tags && params.tags.length > 0)
        ),
        staleTime: options?.staleTime ?? 1 * 60 * 1000, // 1分钟
        gcTime: options?.cacheTime ?? 3 * 60 * 1000, // 3分钟
    })
}

/**
 * 分页搜索文章
 */
export const usePostSearchPaginated = (params: PostQueryParams, options?: {
    enabled?: boolean
    staleTime?: number
    cacheTime?: number
}) => {
    return useQuery({
        queryKey: postKeys.search(params),
        queryFn: () => postApi.searchPaginated(params),
        enabled: options?.enabled !== false && (
            !!params.search ||
            !!params.authorId ||
            !!params.status ||
            (params.tags && params.tags.length > 0)
        ),
        staleTime: options?.staleTime ?? 1 * 60 * 1000, // 1分钟
        gcTime: options?.cacheTime ?? 3 * 60 * 1000, // 3分钟
    })
}

/**
 * 获取热门文章
 */
export const usePopularPosts = (limit: number = 10, options?: {
    enabled?: boolean
    staleTime?: number
    cacheTime?: number
}) => {
    return useQuery({
        queryKey: postKeys.popular(limit),
        queryFn: () => postApi.getPopular(limit),
        enabled: options?.enabled !== false,
        staleTime: options?.staleTime ?? 10 * 60 * 1000, // 10分钟
        gcTime: options?.cacheTime ?? 30 * 60 * 1000, // 30分钟
    })
}

/**
 * 获取最新文章
 */
export const useLatestPosts = (limit: number = 10, options?: {
    enabled?: boolean
    staleTime?: number
    cacheTime?: number
}) => {
    return useQuery({
        queryKey: postKeys.latest(limit),
        queryFn: () => postApi.getLatest(limit),
        enabled: options?.enabled !== false,
        staleTime: options?.staleTime ?? 2 * 60 * 1000, // 2分钟
        gcTime: options?.cacheTime ?? 10 * 60 * 1000, // 10分钟
    })
}

/**
 * 获取推荐文章
 */
export const useRecommendedPosts = (userId?: number, limit: number = 10, options?: {
    enabled?: boolean
    staleTime?: number
    cacheTime?: number
}) => {
    return useQuery({
        queryKey: postKeys.recommended(userId, limit),
        queryFn: () => postApi.getRecommended(userId, limit),
        enabled: options?.enabled !== false,
        staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5分钟
        gcTime: options?.cacheTime ?? 15 * 60 * 1000, // 15分钟
    })
}

/**
 * 获取所有标签
 */
export const useAllTags = (options?: {
    enabled?: boolean
    staleTime?: number
    cacheTime?: number
}) => {
    return useQuery({
        queryKey: postKeys.allTags(),
        queryFn: () => postApi.getAllTags(),
        enabled: options?.enabled !== false,
        staleTime: options?.staleTime ?? 30 * 60 * 1000, // 30分钟
        gcTime: options?.cacheTime ?? 60 * 60 * 1000, // 1小时
    })
}

/**
 * 获取热门标签
 */
export const usePopularTags = (limit: number = 20, options?: {
    enabled?: boolean
    staleTime?: number
    cacheTime?: number
}) => {
    return useQuery({
        queryKey: postKeys.popularTags(limit),
        queryFn: () => postApi.getPopularTags(limit),
        enabled: options?.enabled !== false,
        staleTime: options?.staleTime ?? 15 * 60 * 1000, // 15分钟
        gcTime: options?.cacheTime ?? 30 * 60 * 1000, // 30分钟
    })
}