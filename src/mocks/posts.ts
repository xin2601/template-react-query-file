import type { Post } from '../types'

/**
 * Mock 文章数据
 */
export const mockPosts: Post[] = [
    {
        id: 1,
        title: "React Query 最佳实践指南",
        content: "React Query 是一个强大的数据获取库，它可以帮助我们更好地管理服务器状态。本文将介绍 React Query 的核心概念和最佳实践，包括查询缓存、后台更新、乐观更新等高级功能。通过学习这些内容，你将能够构建更加健壮和高性能的 React 应用程序。",
        excerpt: "React Query 是一个强大的数据获取库，它可以帮助我们更好地管理服务器状态...",
        authorId: 1,
        authorName: "张三",
        tags: ["React", "React Query", "前端开发"],
        status: "published",
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: 2,
        title: "TypeScript 高级类型系统详解",
        content: "TypeScript 的类型系统是其最强大的特性之一。本文深入探讨了 TypeScript 的高级类型特性，包括联合类型、交叉类型、条件类型、映射类型等。我们还会学习如何使用这些高级类型来构建类型安全的应用程序，以及如何利用 TypeScript 的类型推断来提高开发效率。",
        excerpt: "TypeScript 的类型系统是其最强大的特性之一。本文深入探讨了 TypeScript 的高级类型特性...",
        authorId: 2,
        authorName: "李四",
        tags: ["TypeScript", "类型系统", "前端开发"],
        status: "published",
        createdAt: "2024-01-14T14:20:00Z",
        updatedAt: "2024-01-14T14:20:00Z"
    },
    {
        id: 3,
        title: "现代前端架构设计模式",
        content: "随着前端应用的复杂度不断增加，选择合适的架构设计模式变得越来越重要。本文介绍了几种流行的前端架构模式，包括 MVC、MVP、MVVM，以及现代的组件化架构。我们将分析每种模式的优缺点，并提供实际的应用场景和最佳实践建议。",
        excerpt: "随着前端应用的复杂度不断增加，选择合适的架构设计模式变得越来越重要...",
        authorId: 1,
        authorName: "张三",
        tags: ["架构设计", "设计模式", "前端开发"],
        status: "published",
        createdAt: "2024-01-13T09:15:00Z",
        updatedAt: "2024-01-13T09:15:00Z"
    },
    {
        id: 4,
        title: "Vue 3 Composition API 深度解析",
        content: "Vue 3 引入的 Composition API 为我们提供了更灵活的组件逻辑组织方式。本文将详细介绍 Composition API 的核心概念，包括 setup 函数、响应式 API、生命周期钩子等。我们还会通过实际案例来演示如何使用 Composition API 来构建可复用的逻辑组件。",
        excerpt: "Vue 3 引入的 Composition API 为我们提供了更灵活的组件逻辑组织方式...",
        authorId: 3,
        authorName: "王五",
        tags: ["Vue 3", "Composition API", "前端框架"],
        status: "draft",
        createdAt: "2024-01-12T16:45:00Z",
        updatedAt: "2024-01-12T16:45:00Z"
    },
    {
        id: 5,
        title: "微前端架构实践与思考",
        content: "微前端是一种将前端应用分解为更小、更简单的块的架构风格，每个块都可以由不同的团队独立开发、测试和部署。本文分享了我们在实施微前端架构过程中的经验和教训，包括技术选型、团队协作、部署策略等方面的考虑。",
        excerpt: "微前端是一种将前端应用分解为更小、更简单的块的架构风格...",
        authorId: 2,
        authorName: "李四",
        tags: ["微前端", "架构", "团队协作"],
        status: "published",
        createdAt: "2024-01-11T11:30:00Z",
        updatedAt: "2024-01-11T11:30:00Z"
    },
    {
        id: 6,
        title: "性能优化：从理论到实践",
        content: "前端性能优化是一个永恒的话题。本文从理论基础出发，介绍了浏览器渲染原理、关键渲染路径等核心概念，然后结合实际案例，详细讲解了各种性能优化技术，包括代码分割、懒加载、缓存策略、图片优化等。最后还会介绍一些性能监控和分析工具。",
        excerpt: "前端性能优化是一个永恒的话题。本文从理论基础出发，介绍了浏览器渲染原理...",
        authorId: 1,
        authorName: "张三",
        tags: ["性能优化", "浏览器", "前端开发"],
        status: "published",
        createdAt: "2024-01-10T13:20:00Z",
        updatedAt: "2024-01-10T13:20:00Z"
    },
    {
        id: 7,
        title: "GraphQL 与 REST API 的对比分析",
        content: "GraphQL 作为一种新的 API 查询语言，在某些场景下相比传统的 REST API 具有明显优势。本文将从多个维度对比分析 GraphQL 和 REST API，包括数据获取效率、类型安全、开发体验等。我们还会讨论在什么情况下应该选择 GraphQL，以及如何进行技术迁移。",
        excerpt: "GraphQL 作为一种新的 API 查询语言，在某些场景下相比传统的 REST API 具有明显优势...",
        authorId: 3,
        authorName: "王五",
        tags: ["GraphQL", "REST API", "后端开发"],
        status: "draft",
        createdAt: "2024-01-09T15:10:00Z",
        updatedAt: "2024-01-09T15:10:00Z"
    },
    {
        id: 8,
        title: "CSS-in-JS 解决方案对比",
        content: "CSS-in-JS 是现代前端开发中的一个重要趋势，它将样式与组件紧密结合，提供了更好的封装性和动态性。本文对比分析了几种主流的 CSS-in-JS 解决方案，包括 styled-components、emotion、JSS 等，从性能、开发体验、生态系统等角度进行评估。",
        excerpt: "CSS-in-JS 是现代前端开发中的一个重要趋势，它将样式与组件紧密结合...",
        authorId: 2,
        authorName: "李四",
        tags: ["CSS-in-JS", "样式", "前端开发"],
        status: "published",
        createdAt: "2024-01-08T10:45:00Z",
        updatedAt: "2024-01-08T10:45:00Z"
    },
    {
        id: 9,
        title: "单元测试最佳实践",
        content: "单元测试是保证代码质量的重要手段。本文介绍了前端单元测试的最佳实践，包括测试策略制定、测试用例设计、Mock 技术使用、测试覆盖率分析等。我们还会学习如何使用 Jest、Testing Library 等工具来编写高质量的测试代码。",
        excerpt: "单元测试是保证代码质量的重要手段。本文介绍了前端单元测试的最佳实践...",
        authorId: 1,
        authorName: "张三",
        tags: ["单元测试", "代码质量", "测试工具"],
        status: "published",
        createdAt: "2024-01-07T14:30:00Z",
        updatedAt: "2024-01-07T14:30:00Z"
    },
    {
        id: 10,
        title: "Web Components 技术深度解析",
        content: "Web Components 是一套不同的技术，允许你创建可重用的定制元素。本文深入解析了 Web Components 的核心技术，包括 Custom Elements、Shadow DOM、HTML Templates 等。我们还会探讨 Web Components 与现代前端框架的关系，以及在实际项目中的应用场景。",
        excerpt: "Web Components 是一套不同的技术，允许你创建可重用的定制元素...",
        authorId: 3,
        authorName: "王五",
        tags: ["Web Components", "原生技术", "组件化"],
        status: "published",
        createdAt: "2024-01-06T12:15:00Z",
        updatedAt: "2024-01-06T12:15:00Z"
    },
    {
        id: 11,
        title: "Webpack 5 新特性详解",
        content: "Webpack 5 带来了许多令人兴奋的新特性和改进。本文详细介绍了 Webpack 5 的主要新特性，包括模块联邦、持久化缓存、Tree Shaking 优化、Asset Modules 等。我们还会学习如何从 Webpack 4 迁移到 Webpack 5，以及如何利用这些新特性来优化构建性能。",
        excerpt: "Webpack 5 带来了许多令人兴奋的新特性和改进...",
        authorId: 2,
        authorName: "李四",
        tags: ["Webpack 5", "构建工具", "前端工程化"],
        status: "draft",
        createdAt: "2024-01-05T09:20:00Z",
        updatedAt: "2024-01-05T09:20:00Z"
    },
    {
        id: 12,
        title: "Node.js 性能监控与调优",
        content: "Node.js 应用的性能监控和调优是后端开发中的重要环节。本文介绍了 Node.js 性能监控的各种方法和工具，包括内存泄漏检测、CPU 性能分析、事件循环监控等。我们还会学习如何使用 APM 工具来进行生产环境的性能监控，以及常见的性能优化技巧。",
        excerpt: "Node.js 应用的性能监控和调优是后端开发中的重要环节...",
        authorId: 1,
        authorName: "张三",
        tags: ["Node.js", "性能监控", "后端开发"],
        status: "published",
        createdAt: "2024-01-04T16:40:00Z",
        updatedAt: "2024-01-04T16:40:00Z"
    }
]

/**
 * 根据查询参数过滤文章
 */
export const filterPosts = (posts: Post[], params?: {
    page?: number
    pageSize?: number
    search?: string
    status?: string
    tags?: string[]
}): Post[] => {
    let filteredPosts = [...posts]

    // 搜索过滤
    if (params?.search) {
        const searchTerm = params.search.toLowerCase()
        filteredPosts = filteredPosts.filter(post =>
            post.title.toLowerCase().includes(searchTerm) ||
            post.content.toLowerCase().includes(searchTerm) ||
            post.excerpt?.toLowerCase().includes(searchTerm)
        )
    }

    // 状态过滤
    if (params?.status) {
        filteredPosts = filteredPosts.filter(post => post.status === params.status)
    }

    // 标签过滤
    if (params?.tags && params.tags.length > 0) {
        filteredPosts = filteredPosts.filter(post =>
            post.tags?.some(tag => params.tags!.includes(tag))
        )
    }

    // 分页
    if (params?.page && params?.pageSize) {
        const start = (params.page - 1) * params.pageSize
        const end = start + params.pageSize
        filteredPosts = filteredPosts.slice(start, end)
    }

    return filteredPosts
}

/**
 * 获取文章总数
 */
export const getPostsCount = (posts: Post[], params?: {
    search?: string
    status?: string
    tags?: string[]
}): number => {
    return filterPosts(posts, { ...params, page: undefined, pageSize: undefined }).length
}