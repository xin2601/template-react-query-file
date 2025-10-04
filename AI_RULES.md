# AI开发规则说明文档

## 项目概述

本项目是一个基于现代React技术栈的Web应用程序，使用以下核心技术：

- **React 19** - 前端框架
- **TanStack Router** - 文件路由系统
- **TanStack React Query** - 数据获取和状态管理
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Radix UI** - 无障碍UI组件库
- **Vite** - 构建工具

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

### 3. 数据获取规范

#### React Query使用规范
- 所有API调用必须通过React Query进行
- 查询选项（Query Options）应定义在独立文件中
- 使用`queryOptions`工厂函数创建可重用的查询配置
- 为查询键使用一致的命名约定

```typescript
// ✅ 查询选项示例 - postsQueryOptions.ts
import { queryOptions } from '@tanstack/react-query';

export const postsQueryOptions = () =>
  queryOptions({
    queryKey: ['posts'],
    queryFn: () => fetchPosts(),
    staleTime: 5 * 60 * 1000, // 5分钟
  });

export const postQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ['posts', postId],
    queryFn: () => fetchPost(postId),
    enabled: !!postId,
  });
```

#### 数据获取最佳实践
- 在路由层面进行数据预加载
- 使用适当的缓存策略
- 实现错误处理和加载状态
- 避免在组件中直接调用API

### 4. UI组件规范

#### Radix UI组件使用
- 优先使用项目中已配置的UI组件（`src/components/ui/`）
- 保持组件的无障碍性（accessibility）
- 使用Tailwind CSS进行样式定制
- 遵循设计系统的一致性

```typescript
// ✅ UI组件使用示例
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

#### 样式规范
- 使用Tailwind CSS类名进行样式设置
- 避免内联样式和CSS-in-JS
- 使用`clsx`或`cn`工具函数处理条件样式
- 保持响应式设计

### 5. 文件组织规范

#### 目录结构
```
src/
├── components/          # 可重用组件
│   └── ui/             # UI基础组件
├── hooks/              # 自定义Hooks
├── lib/                # 工具函数和配置
├── routes/             # 路由组件
└── styles.css          # 全局样式
```

#### 文件命名规范
- 组件文件：PascalCase（如`UserCard.tsx`）
- 工具文件：camelCase（如`utils.ts`）
- 常量文件：UPPER_SNAKE_CASE（如`API_CONSTANTS.ts`）
- 类型定义文件：camelCase + `.types.ts`后缀

### 6. 性能优化规范

#### React性能优化
- 使用`React.memo`包装纯组件
- 合理使用`useMemo`和`useCallback`
- 避免在渲染函数中创建对象和函数
- 使用懒加载（`React.lazy`）分割代码

#### 查询优化
- 设置合适的`staleTime`和`cacheTime`
- 使用查询预取（prefetching）
- 实现乐观更新
- 避免不必要的重新获取

### 7. 错误处理规范

#### 错误边界
- 在适当的层级设置错误边界
- 提供用户友好的错误信息
- 记录错误日志用于调试

#### API错误处理
```typescript
// ✅ 错误处理示例
export const postsQueryOptions = () =>
  queryOptions({
    queryKey: ['posts'],
    queryFn: async () => {
      try {
        return await fetchPosts();
      } catch (error) {
        console.error('获取文章列表失败:', error);
        throw new Error('无法加载文章列表，请稍后重试');
      }
    },
    retry: (failureCount, error) => {
      return failureCount < 3 && !error.message.includes('404');
    },
  });
```

### 8. 测试规范

#### 单元测试
- 为所有工具函数编写单元测试
- 测试组件的关键交互逻辑
- 使用React Testing Library进行组件测试

#### 集成测试
- 测试路由导航
- 测试数据获取流程
- 测试用户交互场景

### 9. 开发工具配置

#### TypeScript配置
- 启用严格模式
- 配置路径别名（`@/`指向`src/`）
- 设置适当的编译目标

#### ESLint和Prettier
- 遵循项目的代码格式化规则
- 在提交前运行代码检查
- 使用自动格式化工具

### 10. 部署和构建规范

#### 构建优化
- 使用Vite的构建优化功能
- 启用代码分割和懒加载
- 优化资源加载

#### 环境配置
- 使用环境变量管理配置
- 区分开发、测试和生产环境
- 确保敏感信息不被提交到版本控制

## 开发流程

### 1. 新功能开发流程
1. 分析需求，确定涉及的组件和路由
2. 创建或更新类型定义
3. 实现数据获取逻辑（Query Options）
4. 创建或更新UI组件
5. 实现路由组件
6. 添加错误处理和加载状态
7. 编写测试
8. 代码审查和优化

### 2. Bug修复流程
1. 重现问题
2. 定位问题根源
3. 编写测试用例（如果没有）
4. 修复问题
5. 验证修复效果
6. 回归测试

### 3. 代码审查要点
- 类型安全性
- 性能影响
- 可维护性
- 用户体验
- 无障碍性
- 安全性

## 常见问题和解决方案

### Q: 如何处理复杂的状态管理？
A: 优先使用React Query进行服务器状态管理，本地状态使用useState或useReducer。避免引入额外的状态管理库，除非确实必要。

### Q: 如何优化大列表渲染性能？
A: 使用虚拟滚动库（如react-window）或实现分页加载。结合React Query的无限查询功能。

### Q: 如何处理表单验证？
A: 使用react-hook-form结合zod进行表单处理和验证，这与项目依赖保持一致。

### Q: 如何实现主题切换？
A: 项目已集成next-themes，使用其提供的useTheme hook实现主题切换功能。

## 更新日志

- **v1.0.0** (2024-10-04): 初始版本，建立基础开发规范

---

*本文档会根据项目发展持续更新，请定期查看最新版本。*