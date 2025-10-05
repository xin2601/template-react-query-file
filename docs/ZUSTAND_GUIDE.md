# Zustand 状态管理指南

## 概述

Zustand 是一个轻量级的状态管理库，为 React 应用提供简单而强大的状态管理解决方案。本项目使用 Zustand 来管理全局状态，包括用户信息、主题设置和应用状态。

## 目录

- [安装和配置](#安装和配置)
- [基本概念](#基本概念)
- [项目结构](#项目结构)
- [Store 详解](#store-详解)
  - [用户 Store](#用户-store)
  - [主题 Store](#主题-store)
  - [应用 Store](#应用-store)
- [自定义 Hooks](#自定义-hooks)
- [中间件使用](#中间件使用)
- [最佳实践](#最佳实践)
- [常见问题](#常见问题)

## 安装和配置

```bash
npm install zustand
```

## 基本概念

Zustand 的核心概念：

1. **Store**: 存储应用状态的容器
2. **State**: 应用的状态数据
3. **Actions**: 修改状态的方法
4. **Selectors**: 选择特定状态片段的函数
5. **Middleware**: 增强 store 功能的插件

## 项目结构

```
src/store/
├── index.ts          # 统一导出文件
├── app-store.ts      # 应用全局状态
├── theme-store.ts    # 主题管理
├── user-store.ts     # 用户信息管理
└── hooks.ts          # 自定义 hooks
```

## Store 详解

### 用户 Store

用户 Store 管理用户认证状态和个人信息。

#### 状态结构

```typescript
interface UserState {
    id: string | null
    name: string | null
    email: string | null
    avatar: string | null
    isAuthenticated: boolean
    preferences: {
        language: string
        notifications: boolean
    }
}
```

#### 操作方法

```typescript
interface UserActions {
    setUser: (user: Partial<UserState>) => void
    login: (userData: { id: string; name: string; email: string; avatar?: string }) => void
    logout: () => void
    updatePreferences: (preferences: Partial<UserState['preferences']>) => void
    clearUser: () => void
}
```

#### 使用示例

```typescript
import { useUserStore } from '@/store'

function UserProfile() {
    const { name, email, isAuthenticated, login, logout } = useUserStore()
    
    const handleLogin = () => {
        login({
            id: '1',
            name: '张三',
            email: 'zhangsan@example.com'
        })
    }
    
    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <p>欢迎，{name}!</p>
                    <button onClick={logout}>退出登录</button>
                </div>
            ) : (
                <button onClick={handleLogin}>登录</button>
            )}
        </div>
    )
}
```

### 主题 Store

主题 Store 管理应用的主题设置，支持浅色、深色和跟随系统主题。

#### 状态结构

```typescript
interface ThemeState {
    theme: 'light' | 'dark' | 'system'
    systemTheme: 'light' | 'dark'
    actualTheme: 'light' | 'dark' // 实际应用的主题
}
```

#### 特性

- **系统主题检测**: 自动检测系统主题偏好
- **主题持久化**: 使用 localStorage 保存主题设置
- **实时更新**: 监听系统主题变化并自动更新

#### 使用示例

```typescript
import { useThemeStore } from '@/store'

function ThemeToggle() {
    const { theme, actualTheme, setTheme, toggleTheme } = useThemeStore()
    
    return (
        <div>
            <p>当前主题: {actualTheme}</p>
            <button onClick={toggleTheme}>切换主题</button>
            <button onClick={() => setTheme('system')}>跟随系统</button>
        </div>
    )
}
```

### 应用 Store

应用 Store 管理全局应用状态，包括加载状态、侧边栏、通知和模态框等。

#### 状态结构

```typescript
interface AppState {
    isLoading: boolean
    isSidebarOpen: boolean
    notifications: Array<{
        id: string
        type: 'success' | 'error' | 'warning' | 'info'
        title: string
        message: string
        timestamp: number
        read: boolean
    }>
    modal: {
        isOpen: boolean
        type: string | null
        data: any
    }
    breadcrumbs: Array<{
        label: string
        href?: string
    }>
}
```

#### 使用示例

```typescript
import { useAppStore } from '@/store'

function NotificationCenter() {
    const { notifications, addNotification, removeNotification } = useAppStore()
    
    const showSuccess = () => {
        addNotification({
            type: 'success',
            title: '操作成功',
            message: '数据已保存'
        })
    }
    
    return (
        <div>
            <button onClick={showSuccess}>显示成功通知</button>
            {notifications.map(notification => (
                <div key={notification.id}>
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                    <button onClick={() => removeNotification(notification.id)}>
                        删除
                    </button>
                </div>
            ))}
        </div>
    )
}
```

## 自定义 Hooks

项目提供了一系列自定义 hooks 来简化状态管理的使用：

### 用户相关 Hooks

```typescript
// 认证状态管理
const { isAuthenticated, login, logout } = useAuth()

// 用户资料管理
const { user, updateProfile } = useUserProfile()

// 用户偏好设置
const { preferences, updatePreferences } = useUserPreferences()
```

### 主题相关 Hooks

```typescript
const { 
    theme, 
    actualTheme, 
    setTheme, 
    toggleTheme, 
    isDark, 
    isLight 
} = useTheme()
```

### 应用状态 Hooks

```typescript
// 加载状态
const { isLoading, setLoading } = useLoading()

// 侧边栏状态
const { isSidebarOpen, toggleSidebar } = useSidebar()

// 通知系统
const { 
    notifications, 
    showSuccess, 
    showError, 
    showWarning, 
    showInfo 
} = useNotifications()

// 模态框管理
const { modal, openModal, closeModal } = useModal()

// 面包屑导航
const { breadcrumbs, setBreadcrumbs, addBreadcrumb } = useBreadcrumbs()
```

### 组合 Hook

```typescript
// 获取所有应用状态
const { user, theme, app } = useAppState()
```

## 中间件使用

### DevTools 中间件

用于 Redux DevTools 调试：

```typescript
import { devtools } from 'zustand/middleware'

export const useAppStore = create<AppStore>()(
    devtools(
        (set, get) => ({
            // store 实现
        }),
        {
            name: 'app-store', // DevTools 中显示的名称
        }
    )
)
```

### Persist 中间件

用于状态持久化：

```typescript
import { persist } from 'zustand/middleware'

export const useUserStore = create<UserStore>()(
    devtools(
        persist(
            (set, get) => ({
                // store 实现
            }),
            {
                name: 'user-storage', // localStorage 键名
                partialize: (state) => ({
                    // 选择需要持久化的状态
                    id: state.id,
                    name: state.name,
                    email: state.email,
                    isAuthenticated: state.isAuthenticated,
                }),
            }
        ),
        {
            name: 'user-store',
        }
    )
)
```

## 最佳实践

### 1. 状态结构设计

```typescript
// ✅ 好的做法：分离状态和操作
interface UserState {
    id: string | null
    name: string | null
    email: string | null
}

interface UserActions {
    setUser: (user: Partial<UserState>) => void
    clearUser: () => void
}

type UserStore = UserState & UserActions
```

### 2. 使用 TypeScript

```typescript
// ✅ 为 store 定义完整的类型
export const useUserStore = create<UserStore>()(
    devtools(
        (set, get) => ({
            // 实现
        })
    )
)
```

### 3. 状态更新

```typescript
// ✅ 使用函数式更新
setUser: (userData) =>
    set(
        (state) => ({
            ...state,
            ...userData,
        }),
        false, // 不替换整个状态
        'setUser' // DevTools 中的操作名称
    ),

// ✅ 直接更新简单状态
setLoading: (loading) =>
    set(
        { isLoading: loading },
        false,
        'setLoading'
    ),
```

### 4. 选择器使用

```typescript
// ✅ 使用选择器避免不必要的重渲染
const userName = useUserStore(state => state.name)
const isAuthenticated = useUserStore(state => state.isAuthenticated)

// ❌ 避免选择整个 store
const userStore = useUserStore() // 会导致所有状态变化时重渲染
```

### 5. 自定义 Hooks

```typescript
// ✅ 创建语义化的自定义 hooks
export const useAuth = () => {
    const { isAuthenticated, login, logout } = useUserStore()
    return { isAuthenticated, login, logout }
}

// ✅ 组合多个 store 的状态
export const useAppState = () => {
    const user = useUserStore()
    const theme = useThemeStore()
    const app = useAppStore()
    return { user, theme, app }
}
```

### 6. 异步操作

```typescript
// ✅ 在 actions 中处理异步操作
const userStore = create<UserStore>((set, get) => ({
    users: [],
    isLoading: false,
    
    fetchUsers: async () => {
        set({ isLoading: true })
        try {
            const users = await api.getUsers()
            set({ users, isLoading: false })
        } catch (error) {
            set({ isLoading: false })
            // 处理错误
        }
    },
}))
```

## 常见问题

### Q: 如何在组件外使用 store？

```typescript
// 获取状态
const currentUser = useUserStore.getState().name

// 调用 actions
useUserStore.getState().login({
    id: '1',
    name: '张三',
    email: 'zhangsan@example.com'
})
```

### Q: 如何监听状态变化？

```typescript
// 订阅状态变化
const unsubscribe = useUserStore.subscribe(
    (state) => state.isAuthenticated,
    (isAuthenticated) => {
        console.log('认证状态变化:', isAuthenticated)
    }
)

// 取消订阅
unsubscribe()
```

### Q: 如何重置 store 状态？

```typescript
const initialState = {
    id: null,
    name: null,
    email: null,
    isAuthenticated: false,
}

const userStore = create<UserStore>((set) => ({
    ...initialState,
    
    reset: () => set(initialState),
}))
```

### Q: 如何处理复杂的状态更新？

```typescript
// 使用 immer 中间件处理复杂状态
import { immer } from 'zustand/middleware/immer'

const useStore = create<State>()(
    immer((set) => ({
        nested: {
            deep: {
                value: 0
            }
        },
        
        updateDeepValue: (newValue) =>
            set((state) => {
                state.nested.deep.value = newValue
            }),
    }))
)
```

## 演示组件

项目中包含了一个完整的演示组件 [`zustand-demo.tsx`](../src/components/zustand-demo.tsx)，展示了所有 store 的使用方法。你可以通过运行项目并访问相应页面来查看实际效果。

## 总结

Zustand 提供了一种简洁而强大的状态管理方案。通过合理的状态设计、类型定义和自定义 hooks，可以构建出易于维护和扩展的状态管理系统。本项目的实现展示了 Zustand 在实际应用中的最佳实践，可以作为开发参考。