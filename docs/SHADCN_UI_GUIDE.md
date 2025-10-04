# shadcn/ui 组件库使用指南

## 项目概述

本项目使用 shadcn/ui 组件库，这是一个基于 Radix UI 和 Tailwind CSS 构建的现代化 React 组件库。shadcn/ui 提供了可复制粘贴的组件代码，而不是传统的 npm 包依赖。

## 配置信息

### 当前配置
根据 [`components.json`](components.json:1) 文件，项目配置如下：

```json
{
  "style": "new-york",           // 使用 New York 风格
  "rsc": false,                  // 非 React Server Components
  "tsx": true,                   // 使用 TypeScript
  "tailwind": {
    "config": "tailwind.config.mjs",
    "css": "src/styles.css",
    "baseColor": "neutral",      // 基础颜色为中性色
    "cssVariables": true,        // 使用 CSS 变量
    "prefix": ""                 // 无前缀
  },
  "iconLibrary": "lucide",       // 使用 Lucide 图标库
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

### 工具函数
项目使用 [`cn`](src/lib/utils.ts:4) 工具函数来合并 CSS 类名：

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## 已安装的组件

项目中已包含以下 shadcn/ui 组件：

### 基础组件
- [`Button`](src/components/ui/button.tsx:1) - 按钮组件
- [`Card`](src/components/ui/card.tsx:1) - 卡片组件
- [`Input`](src/components/ui/input.tsx:1) - 输入框组件
- [`Label`](src/components/ui/label.tsx:1) - 标签组件
- [`Badge`](src/components/ui/badge.tsx:1) - 徽章组件
- [`Avatar`](src/components/ui/avatar.tsx:1) - 头像组件
- [`Separator`](src/components/ui/separator.tsx:1) - 分隔符组件
- [`Skeleton`](src/components/ui/skeleton.tsx:1) - 骨架屏组件
- [`Spinner`](src/components/ui/spinner.tsx:1) - 加载动画组件

### 表单组件
- [`Form`](src/components/ui/form.tsx:1) - 表单组件
- [`Field`](src/components/ui/field.tsx:1) - 表单字段组件
- [`Checkbox`](src/components/ui/checkbox.tsx:1) - 复选框组件
- [`Radio Group`](src/components/ui/radio-group.tsx:1) - 单选按钮组
- [`Select`](src/components/ui/select.tsx:1) - 选择器组件
- [`Switch`](src/components/ui/switch.tsx:1) - 开关组件
- [`Slider`](src/components/ui/slider.tsx:1) - 滑块组件
- [`Textarea`](src/components/ui/textarea.tsx:1) - 文本域组件
- [`Input OTP`](src/components/ui/input-otp.tsx:1) - OTP 输入组件
- [`Input Group`](src/components/ui/input-group.tsx:1) - 输入组合组件

### 导航组件
- [`Navigation Menu`](src/components/ui/navigation-menu.tsx:1) - 导航菜单
- [`Breadcrumb`](src/components/ui/breadcrumb.tsx:1) - 面包屑导航
- [`Pagination`](src/components/ui/pagination.tsx:1) - 分页组件
- [`Tabs`](src/components/ui/tabs.tsx:1) - 标签页组件
- [`Menubar`](src/components/ui/menubar.tsx:1) - 菜单栏组件
- [`Sidebar`](src/components/ui/sidebar.tsx:1) - 侧边栏组件

### 反馈组件
- [`Alert`](src/components/ui/alert.tsx:1) - 警告提示组件
- [`Alert Dialog`](src/components/ui/alert-dialog.tsx:1) - 警告对话框
- [`Dialog`](src/components/ui/dialog.tsx:1) - 对话框组件
- [`Sheet`](src/components/ui/sheet.tsx:1) - 抽屉组件
- [`Drawer`](src/components/ui/drawer.tsx:1) - 抽屉组件
- [`Sonner`](src/components/ui/sonner.tsx:1) - Toast 通知组件
- [`Progress`](src/components/ui/progress.tsx:1) - 进度条组件

### 数据展示组件
- [`Table`](src/components/ui/table.tsx:1) - 表格组件
- [`Chart`](src/components/ui/chart.tsx:1) - 图表组件
- [`Calendar`](src/components/ui/calendar.tsx:1) - 日历组件
- [`Carousel`](src/components/ui/carousel.tsx:1) - 轮播图组件
- [`Accordion`](src/components/ui/accordion.tsx:1) - 折叠面板组件
- [`Collapsible`](src/components/ui/collapsible.tsx:1) - 可折叠组件
- [`Aspect Ratio`](src/components/ui/aspect-ratio.tsx:1) - 宽高比组件
- [`Empty`](src/components/ui/empty.tsx:1) - 空状态组件

### 交互组件
- [`Button Group`](src/components/ui/button-group.tsx:1) - 按钮组
- [`Toggle`](src/components/ui/toggle.tsx:1) - 切换按钮
- [`Toggle Group`](src/components/ui/toggle-group.tsx:1) - 切换按钮组
- [`Command`](src/components/ui/command.tsx:1) - 命令面板组件
- [`Popover`](src/components/ui/popover.tsx:1) - 弹出框组件
- [`Tooltip`](src/components/ui/tooltip.tsx:1) - 工具提示组件
- [`Hover Card`](src/components/ui/hover-card.tsx:1) - 悬停卡片
- [`Context Menu`](src/components/ui/context-menu.tsx:1) - 右键菜单
- [`Dropdown Menu`](src/components/ui/dropdown-menu.tsx:1) - 下拉菜单

### 布局组件
- [`Scroll Area`](src/components/ui/scroll-area.tsx:1) - 滚动区域组件
- [`Resizable`](src/components/ui/resizable.tsx:1) - 可调整大小组件

### 其他组件
- [`Kbd`](src/components/ui/kbd.tsx:1) - 键盘按键组件
- [`Item`](src/components/ui/item.tsx:1) - 列表项组件

## 组件使用示例

### Button 组件

[`Button`](src/components/ui/button.tsx:1) 组件支持多种变体和尺寸：

```typescript
import { Button } from "@/components/ui/button"

// 基础用法
<Button>点击我</Button>

// 不同变体
<Button variant="default">默认按钮</Button>
<Button variant="destructive">危险按钮</Button>
<Button variant="outline">轮廓按钮</Button>
<Button variant="secondary">次要按钮</Button>
<Button variant="ghost">幽灵按钮</Button>
<Button variant="link">链接按钮</Button>

// 不同尺寸
<Button size="sm">小按钮</Button>
<Button size="default">默认按钮</Button>
<Button size="lg">大按钮</Button>
<Button size="icon">图标按钮</Button>

// 作为其他元素渲染
<Button asChild>
  <a href="/login">登录</a>
</Button>

// 禁用状态
<Button disabled>禁用按钮</Button>

// 带图标
import { Mail } from "lucide-react"
<Button>
  <Mail />
  发送邮件
</Button>
```

### Card 组件

[`Card`](src/components/ui/card.tsx:1) 组件用于创建卡片布局：

```typescript
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>卡片标题</CardTitle>
    <CardDescription>卡片描述信息</CardDescription>
  </CardHeader>
  <CardContent>
    <p>这里是卡片的主要内容。</p>
  </CardContent>
  <CardFooter>
    <Button>操作按钮</Button>
  </CardFooter>
</Card>
```

### Form 组件

表单组件结合 react-hook-form 使用：

```typescript
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "用户名至少需要2个字符。",
  }),
})

function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>用户名</FormLabel>
              <FormControl>
                <Input placeholder="请输入用户名" {...field} />
              </FormControl>
              <FormDescription>
                这是您的公开显示名称。
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">提交</Button>
      </form>
    </Form>
  )
}
```

### Dialog 组件

对话框组件用于模态窗口：

```typescript
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">打开对话框</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>编辑资料</DialogTitle>
      <DialogDescription>
        在这里修改您的资料信息。完成后点击保存。
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      {/* 表单内容 */}
    </div>
    <DialogFooter>
      <Button type="submit">保存更改</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Select 组件

选择器组件：

```typescript
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="选择一个选项" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">浅色</SelectItem>
    <SelectItem value="dark">深色</SelectItem>
    <SelectItem value="system">系统</SelectItem>
  </SelectContent>
</Select>
```

### Table 组件

表格组件：

```typescript
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "已支付",
    totalAmount: "$250.00",
    paymentMethod: "信用卡",
  },
  // 更多数据...
]

<Table>
  <TableCaption>最近发票列表。</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">发票</TableHead>
      <TableHead>状态</TableHead>
      <TableHead>方式</TableHead>
      <TableHead className="text-right">金额</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {invoices.map((invoice) => (
      <TableRow key={invoice.invoice}>
        <TableCell className="font-medium">{invoice.invoice}</TableCell>
        <TableCell>{invoice.paymentStatus}</TableCell>
        <TableCell>{invoice.paymentMethod}</TableCell>
        <TableCell className="text-right">{invoice.totalAmount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

## 主题和样式定制

### CSS 变量

项目使用 CSS 变量来定义主题颜色，在 [`src/styles.css`](src/styles.css:1) 中定义：

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 240 5.9% 10%;
  --radius: 0.5rem;
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* 其他深色主题变量... */
}
```

### 自定义样式

使用 [`cn`](src/lib/utils.ts:4) 函数来合并和覆盖默认样式：

```typescript
import { cn } from "@/lib/utils"

<Button 
  className={cn(
    "bg-gradient-to-r from-purple-500 to-pink-500",
    "hover:from-purple-600 hover:to-pink-600",
    "text-white font-bold"
  )}
>
  渐变按钮
</Button>
```

## 最佳实践

### 1. 组件导入规范

```typescript
// ✅ 推荐：从具体路径导入
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// ❌ 避免：从索引文件批量导入（如果没有配置）
import { Button, Card } from "@/components/ui"
```

### 2. 类型安全

利用 TypeScript 的类型推断和组件的内置类型：

```typescript
import { type ButtonProps } from "@/components/ui/button"

// 扩展按钮组件
interface CustomButtonProps extends ButtonProps {
  loading?: boolean
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
  loading, 
  children, 
  disabled,
  ...props 
}) => {
  return (
    <Button disabled={disabled || loading} {...props}>
      {loading ? <Spinner className="mr-2" /> : null}
      {children}
    </Button>
  )
}
```

### 3. 响应式设计

充分利用 Tailwind CSS 的响应式类名：

```typescript
<Card className="w-full max-w-sm mx-auto md:max-w-md lg:max-w-lg">
  <CardContent className="p-4 md:p-6">
    <Button className="w-full sm:w-auto">
      响应式按钮
    </Button>
  </CardContent>
</Card>
```

### 4. 无障碍性

shadcn/ui 基于 Radix UI 构建，天然支持无障碍性，但仍需注意：

```typescript
// ✅ 提供适当的 aria 标签
<Button aria-label="关闭对话框" variant="ghost" size="icon">
  <X className="h-4 w-4" />
</Button>

// ✅ 为表单字段提供标签
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>邮箱地址</FormLabel>
      <FormControl>
        <Input 
          type="email" 
          placeholder="请输入邮箱"
          aria-describedby="email-description"
          {...field} 
        />
      </FormControl>
      <FormDescription id="email-description">
        我们将向此邮箱发送确认信息
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
```

### 5. 性能优化

```typescript
// ✅ 使用 React.memo 优化重渲染
import React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface PostCardProps {
  post: {
    id: string
    title: string
    content: string
  }
}

export const PostCard = React.memo<PostCardProps>(({ post }) => {
  return (
    <Card>
      <CardContent>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
      </CardContent>
    </Card>
  )
})

PostCard.displayName = "PostCard"
```

### 6. 组件组合

利用 shadcn/ui 组件的组合特性：

```typescript
// 创建复合组件
export function UserProfile({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-y-0 space-x-4">
        <Avatar>
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Badge variant="secondary">{user.role}</Badge>
          <Badge variant="outline">{user.department}</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          查看详情
        </Button>
      </CardFooter>
    </Card>
  )
}
```

## 添加新组件

如需添加新的 shadcn/ui 组件，使用以下命令：

```bash
# 添加单个组件
npx shadcn@latest add button

# 添加多个组件
npx shadcn@latest add button card input

# 查看可用组件
npx shadcn@latest add
```

## 常见问题

### Q: 如何自定义组件的默认样式？
A: 直接修改 `src/components/ui/` 目录下的组件文件，或者创建包装组件。

### Q: 如何处理深色模式？
A: 项目已配置深色模式支持，使用 `next-themes` 包来切换主题。

### Q: 组件样式不生效怎么办？
A: 检查 Tailwind CSS 配置，确保 `content` 路径包含了所有组件文件。

### Q: 如何扩展现有组件？
A: 使用组合模式或创建包装组件，避免直接修改原始组件文件。

## 相关资源

- [shadcn/ui 官方文档](https://ui.shadcn.com/)
- [Radix UI 文档](https://www.radix-ui.com/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Lucide 图标库](https://lucide.dev/)

---

*本指南基于项目当前配置编写，如有更新请及时同步文档。*