import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
    usePosts,
    useCreatePost,
    useUpdatePost,
    useDeletePost,
    usePostSearch,
    usePopularPosts,
    useLatestPosts,
    useAllTags
} from '../services'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Spinner } from '../components/ui/spinner'
import { Alert, AlertDescription } from '../components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import type { Post, CreatePostRequest } from '../types'

export const Route = createFileRoute('/posts')({
    component: PostsPage,
})

function PostsPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [editingPost, setEditingPost] = useState<Post | null>(null)
    const [selectedStatus, setSelectedStatus] = useState<'draft' | 'published' | 'archived'>('published')

    // 查询 hooks
    const {
        data: posts,
        isLoading: postsLoading,
        error: postsError,
        refetch: refetchPosts
    } = usePosts({ page: 1, pageSize: 10, status: selectedStatus })

    const {
        data: searchResults,
        isLoading: searchLoading
    } = usePostSearch(
        { search: searchTerm, page: 1, pageSize: 5 },
        { enabled: searchTerm.length > 2 }
    )

    const { data: popularPosts } = usePopularPosts(5)
    const { data: latestPosts } = useLatestPosts(5)
    const { data: allTags } = useAllTags()

    // 变更 hooks
    const createPost = useCreatePost({
        onSuccess: () => {
            setShowCreateForm(false)
            refetchPosts()
        },
        onError: (error) => {
            console.error('创建文章失败:', error)
        }
    })

    const updatePost = useUpdatePost({
        onSuccess: () => {
            setEditingPost(null)
            refetchPosts()
        },
        onError: (error) => {
            console.error('更新文章失败:', error)
        }
    })

    const deletePost = useDeletePost({
        onSuccess: () => {
            refetchPosts()
        },
        onError: (error) => {
            console.error('删除文章失败:', error)
        }
    })

    const handleCreatePost = (formData: FormData) => {
        const tags = (formData.get('tags') as string)
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0)

        const postData: CreatePostRequest = {
            title: formData.get('title') as string,
            content: formData.get('content') as string,
            excerpt: formData.get('excerpt') as string || undefined,
            tags: tags.length > 0 ? tags : undefined,
            status: formData.get('status') as 'draft' | 'published' || 'draft',
        }
        createPost.mutate(postData)
    }

    const handleUpdatePost = (formData: FormData) => {
        if (!editingPost) return

        const tags = (formData.get('tags') as string)
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0)

        const postData = {
            title: formData.get('title') as string,
            content: formData.get('content') as string,
            excerpt: formData.get('excerpt') as string || undefined,
            tags: tags.length > 0 ? tags : undefined,
            status: formData.get('status') as 'draft' | 'published' | 'archived',
        }
        updatePost.mutate({ id: editingPost.id, data: postData })
    }

    const handleDeletePost = (id: number) => {
        if (confirm('确定要删除这篇文章吗？')) {
            deletePost.mutate(id)
        }
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">文章管理</h1>
                <Button
                    onClick={() => setShowCreateForm(true)}
                    disabled={createPost.isPending}
                >
                    {createPost.isPending && <Spinner className="mr-2 h-4 w-4" />}
                    创建文章
                </Button>
            </div>

            <Tabs defaultValue="list" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="list">文章列表</TabsTrigger>
                    <TabsTrigger value="popular">热门文章</TabsTrigger>
                    <TabsTrigger value="latest">最新文章</TabsTrigger>
                    <TabsTrigger value="search">搜索文章</TabsTrigger>
                </TabsList>

                {/* 文章列表 */}
                <TabsContent value="list" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle>文章列表</CardTitle>
                                    <CardDescription>管理系统中的所有文章</CardDescription>
                                </div>
                                <Select value={selectedStatus} onValueChange={(value: any) => setSelectedStatus(value)}>
                                    <SelectTrigger className="w-32">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">草稿</SelectItem>
                                        <SelectItem value="published">已发布</SelectItem>
                                        <SelectItem value="archived">已归档</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {postsLoading ? (
                                <div className="flex justify-center py-8">
                                    <Spinner className="h-8 w-8" />
                                </div>
                            ) : postsError ? (
                                <Alert variant="destructive">
                                    <AlertDescription>
                                        加载文章列表失败: {postsError.message}
                                    </AlertDescription>
                                </Alert>
                            ) : posts && posts.length === 0 ? (
                                <p className="text-center py-8 text-gray-500">暂无文章数据</p>
                            ) : (
                                <div className="grid gap-4">
                                    {posts?.map((post) => (
                                        <div key={post.id} className="border rounded-lg p-4 space-y-3">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg">{post.title}</h3>
                                                    {post.excerpt && (
                                                        <p className="text-gray-600 mt-1">{post.excerpt}</p>
                                                    )}
                                                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                                        <Badge variant="outline">{post.status}</Badge>
                                                        <span>作者ID: {post.authorId}</span>
                                                        <span>创建时间: {new Date(post.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                    {post.tags && post.tags.length > 0 && (
                                                        <div className="flex gap-1 mt-2">
                                                            {post.tags.map((tag, index) => (
                                                                <Badge key={index} variant="secondary" className="text-xs">
                                                                    {tag}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex gap-2 ml-4">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => setEditingPost(post)}
                                                        disabled={updatePost.isPending}
                                                    >
                                                        编辑
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => handleDeletePost(post.id)}
                                                        disabled={deletePost.isPending}
                                                    >
                                                        {deletePost.isPending && <Spinner className="mr-2 h-4 w-4" />}
                                                        删除
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* 热门文章 */}
                <TabsContent value="popular">
                    <Card>
                        <CardHeader>
                            <CardTitle>热门文章</CardTitle>
                            <CardDescription>最受欢迎的文章</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {popularPosts ? (
                                <div className="grid gap-3">
                                    {popularPosts.map((post, index) => (
                                        <div key={post.id} className="flex items-center gap-3 p-3 border rounded">
                                            <Badge variant="outline">#{index + 1}</Badge>
                                            <div className="flex-1">
                                                <h4 className="font-medium">{post.title}</h4>
                                                <p className="text-sm text-gray-500">作者ID: {post.authorId}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex justify-center py-8">
                                    <Spinner className="h-6 w-6" />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* 最新文章 */}
                <TabsContent value="latest">
                    <Card>
                        <CardHeader>
                            <CardTitle>最新文章</CardTitle>
                            <CardDescription>最近发布的文章</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {latestPosts ? (
                                <div className="grid gap-3">
                                    {latestPosts.map((post) => (
                                        <div key={post.id} className="flex items-center gap-3 p-3 border rounded">
                                            <div className="flex-1">
                                                <h4 className="font-medium">{post.title}</h4>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(post.createdAt).toLocaleString()}
                                                </p>
                                            </div>
                                            <Badge variant="outline">{post.status}</Badge>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex justify-center py-8">
                                    <Spinner className="h-6 w-6" />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* 搜索文章 */}
                <TabsContent value="search">
                    <Card>
                        <CardHeader>
                            <CardTitle>搜索文章</CardTitle>
                            <CardDescription>根据标题或内容搜索文章</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-4 mb-4">
                                <Input
                                    placeholder="搜索文章..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-1"
                                />
                                {searchLoading && <Spinner className="h-6 w-6" />}
                            </div>

                            {/* 搜索结果 */}
                            {searchTerm.length > 2 && searchResults && (
                                <div className="space-y-3">
                                    <h4 className="font-medium">搜索结果:</h4>
                                    {searchResults.length === 0 ? (
                                        <p className="text-gray-500">未找到匹配的文章</p>
                                    ) : (
                                        <div className="grid gap-3">
                                            {searchResults.map((post) => (
                                                <div key={post.id} className="p-3 border rounded">
                                                    <h4 className="font-medium">{post.title}</h4>
                                                    {post.excerpt && (
                                                        <p className="text-sm text-gray-600 mt-1">{post.excerpt}</p>
                                                    )}
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <Badge variant="outline">{post.status}</Badge>
                                                        <span className="text-xs text-gray-500">
                                                            {new Date(post.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* 所有标签 */}
                            {allTags && (
                                <div className="mt-6">
                                    <h4 className="font-medium mb-3">所有标签:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {allTags.map((tag, index) => (
                                            <Badge key={index} variant="secondary" className="cursor-pointer">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* 创建文章表单 */}
            {showCreateForm && (
                <Card>
                    <CardHeader>
                        <CardTitle>创建新文章</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            handleCreatePost(new FormData(e.currentTarget))
                        }} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">标题</label>
                                <Input name="title" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">摘要 (可选)</label>
                                <Input name="excerpt" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">内容</label>
                                <Textarea name="content" rows={6} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">标签 (用逗号分隔)</label>
                                <Input name="tags" placeholder="React, TypeScript, Web开发" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">状态</label>
                                <Select name="status" defaultValue="draft">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">草稿</SelectItem>
                                        <SelectItem value="published">发布</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={createPost.isPending}>
                                    {createPost.isPending && <Spinner className="mr-2 h-4 w-4" />}
                                    创建文章
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowCreateForm(false)}
                                >
                                    取消
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* 编辑文章表单 */}
            {editingPost && (
                <Card>
                    <CardHeader>
                        <CardTitle>编辑文章</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            handleUpdatePost(new FormData(e.currentTarget))
                        }} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">标题</label>
                                <Input name="title" defaultValue={editingPost.title} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">摘要 (可选)</label>
                                <Input name="excerpt" defaultValue={editingPost.excerpt || ''} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">内容</label>
                                <Textarea name="content" rows={6} defaultValue={editingPost.content} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">标签 (用逗号分隔)</label>
                                <Input
                                    name="tags"
                                    defaultValue={editingPost.tags?.join(', ') || ''}
                                    placeholder="React, TypeScript, Web开发"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">状态</label>
                                <Select name="status" defaultValue={editingPost.status}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">草稿</SelectItem>
                                        <SelectItem value="published">发布</SelectItem>
                                        <SelectItem value="archived">归档</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={updatePost.isPending}>
                                    {updatePost.isPending && <Spinner className="mr-2 h-4 w-4" />}
                                    更新文章
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setEditingPost(null)}
                                >
                                    取消
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}