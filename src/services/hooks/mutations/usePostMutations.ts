import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postApi } from '../../api/posts'
import { postKeys } from '../queries/usePosts'
import type { Post, CreatePostRequest, UpdatePostRequest } from '../../../types'

/**
 * 文章变更相关 hooks
 */

/**
 * 创建文章
 */
export const useCreatePost = (options?: {
    onSuccess?: (data: Post, variables: CreatePostRequest) => void
    onError?: (error: any, variables: CreatePostRequest) => void
    onSettled?: (data: Post | undefined, error: any, variables: CreatePostRequest) => void
}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreatePostRequest) => postApi.create(data),
        onSuccess: (data, variables) => {
            // 使相关查询失效
            queryClient.invalidateQueries({ queryKey: postKeys.lists() })
            queryClient.invalidateQueries({ queryKey: postKeys.latest(10) })

            // 如果有作者ID，使作者相关查询失效
            if (data.authorId) {
                queryClient.invalidateQueries({
                    queryKey: postKeys.byAuthor(data.authorId)
                })
            }

            // 设置新文章的缓存
            queryClient.setQueryData(postKeys.detail(data.id), data)

            // 调用自定义成功回调
            options?.onSuccess?.(data, variables)
        },
        onError: options?.onError,
        onSettled: options?.onSettled,
    })
}

/**
 * 更新文章
 */
export const useUpdatePost = (options?: {
    onSuccess?: (data: Post, variables: { id: number | string; data: UpdatePostRequest }) => void
    onError?: (error: any, variables: { id: number | string; data: UpdatePostRequest }) => void
    onSettled?: (data: Post | undefined, error: any, variables: { id: number | string; data: UpdatePostRequest }) => void
}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: number | string; data: UpdatePostRequest }) =>
            postApi.update(id, data),
        onSuccess: (data, variables) => {
            // 更新文章详情缓存
            queryClient.setQueryData(postKeys.detail(variables.id), data)

            // 使相关查询失效
            queryClient.invalidateQueries({ queryKey: postKeys.lists() })
            queryClient.invalidateQueries({ queryKey: postKeys.all })

            // 如果有作者ID，使作者相关查询失效
            if (data.authorId) {
                queryClient.invalidateQueries({
                    queryKey: postKeys.byAuthor(data.authorId)
                })
            }

            // 调用自定义成功回调
            options?.onSuccess?.(data, variables)
        },
        onError: options?.onError,
        onSettled: options?.onSettled,
    })
}

/**
 * 部分更新文章
 */
export const usePatchPost = (options?: {
    onSuccess?: (data: Post, variables: { id: number | string; data: Partial<UpdatePostRequest> }) => void
    onError?: (error: any, variables: { id: number | string; data: Partial<UpdatePostRequest> }) => void
    onSettled?: (data: Post | undefined, error: any, variables: { id: number | string; data: Partial<UpdatePostRequest> }) => void
}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: number | string; data: Partial<UpdatePostRequest> }) =>
            postApi.patch(id, data),
        onSuccess: (data, variables) => {
            // 更新文章详情缓存
            queryClient.setQueryData(postKeys.detail(variables.id), data)

            // 使相关查询失效
            queryClient.invalidateQueries({ queryKey: postKeys.lists() })
            queryClient.invalidateQueries({ queryKey: postKeys.all })

            // 如果有作者ID，使作者相关查询失效
            if (data.authorId) {
                queryClient.invalidateQueries({
                    queryKey: postKeys.byAuthor(data.authorId)
                })
            }

            // 调用自定义成功回调
            options?.onSuccess?.(data, variables)
        },
        onError: options?.onError,
        onSettled: options?.onSettled,
    })
}

/**
 * 删除文章
 */
export const useDeletePost = (options?: {
    onSuccess?: (data: void, variables: number | string) => void
    onError?: (error: any, variables: number | string) => void
    onSettled?: (data: void | undefined, error: any, variables: number | string) => void
}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number | string) => postApi.delete(id),
        onSuccess: (data, variables) => {
            // 移除文章详情缓存
            queryClient.removeQueries({ queryKey: postKeys.detail(variables) })

            // 使相关查询失效
            queryClient.invalidateQueries({ queryKey: postKeys.lists() })
            queryClient.invalidateQueries({ queryKey: postKeys.all })
            queryClient.invalidateQueries({ queryKey: postKeys.latest(10) })
            queryClient.invalidateQueries({ queryKey: postKeys.popular(10) })

            // 调用自定义成功回调
            options?.onSuccess?.(data, variables)
        },
        onError: options?.onError,
        onSettled: options?.onSettled,
    })
}

/**
 * 批量删除文章
 */
export const useBatchDeletePosts = (options?: {
    onSuccess?: (data: void, variables: (number | string)[]) => void
    onError?: (error: any, variables: (number | string)[]) => void
    onSettled?: (data: void | undefined, error: any, variables: (number | string)[]) => void
}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (ids: (number | string)[]) => postApi.batchDelete(ids),
        onSuccess: (data, variables) => {
            // 移除所有相关文章的详情缓存
            variables.forEach(id => {
                queryClient.removeQueries({ queryKey: postKeys.detail(id) })
            })

            // 使相关查询失效
            queryClient.invalidateQueries({ queryKey: postKeys.lists() })
            queryClient.invalidateQueries({ queryKey: postKeys.all })
            queryClient.invalidateQueries({ queryKey: postKeys.latest(10) })
            queryClient.invalidateQueries({ queryKey: postKeys.popular(10) })

            // 调用自定义成功回调
            options?.onSuccess?.(data, variables)
        },
        onError: options?.onError,
        onSettled: options?.onSettled,
    })
}

/**
 * 发布文章
 */
export const usePublishPost = (options?: {
    onSuccess?: (data: Post, variables: number | string) => void
    onError?: (error: any, variables: number | string) => void
    onSettled?: (data: Post | undefined, error: any, variables: number | string) => void
}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number | string) => postApi.publish(id),
        onSuccess: (data, variables) => {
            // 更新文章详情缓存
            queryClient.setQueryData(postKeys.detail(variables), data)

            // 使相关查询失效
            queryClient.invalidateQueries({ queryKey: postKeys.lists() })
            queryClient.invalidateQueries({ queryKey: postKeys.latest(10) })

            // 如果有作者ID，使作者相关查询失效
            if (data.authorId) {
                queryClient.invalidateQueries({
                    queryKey: postKeys.byAuthor(data.authorId)
                })
            }

            // 调用自定义成功回调
            options?.onSuccess?.(data, variables)
        },
        onError: options?.onError,
        onSettled: options?.onSettled,
    })
}

/**
 * 取消发布文章
 */
export const useUnpublishPost = (options?: {
    onSuccess?: (data: Post, variables: number | string) => void
    onError?: (error: any, variables: number | string) => void
    onSettled?: (data: Post | undefined, error: any, variables: number | string) => void
}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number | string) => postApi.unpublish(id),
        onSuccess: (data, variables) => {
            // 更新文章详情缓存
            queryClient.setQueryData(postKeys.detail(variables), data)

            // 使相关查询失效
            queryClient.invalidateQueries({ queryKey: postKeys.lists() })
            queryClient.invalidateQueries({ queryKey: postKeys.latest(10) })

            // 如果有作者ID，使作者相关查询失效
            if (data.authorId) {
                queryClient.invalidateQueries({
                    queryKey: postKeys.byAuthor(data.authorId)
                })
            }

            // 调用自定义成功回调
            options?.onSuccess?.(data, variables)
        },
        onError: options?.onError,
        onSettled: options?.onSettled,
    })
}

/**
 * 归档文章
 */
export const useArchivePost = (options?: {
    onSuccess?: (data: Post, variables: number | string) => void
    onError?: (error: any, variables: number | string) => void
    onSettled?: (data: Post | undefined, error: any, variables: number | string) => void
}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number | string) => postApi.archive(id),
        onSuccess: (data, variables) => {
            // 更新文章详情缓存
            queryClient.setQueryData(postKeys.detail(variables), data)

            // 使相关查询失效
            queryClient.invalidateQueries({ queryKey: postKeys.lists() })
            queryClient.invalidateQueries({ queryKey: postKeys.latest(10) })

            // 如果有作者ID，使作者相关查询失效
            if (data.authorId) {
                queryClient.invalidateQueries({
                    queryKey: postKeys.byAuthor(data.authorId)
                })
            }

            // 调用自定义成功回调
            options?.onSuccess?.(data, variables)
        },
        onError: options?.onError,
        onSettled: options?.onSettled,
    })
}

/**
 * 批量更新文章状态
 */
export const useBatchUpdatePostStatus = (options?: {
    onSuccess?: (data: void, variables: { ids: (number | string)[]; status: 'draft' | 'published' | 'archived' }) => void
    onError?: (error: any, variables: { ids: (number | string)[]; status: 'draft' | 'published' | 'archived' }) => void
    onSettled?: (data: void | undefined, error: any, variables: { ids: (number | string)[]; status: 'draft' | 'published' | 'archived' }) => void
}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ ids, status }: { ids: (number | string)[]; status: 'draft' | 'published' | 'archived' }) =>
            postApi.batchUpdateStatus(ids, status),
        onSuccess: (data, variables) => {
            // 移除所有相关文章的详情缓存，让它们重新获取
            variables.ids.forEach(id => {
                queryClient.invalidateQueries({ queryKey: postKeys.detail(id) })
            })

            // 使相关查询失效
            queryClient.invalidateQueries({ queryKey: postKeys.lists() })
            queryClient.invalidateQueries({ queryKey: postKeys.all })
            queryClient.invalidateQueries({ queryKey: postKeys.latest(10) })
            queryClient.invalidateQueries({ queryKey: postKeys.popular(10) })

            // 调用自定义成功回调
            options?.onSuccess?.(data, variables)
        },
        onError: options?.onError,
        onSettled: options?.onSettled,
    })
}