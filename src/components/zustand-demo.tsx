import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import {
    useAuth,
    useUserProfile,
    useTheme,
    useNotifications,
    useSidebar,
    useLoading
} from '../store'

export function ZustandDemo() {
    const { isAuthenticated, login, logout } = useAuth()
    const { user, updateProfile } = useUserProfile()
    const { theme, actualTheme, setTheme, toggleTheme, isDark } = useTheme()
    const {
        notifications,
        unreadCount,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        clearNotifications
    } = useNotifications()
    const { isSidebarOpen, toggleSidebar } = useSidebar()
    const { isLoading, setLoading } = useLoading()

    const handleLogin = () => {
        login({
            id: '1',
            name: '测试用户',
            email: 'test@example.com',
            avatar: 'https://github.com/shadcn.png'
        })
        showSuccess('登录成功', '欢迎回来！')
    }

    const handleLogout = () => {
        logout()
        showInfo('已退出登录', '感谢您的使用')
    }

    const handleUpdateProfile = () => {
        updateProfile({
            name: '更新的用户名',
            email: 'updated@example.com'
        })
        showSuccess('资料更新', '用户资料已成功更新')
    }

    const handleLoadingDemo = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            showSuccess('加载完成', '模拟加载操作已完成')
        }, 2000)
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🐻</span>
                        Zustand 状态管理演示
                    </CardTitle>
                    <CardDescription>
                        展示 Zustand 在实际应用中的使用场景
                    </CardDescription>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 用户认证状态 */}
                <Card>
                    <CardHeader>
                        <CardTitle>用户认证</CardTitle>
                        <CardDescription>管理用户登录状态和信息</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Badge variant={isAuthenticated ? "default" : "secondary"}>
                                {isAuthenticated ? "已登录" : "未登录"}
                            </Badge>
                            {isAuthenticated && user.name && (
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {user.name}
                                </span>
                            )}
                        </div>

                        {isAuthenticated && (
                            <div className="text-sm space-y-1">
                                <p><strong>ID:</strong> {user.id}</p>
                                <p><strong>邮箱:</strong> {user.email}</p>
                            </div>
                        )}

                        <div className="flex gap-2">
                            {!isAuthenticated ? (
                                <Button onClick={handleLogin} size="sm">
                                    登录
                                </Button>
                            ) : (
                                <>
                                    <Button onClick={handleLogout} variant="outline" size="sm">
                                        退出登录
                                    </Button>
                                    <Button onClick={handleUpdateProfile} size="sm">
                                        更新资料
                                    </Button>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* 主题切换 */}
                <Card>
                    <CardHeader>
                        <CardTitle>主题管理</CardTitle>
                        <CardDescription>动态切换应用主题</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Badge variant="outline">
                                当前主题: {actualTheme === 'dark' ? '深色' : '浅色'}
                            </Badge>
                            <Badge variant="secondary">
                                设置: {theme === 'system' ? '跟随系统' : theme === 'dark' ? '深色' : '浅色'}
                            </Badge>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="dark-mode"
                                    checked={isDark}
                                    onCheckedChange={toggleTheme}
                                />
                                <Label htmlFor="dark-mode">深色模式</Label>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    onClick={() => setTheme('light')}
                                    variant={theme === 'light' ? 'default' : 'outline'}
                                    size="sm"
                                >
                                    浅色
                                </Button>
                                <Button
                                    onClick={() => setTheme('dark')}
                                    variant={theme === 'dark' ? 'default' : 'outline'}
                                    size="sm"
                                >
                                    深色
                                </Button>
                                <Button
                                    onClick={() => setTheme('system')}
                                    variant={theme === 'system' ? 'default' : 'outline'}
                                    size="sm"
                                >
                                    系统
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 通知系统 */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            通知系统
                            {unreadCount > 0 && (
                                <Badge variant="destructive" className="text-xs">
                                    {unreadCount}
                                </Badge>
                            )}
                        </CardTitle>
                        <CardDescription>管理应用通知和消息</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                            <Button onClick={() => showSuccess('成功', '这是一个成功消息')} size="sm" variant="outline">
                                成功
                            </Button>
                            <Button onClick={() => showError('错误', '这是一个错误消息')} size="sm" variant="outline">
                                错误
                            </Button>
                            <Button onClick={() => showWarning('警告', '这是一个警告消息')} size="sm" variant="outline">
                                警告
                            </Button>
                            <Button onClick={() => showInfo('信息', '这是一个信息消息')} size="sm" variant="outline">
                                信息
                            </Button>
                        </div>

                        {notifications.length > 0 && (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">最近通知:</span>
                                    <Button onClick={clearNotifications} size="sm" variant="ghost">
                                        清空
                                    </Button>
                                </div>
                                <div className="max-h-32 overflow-y-auto space-y-1">
                                    {notifications.slice(-3).map((notification) => (
                                        <div key={notification.id} className="text-xs p-2 bg-gray-50 dark:bg-gray-800 rounded">
                                            <div className="flex items-center gap-1">
                                                <Badge variant="outline" className="text-xs">
                                                    {notification.type}
                                                </Badge>
                                                <span className="font-medium">{notification.title}</span>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                                {notification.message}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* 应用状态 */}
                <Card>
                    <CardHeader>
                        <CardTitle>应用状态</CardTitle>
                        <CardDescription>管理全局应用状态</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="sidebar-toggle">侧边栏</Label>
                            <div className="flex items-center gap-2">
                                <Switch
                                    id="sidebar-toggle"
                                    checked={isSidebarOpen}
                                    onCheckedChange={toggleSidebar}
                                />
                                <Badge variant={isSidebarOpen ? "default" : "secondary"}>
                                    {isSidebarOpen ? "打开" : "关闭"}
                                </Badge>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <Label>加载状态</Label>
                            <div className="flex items-center gap-2">
                                <Badge variant={isLoading ? "destructive" : "secondary"}>
                                    {isLoading ? "加载中..." : "空闲"}
                                </Badge>
                            </div>
                        </div>

                        <Button
                            onClick={handleLoadingDemo}
                            disabled={isLoading}
                            size="sm"
                            className="w-full"
                        >
                            {isLoading ? "加载中..." : "模拟加载"}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}