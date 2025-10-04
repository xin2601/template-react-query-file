/**
 * 查询 hooks 统一导出
 */

// 导出文章查询 hooks
export {
    postKeys,
    usePost,
    usePosts,
    usePostsPaginated,
    usePostsInfinite,
    usePostsByAuthor,
    usePostsByAuthorPaginated,
    usePostsByTags,
    usePostSearch,
    usePostSearchPaginated,
    usePopularPosts,
    useLatestPosts,
    useRecommendedPosts,
    useAllTags,
    usePopularTags,
} from './usePosts'