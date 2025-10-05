# React Query File-Based Router Template

一个基于现代 React 技术栈的全栈应用模板，集成了 TanStack Router、React Query、shadcn/ui 和 TypeScript。

## 🤖 AI 开发助手须知

**重要提示：如果您是 AI 开发助手，请务必先阅读以下文档以了解项目规范和最佳实践：**

- **[AI_RULES.md](AI_RULES.md)** - 📋 **必读** - AI 开发规则和代码规范
- **[docs/SHADCN_UI_GUIDE.md](docs/SHADCN_UI_GUIDE.md)** - 🎨 UI 组件库详细使用指南
- **[docs/ZUSTAND_GUIDE.md](docs/ZUSTAND_GUIDE.md)** - 🐻 状态管理库详细使用指南

这些文档包含了项目的开发规范、代码风格、组件使用方法、状态管理最佳实践，将帮助您更好地理解项目结构并生成符合项目标准的代码。

## ✨ 特性

- 🚀 **React 19** - 最新的 React 版本
- 🛣️ **TanStack Router** - 类型安全的文件路由系统
- 🔄 **TanStack React Query** - 强大的数据获取和状态管理
- 🐻 **Zustand** - 轻量级的客户端状态管理
- 🎨 **shadcn/ui** - 现代化的 UI 组件库
- 💎 **TypeScript** - 完整的类型安全支持
- 🎯 **Tailwind CSS** - 实用优先的 CSS 框架
- ⚡ **Vite** - 快速的构建工具
- 🌙 **深色模式** - 内置主题切换支持
- ♿ **无障碍性** - 基于 Radix UI 的无障碍组件

## 🛠️ 技术栈

### 核心框架
- **React 19** - 前端框架
- **TypeScript** - 类型安全的 JavaScript
- **Vite** - 现代化构建工具

### 路由和状态管理
- **TanStack Router** - 文件路由系统，支持类型安全的路由参数
- **TanStack React Query** - 服务器状态管理和数据获取
- **Zustand** - 轻量级的客户端状态管理库

### UI 和样式
- **shadcn/ui** - 基于 Radix UI 的组件库
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Radix UI** - 无障碍的底层 UI 组件
- **Lucide React** - 美观的图标库
- **next-themes** - 主题切换支持

### 表单和验证
- **React Hook Form** - 高性能表单库
- **Zod** - TypeScript 优先的模式验证

### 开发工具
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **PostCSS** - CSS 处理工具

## 🚀 快速开始

### 环境要求

- Node.js 18+ 
- pnpm / npm / yarn

### 安装依赖

```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

### 启动开发服务器

```bash
# 使用 pnpm
pnpm dev

# 或使用 npm
npm run dev

# 或使用 yarn
yarn dev
```

应用将在 [http://localhost:3000](http://localhost:3000) 启动。

### 构建生产版本

```bash
# 构建项目
pnpm build

# 预览构建结果
pnpm serve
```

## 📁 项目结构

```
├── src/
│   ├── components/          # 可重用组件
│   │   └── ui/             # shadcn/ui 基础组件
│   ├── hooks/              # 自定义 React Hooks
│   ├── lib/                # 工具函数和配置
│   ├── routes/             # 文件路由组件
│   │   ├── __root.tsx      # 根布局组件
│   │   ├── index.tsx       # 首页
│   │   ├── posts/          # 文章相关路由
│   │   └── _pathlessLayout/ # 无路径布局示例
│   ├── store/              # Zustand 状态管理
│   │   ├── index.ts        # Store 统一导出
│   │   ├── app-store.ts    # 应用全局状态
│   │   ├── theme-store.ts  # 主题管理
│   │   ├── user-store.ts   # 用户状态管理
│   │   └── hooks.ts        # 自定义状态 Hooks
│   ├── main.tsx            # 应用入口
│   ├── routeTree.gen.ts    # 自动生成的路由树
│   └── styles.css          # 全局样式
├── docs/                   # 项目文档
├── public/                 # 静态资源
├── components.json         # shadcn/ui 配置
├── tailwind.config.mjs     # Tailwind CSS 配置
├── tsconfig.json           # TypeScript 配置
└── vite.config.js          # Vite 配置
```

## 🎯 核心功能

### 文件路由系统

使用 TanStack Router 的文件路由系统，支持：

- 📁 **嵌套路由** - 通过文件夹结构定义路由层级
- 🔗 **动态路由** - 使用 `$param.tsx` 定义动态参数
- 🎨 **布局路由** - 使用 `_layout.tsx` 定义共享布局
- 🔒 **类型安全** - 自动生成路由类型定义

```typescript
// src/routes/posts/$postId.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  component: PostDetail,
  loader: ({ params }) => fetchPost(params.postId),
})
```

### 数据获取

使用 React Query 进行数据管理：

```typescript
// 查询选项定义
export const postsQueryOptions = () =>
  queryOptions({
    queryKey: ['posts'],
    queryFn: () => fetchPosts(),
    staleTime: 5 * 60 * 1000,
  })

// 在组件中使用
const { data: posts, isLoading } = useQuery(postsQueryOptions())
```

### 状态管理

使用 Zustand 进行客户端状态管理：

```typescript
// 使用预定义的状态 hooks
import { useAuth, useTheme, useNotifications } from '@/store'

export function UserProfile() {
  const { isAuthenticated, login, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { showSuccess } = useNotifications()

  const handleLogin = () => {
    login({
      id: '1',
      name: '用户名',
      email: 'user@example.com'
    })
    showSuccess('登录成功', '欢迎回来！')
  }

  return (
    <div>
      <button onClick={toggleTheme}>切换主题: {theme}</button>
      {isAuthenticated ? (
        <button onClick={logout}>退出登录</button>
      ) : (
        <button onClick={handleLogin}>登录</button>
      )}
    </div>
  )
}
```

### UI 组件

项目集成了完整的 shadcn/ui 组件库：

```typescript
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ExampleCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>示例卡片</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>点击按钮</Button>
      </CardContent>
    </Card>
  )
}
```

## 📚 文档

- **[AI 开发规则](AI_RULES.md)** - AI 辅助开发的规范和最佳实践
- **[shadcn/ui 使用指南](docs/SHADCN_UI_GUIDE.md)** - 组件库详细使用说明
- **[Zustand 状态管理指南](docs/ZUSTAND_GUIDE.md)** - 状态管理库详细使用说明

## 🔧 开发指南

### 添加新路由

1. 在 `src/routes/` 目录下创建新的 `.tsx` 文件
2. 使用 `createFileRoute` 定义路由组件
3. 路由树会自动更新

### 添加新组件

```bash
# 添加 shadcn/ui 组件
npx shadcn@latest add [component-name]

# 例如添加 dialog 组件
npx shadcn@latest add dialog
```

### 样式定制

使用 Tailwind CSS 和 CSS 变量进行样式定制：

```css
/* src/styles.css */
:root {
  --primary: 220 14.3% 95.9%;
  --primary-foreground: 220.9 39.3% 11%;
}
```

### 类型安全

项目配置了严格的 TypeScript 检查：

```typescript
// 路由参数自动类型推断
const { postId } = Route.useParams() // postId: string

// 查询数据类型安全
const { data } = useQuery(postsQueryOptions()) // data: Post[]
```

## 🧪 测试

```bash
# 运行测试
pnpm test

# 运行测试覆盖率
pnpm test:coverage
```

## 📦 部署

### Vercel 部署

1. 将项目推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

### 其他平台

项目构建后生成静态文件，可部署到任何静态托管平台：

- Netlify
- GitHub Pages  
- AWS S3
- Cloudflare Pages

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发流程

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

### 代码规范

- 遵循 ESLint 和 Prettier 配置
- 使用 TypeScript 严格模式
- 编写有意义的提交信息
- 为新功能添加测试

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢以下开源项目：

- [TanStack Router](https://tanstack.com/router) - 类型安全的路由
- [TanStack Query](https://tanstack.com/query) - 数据获取库
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件库
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Radix UI](https://www.radix-ui.com/) - 无障碍组件
- [Vite](https://vitejs.dev/) - 构建工具

## 📞 支持

如果您觉得这个项目有用，请给它一个 ⭐️！

有问题或建议？欢迎：

- 提交 [Issue](https://github.com/your-username/your-repo/issues)
- 发起 [Discussion](https://github.com/your-username/your-repo/discussions)
- 联系维护者

---

**Happy Coding! 🚀**
