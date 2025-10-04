import { createFileRoute } from '@tanstack/react-router'
import { usePosts, useCreatePost, useUpdatePost, useDeletePost } from '../../services'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Spinner } from '../../components/ui/spinner'
import { useState } from 'react'

export const Route = createFileRoute('/_default-layout/posts')({
    component: DefaultPosts,
})

function DefaultPosts() {
    const [page, setPage] = useState(1)
    const pageSize = 10

    const { data: posts, isLoading, error } = usePosts({ page, pageSize })
    const createPostMutation = useCreatePost()
    const updatePostMutation = useUpdatePost()
    const deletePostMutation = useDeletePost()

    const handleCreatePost = () => {
        createPostMutation.mutate({
            title: `新文章 ${Date.now()}`,
            content: '这是一篇正式的文章内容',
            excerpt: '文章摘要',
            status: 'published',
            tags: ['正式', '发布']
        })
    }

    const handleDeletePost = (id: number) => {
        if (confirm('确定要删除这篇文章吗？')) {
            deletePostMutation.mutate(id)
        }
    }

    return (
        <div className="p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        📝 文章管理
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                        正式环境中的文章管理功能
                    </p>
                    <div className="bg-blue-100 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700 rounded-lg p-4 mb-8">
                        <p className="text-blue-800 dark:text-blue-200">
                            🏠 正式环境 - 生产级别的文章管理系统
                        </p>
                    </div>
                </div>

                {/* 操作区域 */}
                <Card>
                    <CardHeader>
                        <CardTitle>文章操作</CardTitle>
                        <CardDescription>管理您的文章内容</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-4">
                            <Button
                                onClick={handleCreatePost}
                                disabled={createPostMutation.isPending}
                            >
                                {createPostMutation.isPending ? '创建中...' : '创建新文章'}
                            </Button>
                            <Button variant="outline">
                                导入文章
                            </Button>
                            <Button variant="secondary">
                                导出文章
                            </Button>
                        </div>
                        {createPostMutation.error && (
                            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
                                <p className="text-red-700 dark:text-red-300 text-sm">
                                    创建失败: {createPostMutation.error.message}
                                </p>
                            </div>
                        )}
                        {createPostMutation.isSuccess && (
                            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
                                <p className="text-green-700 dark:text-green-300 text-sm">
                                    文章创建成功！
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* 文章列表 */}
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>文章列表</CardTitle>
                                <CardDescription>
                                    当前页: {page} | 每页: {pageSize} 条
                                </CardDescription>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                >
                                    上一页
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage(p => p + 1)}
                                    disabled={!posts || posts.length < pageSize}
                                >
                                    下一页
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="flex justify-center py-8">
                                <Spinner className="h-8 w-8" />
                            </div>
                        ) : error ? (
                            <div className="text-center py-8">
                                <p className="text-red-600 dark:text-red-400 mb-4">
                                    加载失败: {error.message}
                                </p>
                                <Button variant="outline" onClick={() => window.location.reload()}>
                                    重试
                                </Button>
                            </div>
                        ) : posts && posts.length > 0 ? (
                            <div className="space-y-4">
                                {posts.map((post) => (
                                    <div key={post.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                                                {post.excerpt && (
                                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                                                        {post.excerpt}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex gap-2 ml-4">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    编辑
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDeletePost(post.id)}
                                                    disabled={deletePostMutation.isPending}
                                                >
                                                    删除
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <Badge
                                                variant={post.status === 'published' ? 'default' : 'secondary'}
                                            >
                                                {post.status === 'published' ? '已发布' :
                                                    post.status === 'draft' ? '草稿' : post.status}
                                            </Badge>
                                            <span className="text-gray-500">
                                                ID: {post.id}
                                            </span>
                                            {post.tags && post.tags.length > 0 && (
                                                <div className="flex gap-1">
                                                    {post.tags.map((tag) => (
                                                        <Badge key={tag} variant="outline" className="text-xs">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            )}
                                            <span className="text-gray-500 ml-auto">
                                                {new Date(post.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500 mb-4">暂无文章</p>
                                <Button onClick={handleCreatePost}>
                                    创建第一篇文章
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* 统计信息 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">📊 文章统计</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {posts?.length || 0}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                当前页文章数
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">✅ 已发布</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {posts?.filter(p => p.status === 'published').length || 0}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                已发布文章
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">📝 草稿</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                                {posts?.filter(p => p.status === 'draft').length || 0}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                草稿文章
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}