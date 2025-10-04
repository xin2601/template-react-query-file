/**
 * 变更 hooks 统一导出
 */

// 导出文章变更 hooks
export {
    useCreatePost,
    useUpdatePost,
    usePatchPost,
    useDeletePost,
    useBatchDeletePosts,
    usePublishPost,
    useUnpublishPost,
    useArchivePost,
    useBatchUpdatePostStatus,
} from './usePostMutations'