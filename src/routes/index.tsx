import { createFileRoute, Link } from '@tanstack/react-router'
import { usePosts, usePopularPosts, useLatestPosts } from '../services'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Spinner } from '../components/ui/spinner'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    // 获取概览数据
    const { data: posts, isLoading: postsLoading } = usePosts({ page: 1, pageSize: 5 })
    const { data: popularPosts } = usePopularPosts(3)
    const { data: latestPosts } = useLatestPosts(3)

    return (
        <div className="p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        HTTP 集成演示应用
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                        基于 TanStack Router + React Query + redaxios 的完整 HTTP 解决方案
                    </p>
                </div>

                {/* 技术栈介绍 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">🚀 TanStack Router</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                类型安全的路由系统，支持文件基础路由和代码分割。
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">⚡ React Query</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                强大的数据获取和状态管理库，支持缓存、同步和更新。
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">🌐 redaxios</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                轻量级的 HTTP 客户端，提供类似 axios 的 API。
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">🎨 Tailwind CSS</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                实用优先的 CSS 框架，快速构建现代化的用户界面。
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* 数据概览 */}
                <div className="grid grid-cols-1 gap-6">
                    {/* 文章概览 */}
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle>文章概览</CardTitle>
                                    <CardDescription>最近的文章数据</CardDescription>
                                </div>
                                <Link to="/posts">
                                    <Button variant="outline" size="sm">查看全部</Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {postsLoading ? (
                                <div className="flex justify-center py-4">
                                    <Spinner className="h-6 w-6" />
                                </div>
                            ) : posts && posts.length > 0 ? (
                                <div className="space-y-3">
                                    {posts.slice(0, 5).map((post) => (
                                        <div key={post.id} className="p-3 border rounded">
                                            <h4 className="font-medium text-sm mb-2">{post.title}</h4>
                                            {post.excerpt && (
                                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                                                    {post.excerpt}
                                                </p>
                                            )}
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="text-xs">
                                                    {post.status}
                                                </Badge>
                                                <span className="text-xs text-gray-500">
                                                    作者ID: {post.authorId}
                                                </span>
                                                {post.tags && post.tags.length > 0 && (
                                                    <div className="flex gap-1">
                                                        {post.tags.slice(0, 2).map((tag) => (
                                                            <Badge key={tag} variant="secondary" className="text-xs">
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center py-4 text-gray-500">暂无文章数据</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* 热门和最新内容 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* 热门文章 */}
                    <Card>
                        <CardHeader>
                            <CardTitle>热门文章</CardTitle>
                            <CardDescription>最受欢迎的内容</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {popularPosts ? (
                                <div className="space-y-2">
                                    {popularPosts.map((post, index) => (
                                        <div key={post.id} className="flex items-center gap-2 p-2 border rounded">
                                            <Badge variant="outline" className="text-xs">
                                                #{index + 1}
                                            </Badge>
                                            <span className="text-sm font-medium flex-1">{post.title}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex justify-center py-4">
                                    <Spinner className="h-6 w-6" />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* 最新文章 */}
                    <Card>
                        <CardHeader>
                            <CardTitle>最新文章</CardTitle>
                            <CardDescription>最近发布的内容</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {latestPosts ? (
                                <div className="space-y-2">
                                    {latestPosts.map((post) => (
                                        <div key={post.id} className="flex items-center gap-2 p-2 border rounded">
                                            <span className="text-sm font-medium flex-1">{post.title}</span>
                                            <span className="text-xs text-gray-500">
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex justify-center py-4">
                                    <Spinner className="h-6 w-6" />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* 快速操作 */}
                <Card>
                    <CardHeader>
                        <CardTitle>快速操作</CardTitle>
                        <CardDescription>开始使用 HTTP 集成功能</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/posts">
                                <Button>管理文章</Button>
                            </Link>
                            <Button variant="outline" onClick={() => window.location.reload()}>
                                刷新数据
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}