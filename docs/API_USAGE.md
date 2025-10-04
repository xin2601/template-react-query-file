# API 使用文档

本文档详细介绍了项目中API的使用方法，包括HTTP客户端配置、数据类型定义、服务层API以及React Query集成的使用方式。

## 目录

- [项目概述](#项目概述)
- [HTTP 客户端](#http-客户端)
- [数据类型定义](#数据类型定义)
- [API 服务层](#api-服务层)
- [React Query 集成](#react-query-集成)
- [使用示例](#使用示例)
- [错误处理](#错误处理)
- [最佳实践](#最佳实践)

## 项目概述

本项目是一个基于 React + TypeScript + TanStack Router + React Query 的现代前端应用，采用了完整的API抽象层设计，包括：

- **HTTP 客户端层**：基于 `redaxios` 的轻量级HTTP客户端
- **类型定义层**：完整的TypeScript类型定义
- **服务层**：抽象的API服务类
- **React Query 集成**：查询和变更的Hook封装
- **Mock 数据层**：开发阶段的模拟数据

## HTTP 客户端

### 基础配置

HTTP客户端基于 `redaxios` 构建，提供了完整的请求/响应拦截和错误处理机制。

```typescript
// 文件位置: src/lib/http/client.ts
import { http } from '@/lib/http/client'

// 基础HTTP方法
const response = await http.get('/api/posts')
const newPost = await http.post('/api/posts', postData)
const updatedPost = await http.put('/api/posts/1', updateData)
const patchedPost = await http.patch('/api/posts/1', partialData)
await http.delete('/api/posts/1')
```

### 请求配置

支持自定义请求配置：

```typescript
import type { RequestConfig } from '@/lib/http/types'

const config: RequestConfig = {
  skipAuth: false,        // 是否跳过认证
  skipErrorHandler: false, // 是否跳过错误处理
  timeout: 5000,          // 请求超时时间
  retries: 3              // 重试次数
}

const response = await http.get('/api/posts', config)
```

### 请求重试

提供了自动重试机制：

```typescript
import { withRetry } from '@/lib/http/client'

const data = await withRetry(
  () => http.get('/api/posts'),
  3,    // 最大重试次数
  1000  // 延迟时间（毫秒）
)
```

### 取消请求

支持请求取消：

```typescript
import { createCancelToken } from '@/lib/http/client'

const { token, cancel } = createCancelToken()

// 发起请求
const request = http.get('/api/posts', { signal: token })

// 取消请求
cancel('用户取消了请求')
```

## 数据类型定义

### 基础响应类型

```typescript
// 文件位置: src/lib/http/types.ts

// 标准API响应格式
interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  success: boolean
}

// 分页响应格式
interface PaginatedResponse<T = any> {
  code: number
  message: string
  data: {
    items: T[]
    total: number
    page: number
    pageSize: number
    totalPages: number
  }
  success: boolean
}
```

### 文章相关类型

```typescript
// 文件位置: src/types/post.ts

// 文章实体
interface Post {
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

// 创建文章请求
interface CreatePostRequest {
  title: string
  content: string
  excerpt?: string
  tags?: string[]
  status?: 'draft' | 'published'
}

// 更新文章请求
interface UpdatePostRequest {
  title?: string
  content?: string
  excerpt?: string
  tags?: string[]
  status?: 'draft' | 'published' | 'archived'
}

// 查询参数
interface PostQueryParams {
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  authorId?: number
  status?: 'draft' | 'published' | 'archived'
  tags?: string[]
  search?: string
}
```

## API 服务层

### 基础服务类

所有API服务都继承自 `BaseApiService`：

```typescript
// 文件位置: src/services/api/base.ts
import { BaseApiService } from '@/services/api/base'

class MyApiService extends BaseApiService<MyEntity, CreateRequest, UpdateRequest> {
  constructor() {
    super('/api/my-resource')
  }
}
```

基础服务类提供的方法：

```typescript
// 获取单个资源
async getById(id: number | string, config?: RequestConfig): Promise<T>

// 获取资源列表
async getList(params?: PaginationParams, config?: RequestConfig): Promise<T[]>

// 获取分页资源列表
async getPaginatedList(params?: PaginationParams, config?: RequestConfig): Promise<PaginatedResponse<T>['data']>

// 创建资源
async create(data: CreateT, config?: RequestConfig): Promise<T>

// 更新资源
async update(id: number | string, data: UpdateT, config?: RequestConfig): Promise<T>

// 部分更新资源
async patch(id: number | string, data: Partial<UpdateT>, config?: RequestConfig): Promise<T>

// 删除资源
async delete(id: number | string, config?: RequestConfig): Promise<void>

// 批量删除资源
async batchDelete(ids: (number | string)[], config?: RequestConfig): Promise<void>

// 检查资源是否存在
async exists(id: number | string, config?: RequestConfig): Promise<boolean>

// 获取资源总数
async count(params?: Record<string, any>, config?: RequestConfig): Promise<number>
```

### 文章API服务

```typescript
// 文件位置: src/services/api/posts.ts
import { postApi } from '@/services/api/posts'

// 基础CRUD操作
const posts = await postApi.getList({ page: 1, pageSize: 10 })
const post = await postApi.getById(1)
const newPost = await postApi.create({ title: '新文章', content: '内容' })
const updatedPost = await postApi.update(1, { title: '更新标题' })
await postApi.delete(1)

// 扩展功能
const authorPosts = await postApi.getByAuthor(1, { page: 1, pageSize: 5 })
const searchResults = await postApi.search({ search: '关键词' })
const popularPosts = await postApi.getPopular(10)
const latestPosts = await postApi.getLatest(10)
const recommendedPosts = await postApi.getRecommended(userId, 10)

// 标签相关
const allTags = await postApi.getAllTags()
const popularTags = await postApi.getPopularTags(20)
const taggedPosts = await postApi.getByTags(['React', 'TypeScript'])

// 状态管理
const publishedPost = await postApi.publish(1)
const draftPost = await postApi.unpublish(1)
const archivedPost = await postApi.archive(1)

// 批量操作
await postApi.batchUpdateStatus([1, 2, 3], 'published')
```

## React Query 集成

### 查询 Hooks

项目提供了完整的React Query集成，包括查询和变更的Hook封装。

#### 基础查询

```typescript
// 文件位置: src/services/hooks/queries/usePosts.ts
import { usePost, usePosts } from '@/services/hooks/queries/usePosts'

// 获取单个文章
function PostDetail({ id }: { id: number }) {
  const { data: post, isLoading, error } = usePost(id)
  
  if (isLoading) return <div>加载中...</div>
  if (error) return <div>加载失败</div>
  
  return <div>{post?.title}</div>
}

// 获取文章列表
function PostList() {
  const { data: posts, isLoading } = usePosts({ 
    page: 1, 
    pageSize: 10,
    status: 'published' 
  })
  
  return (
    <div>
      {posts?.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
```

#### 分页查询

```typescript
import { usePostsPaginated } from '@/services/hooks/queries/usePosts'

function PaginatedPostList() {
  const { data, isLoading } = usePostsPaginated({ 
    page: 1, 
    pageSize: 10 
  })
  
  return (
    <div>
      {data?.items.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
      <div>总计: {data?.total} 条</div>
    </div>
  )
}
```

#### 无限滚动

```typescript
import { usePostsInfinite } from '@/services/hooks/queries/usePosts'

function InfinitePostList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePostsInfinite({ pageSize: 10 })
  
  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.items.map(post => (
            <div key={post.id}>{post.title}</div>
          ))}
        </div>
      ))}
      
      {hasNextPage && (
        <button 
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? '加载中...' : '加载更多'}
        </button>
      )}
    </div>
  )
}
```

#### 条件查询

```typescript
import { 
  usePostsByAuthor, 
  usePostsByTags, 
  usePostSearch 
} from '@/services/hooks/queries/usePosts'

// 按作者查询
function AuthorPosts({ authorId }: { authorId: number }) {
  const { data: posts } = usePostsByAuthor(authorId, { 
    status: 'published' 
  })
  
  return <div>{/* 渲染作者文章 */}</div>
}

// 按标签查询
function TaggedPosts({ tags }: { tags: string[] }) {
  const { data: posts } = usePostsByTags(tags)
  
  return <div>{/* 渲染标签文章 */}</div>
}

// 搜索文章
function SearchResults({ searchTerm }: { searchTerm: string }) {
  const { data: posts } = usePostSearch({ 
    search: searchTerm 
  }, {
    enabled: !!searchTerm // 只有当搜索词存在时才执行查询
  })
  
  return <div>{/* 渲染搜索结果 */}</div>
}
```

#### 特殊查询

```typescript
import { 
  usePopularPosts, 
  useLatestPosts, 
  useRecommendedPosts,
  useAllTags,
  usePopularTags
} from '@/services/hooks/queries/usePosts'

// 热门文章
function PopularPosts() {
  const { data: posts } = usePopularPosts(10)
  return <div>{/* 渲染热门文章 */}</div>
}

// 最新文章
function LatestPosts() {
  const { data: posts } = useLatestPosts(10)
  return <div>{/* 渲染最新文章 */}</div>
}

// 推荐文章
function RecommendedPosts({ userId }: { userId?: number }) {
  const { data: posts } = useRecommendedPosts(userId, 10)
  return <div>{/* 渲染推荐文章 */}</div>
}

// 所有标签
function TagList() {
  const { data: tags } = useAllTags()
  return <div>{/* 渲染标签列表 */}</div>
}

// 热门标签
function PopularTagList() {
  const { data: tags } = usePopularTags(20)
  return (
    <div>
      {tags?.map(({ tag, count }) => (
        <span key={tag}>{tag} ({count})</span>
      ))}
    </div>
  )
}
```

### 变更 Hooks

```typescript
// 文件位置: src/services/hooks/mutations/usePostMutations.ts
import { 
  useCreatePost, 
  useUpdatePost, 
  useDeletePost,
  usePublishPost,
  useUnpublishPost,
  useArchivePost
} from '@/services/hooks/mutations/usePostMutations'

function PostEditor() {
  const createPost = useCreatePost({
    onSuccess: (data) => {
      console.log('文章创建成功:', data)
      // 可以进行页面跳转等操作
    },
    onError: (error) => {
      console.error('创建失败:', error)
    }
  })
  
  const updatePost = useUpdatePost({
    onSuccess: () => {
      console.log('更新成功')
    }
  })
  
  const deletePost = useDeletePost({
    onSuccess: () => {
      console.log('删除成功')
    }
  })
  
  const publishPost = usePublishPost()
  const unpublishPost = useUnpublishPost()
  const archivePost = useArchivePost()
  
  const handleCreate = () => {
    createPost.mutate({
      title: '新文章标题',
      content: '文章内容',
      tags: ['React', 'TypeScript']
    })
  }
  
  const handleUpdate = (id: number) => {
    updatePost.mutate({
      id,
      data: { title: '更新后的标题' }
    })
  }
  
  const handleDelete = (id: number) => {
    deletePost.mutate(id)
  }
  
  const handlePublish = (id: number) => {
    publishPost.mutate(id)
  }
  
  return (
    <div>
      <button onClick={handleCreate} disabled={createPost.isPending}>
        {createPost.isPending ? '创建中...' : '创建文章'}
      </button>
      {/* 其他操作按钮 */}
    </div>
  )
}
```

### 批量操作

```typescript
import { 
  useBatchDeletePosts, 
  useBatchUpdatePostStatus 
} from '@/services/hooks/mutations/usePostMutations'

function PostManagement() {
  const batchDelete = useBatchDeletePosts({
    onSuccess: () => {
      console.log('批量删除成功')
    }
  })
  
  const batchUpdateStatus = useBatchUpdatePostStatus({
    onSuccess: () => {
      console.log('批量更新状态成功')
    }
  })
  
  const handleBatchDelete = (ids: number[]) => {
    batchDelete.mutate(ids)
  }
  
  const handleBatchPublish = (ids: number[]) => {
    batchUpdateStatus.mutate({ ids, status: 'published' })
  }
  
  return (
    <div>
      <button onClick={() => handleBatchDelete([1, 2, 3])}>
        批量删除
      </button>
      <button onClick={() => handleBatchPublish([1, 2, 3])}>
        批量发布
      </button>
    </div>
  )
}
```

## 使用示例

### 完整的文章管理组件

```typescript
import React, { useState } from 'react'
import {
  usePosts,
  useCreatePost,
  useUpdatePost,
  useDeletePost,
  usePublishPost
} from '@/services/hooks'
import type { Post, CreatePostRequest } from '@/types'

function PostManager() {
  const [page, setPage] = useState(1)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  
  // 查询文章列表
  const { 
    data: posts, 
    isLoading, 
    error,
    refetch 
  } = usePosts({ 
    page, 
    pageSize: 10,
    status: 'published' 
  })
  
  // 变更操作
  const createPost = useCreatePost({
    onSuccess: () => {
      refetch() // 刷新列表
      setEditingPost(null)
    }
  })
  
  const updatePost = useUpdatePost({
    onSuccess: () => {
      refetch()
      setEditingPost(null)
    }
  })
  
  const deletePost = useDeletePost({
    onSuccess: () => {
      refetch()
    }
  })
  
  const publishPost = usePublishPost({
    onSuccess: () => {
      refetch()
    }
  })
  
  const handleSubmit = (data: CreatePostRequest) => {
    if (editingPost) {
      updatePost.mutate({ id: editingPost.id, data })
    } else {
      createPost.mutate(data)
    }
  }
  
  const handleDelete = (id: number) => {
    if (confirm('确定要删除这篇文章吗？')) {
      deletePost.mutate(id)
    }
  }
  
  const handlePublish = (id: number) => {
    publishPost.mutate(id)
  }
  
  if (isLoading) return <div>加载中...</div>
  if (error) return <div>加载失败: {error.message}</div>
  
  return (
    <div>
      <h1>文章管理</h1>
      
      {/* 文章列表 */}
      <div>
        {posts?.map(post => (
          <div key={post.id} className="post-item">
            <h3>{post.title}</h3>
            <p>状态: {post.status}</p>
            <p>作者: {post.authorName}</p>
            <p>标签: {post.tags?.join(', ')}</p>
            
            <div className="actions">
              <button onClick={() => setEditingPost(post)}>
                编辑
              </button>
              <button onClick={() => handleDelete(post.id)}>
                删除
              </button>
              {post.status === 'draft' && (
                <button onClick={() => handlePublish(post.id)}>
                  发布
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* 分页 */}
      <div className="pagination">
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          上一页
        </button>
        <span>第 {page} 页</span>
        <button onClick={() => setPage(p => p + 1)}>
          下一页
        </button>
      </div>
      
      {/* 编辑表单 */}
      {editingPost && (
        <PostForm
          post={editingPost}
          onSubmit={handleSubmit}
          onCancel={() => setEditingPost(null)}
          isSubmitting={updatePost.isPending}
        />
      )}
      
      {/* 创建按钮 */}
      <button onClick={() => setEditingPost({} as Post)}>
        创建新文章
      </button>
    </div>
  )
}
```

### 搜索和过滤组件

```typescript
import React, { useState, useMemo } from 'react'
import { usePostSearch, useAllTags } from '@/services/hooks'
import { debounce } from 'lodash'

function PostSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [status, setStatus] = useState<string>('')
  
  // 防抖搜索
  const debouncedSearch = useMemo(
    () => debounce((term: string) => setSearchTerm(term), 300),
    []
  )
  
  // 搜索文章
  const { data: searchResults, isLoading } = usePostSearch({
    search: searchTerm,
    tags: selectedTags.length > 0 ? selectedTags : undefined,
    status: status || undefined
  }, {
    enabled: !!(searchTerm || selectedTags.length > 0 || status)
  })
  
  // 获取所有标签
  const { data: allTags } = useAllTags()
  
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }
  
  return (
    <div>
      <h2>搜索文章</h2>
      
      {/* 搜索输入 */}
      <input
        type="text"
        placeholder="搜索文章..."
        onChange={(e) => debouncedSearch(e.target.value)}
      />
      
      {/* 状态过滤 */}
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">所有状态</option>
        <option value="draft">草稿</option>
        <option value="published">已发布</option>
        <option value="archived">已归档</option>
      </select>
      
      {/* 标签过滤 */}
      <div className="tags">
        <h3>标签过滤</h3>
        {allTags?.map(tag => (
          <label key={tag}>
            <input
              type="checkbox"
              checked={selectedTags.includes(tag)}
              onChange={() => handleTagToggle(tag)}
            />
            {tag}
          </label>
        ))}
      </div>
      
      {/* 搜索结果 */}
      <div className="results">
        {isLoading && <div>搜索中...</div>}
        {searchResults?.map(post => (
          <div key={post.id} className="search-result">
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <div className="meta">
              <span>作者: {post.authorName}</span>
              <span>状态: {post.status}</span>
              <span>标签: {post.tags?.join(', ')}</span>
            </div>
          </div>
        ))}
        {searchResults?.length === 0 && (
          <div>没有找到匹配的文章</div>
        )}
      </div>
    </div>
  )
}
```

## 错误处理

### 全局错误处理

项目提供了完整的错误处理机制：

```typescript
// 文件位置: src/lib/http/interceptors.ts

// 监听全局错误事件
useEffect(() => {
  const handleUnauthorized = () => {
    // 处理未授权错误
    console.log('用户未授权，请重新登录')
    // 跳转到登录页面
  }
  
  const handleForbidden = () => {
    // 处理禁止访问错误
    console.log('没有权限访问此资源')
  }
  
  const handleServerError = (event: CustomEvent) => {
    // 处理服务器错误
    console.error('服务器错误:', event.detail)
  }
  
  window.addEventListener('auth:unauthorized', handleUnauthorized)
  window.addEventListener('auth:forbidden', handleForbidden)
  window.addEventListener('http:server-error', handleServerError)
  
  return () => {
    window.removeEventListener('auth:unauthorized', handleUnauthorized)
    window.removeEventListener('auth:forbidden', handleForbidden)
    window.removeEventListener('http:server-error', handleServerError)
  }
}, [])
```

### React Query 错误处理

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        // 某些错误不重试
        if (error?.code === 401 || error?.code === 403 || error?.code === 404) {
          return false
        }
        return failureCount < 3
      },
      staleTime: 5 * 60 * 1000, // 5分钟
      gcTime: 10 * 60 * 1000,   // 10分钟
    },
    mutations: {
      retry: false, // 变更操作不自动重试
    },
  },
})

// 全局错误边界
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

### 组件级错误处理

```typescript
function PostList() {
  const { data, error, isLoading, refetch } = usePosts()
  
  if (isLoading) {
    return <div>加载中...</div>
  }
  
  if (error) {
    return (
      <div className="error">
        <h3>加载失败</h3>
        <p>{error.message}</p>
        <button onClick={() => refetch()}>重试</button>
      </div>
    )
  }
  
  return (
    <div>
      {data?.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
```

## 最佳实践

### 1. 查询键管理

使用查询键工厂来统一管理查询键：

```typescript
// 文件位置: src/services/hooks/queries/usePosts.ts
export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (params: PostQueryParams) => [...postKeys.lists(), params] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: number | string) => [...postKeys.details(), id] as const,
  // ... 其他查询键
}
```

### 2. 缓存策略

根据数据特性设置合适的缓存时间：

```typescript
// 静态数据（如标签列表）- 长缓存
const { data: tags } = useAllTags({
  staleTime: 30 * 60 * 1000, // 30分钟
  cacheTime: 60 * 60 * 1000, // 1小时
})

// 动态数据（如文章列表）- 短缓存
const { data: posts } = usePosts(params, {
  staleTime: 2 * 60 * 1000,  // 2分钟
  cacheTime: 5 * 60 * 1000,  // 5分钟
})

// 实时数据（如搜索结果）- 极短缓存
const { data: results } = usePostSearch(searchParams, {
  staleTime: 30 * 1000,      // 30秒
  cacheTime: 2 * 60 * 1000,  // 2分钟
})
```

### 3. 条件查询

合理使用 `enabled` 选项来控制查询执行：

```typescript
// 只有当用户ID存在时才查询用户文章
const { data: userPosts } = usePostsByAuthor(userId, params, {
  enabled: !!userId
})

// 只有当搜索词不为空时才执行搜索
const { data: searchResults } = usePostSearch({ search: searchTerm }, {
  enabled: !!searchTerm && searchTerm.length >= 2
})
```

### 4. 乐观更新

对于用户体验要求高的操作，使用乐观更新：

```typescript
const updatePost = useUpdatePost({
  onMutate: async ({ id, data }) => {
    // 取消相关查询
    await queryClient.cancelQueries({ queryKey: postKeys.detail(id) })
    
    // 获取当前数据
    const previousPost = queryClient.getQueryData(postKeys.detail(id))
    
    // 乐观更新
    queryClient.setQueryData(postKeys.detail(id), (old: Post) => ({
      ...old,
      ...data,
      updatedAt: new Date().toISOString()
    }))
    
    return { previousPost }
  },
  onError: (err, variables, context) => {
    // 回滚乐观更新
    if (context?.previousPost) {
      queryClient.setQueryData(postKeys.detail(variables.id), context.previousPost)
    }
  },
  onSettled: (data, error, variables) => {
    // 重新获取数据确保一致性
    queryClient.invalidateQueries({ queryKey: postKeys.detail(variables.id) })
  }
})
```

### 5. 预加载数据

在用户可能需要数据之前预加载：

```typescript
import { useQueryClient } from '@tanstack/react-query'

function PostListItem({ post }: { post: Post }) {
  const queryClient = useQueryClient()
  
  const handleMouseEnter = () => {
    // 预加载文章详情
    queryClient.prefetchQuery({
      queryKey: postKeys.detail(post.id),
      queryFn: () => postApi.getById(post.id),
      staleTime: 5 * 60 * 1000
    })
  }
  
  return (
    <div onMouseEnter={handleMouseEnter}>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
    </div>
  )
}
```

### 6. 错误重试策略

根据错误类型制定重试策略：

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        // 客户端错误不重试
        if (error?.code >= 400 && error?.code < 500) {
          return false
        }
        // 服务器错误重试3次
        if (error?.code >= 500) {
          return failureCount < 3
        }
        // 网络错误重试5次
        return failureCount < 5
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
    }
  }
})
```

### 7. 类型安全

充分利用TypeScript的类型系统：

```typescript
// 使用泛型确保类型安全
const useTypedQuery = <T>(
  queryKey: QueryKey,
  queryFn: () => Promise<T>,
  options?: UseQueryOptions<T>
) => {
  return useQuery({
    queryKey,
    queryFn,
    ...options
  })
}

// 使用联合类型限制参数值
type PostStatus = 'draft' | 'published' | 'archived'

const usePostsByStatus = (status: PostStatus) => {
  return usePosts({ status })
}
```

---

本文档涵盖了项目API的完整使用方法，包括HTTP客户端配置、数据类型定义、服务层API以及React Query集成。通过遵循这些最佳实践，可以构建出高性能、类型安全且易于维护的前端应用。