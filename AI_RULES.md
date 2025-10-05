# AI开发规则说明文档

## 项目概述

本项目是一个基于现代React技术栈的Web应用程序，使用以下核心技术：

- **React 19** - 前端框架
- **TanStack Router v1.132.27** - 文件路由系统，支持自动代码分割
- **TanStack React Query v5.66.0** - 数据获取和状态管理
- **TypeScript 5.7.2** - 类型安全
- **Tailwind CSS 3.4.17** - 样式框架
- **shadcn/ui** - 基于Radix UI的现代化UI组件库
- **Vite 7.1.7** - 构建工具
- **redaxios 0.5.1** - 轻量级HTTP客户端
- **React Hook Form 7.64.0** - 表单处理
- **Zod 3.24.2** - 模式验证
- **next-themes 0.4.6** - 主题切换支持

## 📚 重要参考文档

在开始开发前，请务必阅读以下文档：

- **[API使用文档](docs/API_USAGE.md)** - 详细的API使用指南，包括HTTP客户端、服务层、React Query集成等
- **[shadcn/ui使用指南](docs/SHADCN_UI_GUIDE.md)** - UI组件库的详细使用说明
- **[Zustand状态管理指南](docs/ZUSTAND_GUIDE.md)** - 状态管理库的详细使用说明

## AI开发规则

### 1. 代码风格和规范

#### TypeScript规范
- 所有新文件必须使用TypeScript（`.tsx`或`.ts`扩展名）
- 严格遵循TypeScript类型检查，避免使用`any`类型
- 为所有函数参数、返回值和组件props定义明确的类型
- 使用接口（interface）定义复杂对象类型
- 优先使用类型推断，但在不明确的情况下显式声明类型

```typescript
// ✅ 正确示例
interface UserProps {
  id: number;
  name: string;
  email?: string;
}

const UserCard: React.FC<UserProps> = ({ id, name, email }) => {
  return <div>{name}</div>;
};

// ❌ 错误示例
const UserCard = (props: any) => {
  return <div>{props.name}</div>;
};
```

#### React组件规范
- 使用函数组件和React Hooks
- 组件名称使用PascalCase命名
- 文件名与组件名保持一致
- 优先使用命名导出而非默认导出（除路由组件外）
- 组件内部逻辑按以下顺序组织：
  1. Hooks调用
  2. 事件处理函数
  3. 渲染逻辑

```typescript
// ✅ 正确示例
export const PostCard = ({ post }: { post: Post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div onClick={handleToggle}>
      {/* 组件内容 */}
    </div>
  );
};
```

### 2. 路由系统规范

#### 文件路由结构
- 使用TanStack Router的文件路由系统
- 路由文件放置在`src/routes/`目录下
- 路由文件命名规范：
  - `index.tsx` - 索引路由
  - `$param.tsx` - 动态参数路由
  - `route.tsx` - 布局路由
  - `_layout.tsx` - 无路径布局

#### 路由组件规范
```typescript
// ✅ 路由组件示例
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts/$postId')({
  component: PostDetail,
  loader: ({ params }) => fetchPost(params.postId),
});

function PostDetail() {
  const { postId } = Route.useParams();
  const post = Route.useLoaderData();
  
  return <div>{post.title}</div>;
}
```

### 3. 数据获取和API规范

#### 基本原则
- 所有API调用必须通过React Query进行
- 使用项目的服务层架构（BaseApiService）
- 开发阶段使用Mock数据
- 遵循统一的错误处理机制

#### 详细使用指南
**请参考 [API使用文档](docs/API_USAGE.md) 获取完整的API使用指南，包括：**
- HTTP客户端配置和使用
- 服务层架构（BaseApiService、Mock数据层）
- React Query集成（查询键工厂、缓存策略）
- 类型定义和数据适配器
- 错误处理和最佳实践

#### 快速示例
```typescript
// ✅ 基本使用模式
import { usePosts, useCreatePost } from '@/services/hooks';

function PostList() {
  const { data: posts, isLoading } = usePosts({ page: 1, pageSize: 10 });
  const createPost = useCreatePost({
    onSuccess: () => console.log('创建成功')
  });
  
  if (isLoading) return <div>加载中...</div>;
  
  return (
    <div>
      {posts?.map(post => <div key={post.id}>{post.title}</div>)}
    </div>
  );
}
```

### 4. 类型定义规范

#### 基本原则
- 所有类型定义集中在`src/types/`目录
- 按功能模块划分类型文件
- 使用接口定义复杂对象类型
- 导出统一的类型索引

#### 详细类型定义
**请参考 [API使用文档](docs/API_USAGE.md) 中的"数据类型定义"章节，包括：**
- 基础响应类型（ApiResponse、PaginatedResponse）
- 业务实体类型（Post、User等）
- 请求参数类型（CreateRequest、UpdateRequest、QueryParams）
- HTTP配置类型（RequestConfig）

```typescript
// ✅ 基本类型使用示例
import type { Post, CreatePostRequest, PostQueryParams } from '@/types';

const post: Post = {
  id: 1,
  title: '示例文章',
  content: '内容...',
  status: 'published',
  // ...其他字段
};
```

### 5. 文件组织规范

#### 目录结构
```
src/
├── components/          # 可重用组件
│   └── ui/             # shadcn/ui基础组件
├── hooks/              # 自定义Hooks
├── lib/                # 工具函数和配置
│   └── http/           # HTTP客户端相关
├── mocks/              # Mock数据
├── routes/             # 路由组件
├── services/           # 服务层
│   ├── api/            # API服务类
│   ├── adapters/       # 数据适配器
│   └── hooks/          # React Query Hooks
│       ├── queries/    # 查询Hooks
│       └── mutations/  # 变更Hooks
├── types/              # TypeScript类型定义
├── utils/              # 通用工具函数
└── styles.css          # 全局样式
```

#### 文件命名规范
- 组件文件：PascalCase（如`UserCard.tsx`）
- Hook文件：camelCase + `use`前缀（如`usePosts.ts`）
- 服务文件：camelCase（如`posts.ts`）
- 类型文件：camelCase（如`post.ts`）
- 工具文件：camelCase（如`utils.ts`）
- 常量文件：UPPER_SNAKE_CASE（如`API_CONSTANTS.ts`）

**详细的服务层文件组织请参考 [API使用文档](docs/API_USAGE.md)**

### 6. UI组件规范

#### 基本原则
- 优先使用项目中已配置的shadcn/ui组件（`src/components/ui/`）
- 保持组件的无障碍性（accessibility）
- 使用Tailwind CSS进行样式定制
- 遵循设计系统的一致性

#### 详细使用指南
**请参考 [shadcn/ui使用指南](docs/SHADCN_UI_GUIDE.md) 获取完整的组件使用说明**

#### 样式规范
- 使用Tailwind CSS类名进行样式设置
- 避免内联样式和CSS-in-JS
- 使用`clsx`或`cn`工具函数处理条件样式
- 保持响应式设计

```typescript
// ✅ 基本组件使用示例
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const PostCard = ({ post }: { post: Post }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{post.excerpt}</p>
        <Button variant="outline">阅读更多</Button>
      </CardContent>
    </Card>
  );
};
```

### 9. 性能优化规范

#### React性能优化
- 使用`React.memo`包装纯组件
- 合理使用`useMemo`和`useCallback`
- 避免在渲染函数中创建对象和函数
- 使用懒加载（`React.lazy`）分割代码
- 利用TanStack Router的自动代码分割功能

```typescript
// ✅ 性能优化示例
import { memo, useMemo, useCallback } from 'react';

export const PostList = memo(({ posts, onPostClick }: PostListProps) => {
  const sortedPosts = useMemo(() =>
    posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [posts]
  );
  
  const handlePostClick = useCallback((postId: number) => {
    onPostClick(postId);
  }, [onPostClick]);
  
  return (
    <div>
      {sortedPosts.map(post => (
        <PostCard key={post.id} post={post} onClick={handlePostClick} />
      ))}
    </div>
  );
});
```

#### 查询优化
- 设置合适的`staleTime`和`gcTime`（原`cacheTime`）
- 使用查询预取（prefetching）
- 实现乐观更新
- 避免不必要的重新获取
- 使用无限查询实现无限滚动

```typescript
// ✅ 查询优化示例
// 静态数据 - 长缓存
const { data: tags } = useAllTags({
  staleTime: 30 * 60 * 1000, // 30分钟
  gcTime: 60 * 60 * 1000,    // 1小时
});

// 动态数据 - 短缓存
const { data: posts } = usePosts(params, {
  staleTime: 2 * 60 * 1000,  // 2分钟
  gcTime: 5 * 60 * 1000,     // 5分钟
});

// 预加载数据
const queryClient = useQueryClient();
const handleMouseEnter = (postId: number) => {
  queryClient.prefetchQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => postApi.getById(postId),
    staleTime: 5 * 60 * 1000
  });
};
```

### 10. 错误处理规范

#### 全局错误处理
- 使用HTTP拦截器处理全局错误
- 实现统一的错误响应格式
- 提供用户友好的错误提示
- 记录错误日志用于调试

```typescript
// ✅ 全局错误处理示例
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        // 客户端错误不重试
        if (error?.code >= 400 && error?.code < 500) {
          return false;
        }
        // 服务器错误重试3次
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: false, // 变更操作不自动重试
    },
  },
});
```

#### 错误边界
- 在适当的层级设置错误边界
- 提供用户友好的错误信息
- 实现错误恢复机制

```typescript
// ✅ 错误边界示例
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert" className="p-4 border border-red-200 rounded-md">
      <h2 className="text-lg font-semibold text-red-800">出现了错误</h2>
      <p className="text-red-600">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
      >
        重试
      </button>
    </div>
  );
}

// 使用错误边界
<ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
  <App />
</ErrorBoundary>
```

### 11. 测试规范

#### 单元测试
- 为所有工具函数编写单元测试
- 测试组件的关键交互逻辑
- 使用React Testing Library进行组件测试
- 测试自定义Hooks的行为

#### 集成测试
- 测试路由导航
- 测试数据获取流程
- 测试用户交互场景
- 测试错误处理逻辑

#### API测试
- 测试Mock API的行为
- 验证数据适配器的正确性
- 测试错误场景的处理

### 12. 开发工具配置

#### TypeScript配置
- 启用严格模式（`strict: true`）
- 配置路径别名（`@/`指向`src/`）
- 设置适当的编译目标（`ESNext`）
- 使用模块解析策略（`Bundler`）

```json
// ✅ tsconfig.json 配置示例
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "jsx": "react-jsx",
    "target": "ESNext",
    "moduleResolution": "Bundler",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### Vite配置
- 配置路径别名
- 启用TanStack Router插件
- 配置自动代码分割
- 优化开发服务器配置

```javascript
// ✅ vite.config.js 配置示例
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
});
```

### 13. 部署和构建规范

#### 构建优化
- 使用Vite的构建优化功能
- 启用代码分割和懒加载
- 优化资源加载和压缩
- 配置适当的输出目录

#### 环境配置
- 使用环境变量管理配置
- 区分开发、测试和生产环境
- 确保敏感信息不被提交到版本控制
- 配置适当的API端点

```typescript
// ✅ 环境配置示例
const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};
```

## 开发流程

### 1. 新功能开发流程
1. **需求分析** - 分析需求，确定涉及的组件、路由和数据流
2. **类型定义** - 在`src/types/`中创建或更新相关类型定义
3. **Mock数据** - 在`src/mocks/`中准备Mock数据（如需要）
4. **API服务** - 在`src/services/api/`中实现API服务类
5. **React Query Hooks** - 在`src/services/hooks/`中创建查询和变更Hooks
6. **UI组件** - 使用shadcn/ui组件创建或更新UI组件
7. **路由组件** - 在`src/routes/`中实现路由组件，集成数据获取
8. **错误处理** - 添加适当的错误边界和错误处理逻辑
9. **性能优化** - 实现必要的性能优化（memo、缓存策略等）
10. **测试** - 编写单元测试和集成测试
11. **代码审查** - 进行代码审查和优化

### 2. Bug修复流程
1. **问题重现** - 在开发环境中重现问题
2. **问题定位** - 使用开发工具定位问题根源
3. **影响评估** - 评估问题的影响范围和严重程度
4. **测试用例** - 编写测试用例覆盖问题场景（如果没有）
5. **问题修复** - 实施修复方案
6. **验证修复** - 验证修复效果，确保问题解决
7. **回归测试** - 运行相关测试，确保没有引入新问题
8. **文档更新** - 更新相关文档（如需要）

### 3. 代码审查要点
- **类型安全性** - 确保TypeScript类型定义正确且完整
- **性能影响** - 评估代码对应用性能的影响
- **可维护性** - 代码结构清晰，易于理解和维护
- **用户体验** - 确保良好的加载状态和错误处理
- **无障碍性** - 遵循无障碍设计原则
- **安全性** - 避免安全漏洞，正确处理用户输入
- **一致性** - 遵循项目的代码风格和架构模式

### 4. Mock数据开发规范
- **数据结构** - Mock数据应与真实API响应格式保持一致
- **业务逻辑** - 实现基本的业务逻辑（分页、搜索、过滤等）
- **错误模拟** - 模拟各种错误场景用于测试
- **数据持久化** - 在开发会话中保持数据状态
- **切换机制** - 提供简单的方式切换到真实API

**详细的Mock数据实现请参考 [API使用文档](docs/API_USAGE.md)**

## 常见问题和解决方案

### Q: 如何处理复杂的状态管理？
A: 优先使用React Query进行服务器状态管理，本地状态使用useState或useReducer。对于复杂的本地状态，可以考虑使用useContext + useReducer模式。避免引入额外的状态管理库，除非确实必要。

### Q: 如何优化大列表渲染性能？
A: 使用虚拟滚动库（如react-window或@tanstack/react-virtual）或实现分页加载。结合React Query的无限查询功能（useInfiniteQuery）实现无限滚动。

### Q: 如何处理表单验证？
A: 使用react-hook-form结合zod进行表单处理和验证。项目已集成这些依赖，可以实现类型安全的表单验证。

### Q: 如何实现主题切换？
A: 项目已集成next-themes，使用其提供的useTheme hook实现主题切换功能。配合Tailwind CSS的dark模式类名实现深色主题。

### Q: 如何处理API错误？
A: 使用React Query的错误处理机制，结合全局错误边界。在HTTP客户端层面实现统一的错误拦截和处理。

### Q: 如何实现数据预加载？
A: 在路由层面使用TanStack Router的loader功能，或在组件中使用React Query的prefetchQuery方法实现数据预加载。

### Q: 如何切换Mock数据和真实API？
A: 通过环境变量控制API端点，在开发环境使用Mock数据，生产环境使用真实API。在服务层提供统一的切换机制。

## 更新日志

- **v2.0.0** (2025-01-04): 重大更新
  - 更新技术栈版本信息（React 19, TanStack Router v1.132.27, React Query v5.66.0等）
  - 添加重要参考文档链接（API使用文档、shadcn/ui使用指南）
  - 简化AI_RULES文档，删除API实现细节，改为引用专门的API使用文档
  - 完善服务层架构规范概述
  - 更新React Query集成规范概述
  - 完善类型定义规范概述
  - 更新文件组织结构
  - 更新错误处理和性能优化规范
  - 完善开发流程和代码审查要点
  - 增加更多常见问题和解决方案

- **v1.0.0** (2024-10-04): 初始版本，建立基础开发规范

---

*本文档会根据项目发展持续更新，请定期查看最新版本。*