import * as React from 'react'
import {
  Link,
  Outlet,
  createFileRoute,
} from '@tanstack/react-router'
import { useAuth, useUserProfile, useTheme, useNotifications } from '../store'
import { Badge } from '../components/ui/badge'

export const Route = createFileRoute('/_test-layout')({
  component: TestLayoutComponent,
})

function Header() {
  const { isAuthenticated } = useAuth()
  const { user } = useUserProfile()
  const { actualTheme, toggleTheme } = useTheme()
  const { unreadCount } = useNotifications()

  return (
    <div className="p-4 flex gap-4 text-lg border-b bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
      <div className="flex items-center gap-2">
        <span className="text-yellow-600 dark:text-yellow-400">🧪</span>
        <span className="font-semibold text-yellow-700 dark:text-yellow-300">测试环境</span>
        <Badge variant="outline" className="text-xs">
          {actualTheme === 'dark' ? '🌙' : '☀️'} {actualTheme}
        </Badge>
      </div>
      
      <div className="flex items-center gap-4 flex-1">
        <Link
          to="/test-home"
          className="font-medium text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300"
        >
          测试首页
        </Link>
        <Link
          to="/test-posts"
          className="font-medium text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300"
        >
          测试文章
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-yellow-100 dark:hover:bg-yellow-800/30 transition-colors"
          title={`切换到${actualTheme === 'dark' ? '明亮' : '暗色'}主题`}
        >
          <span className="text-xl">
            {actualTheme === 'dark' ? '☀️' : '🌙'}
          </span>
        </button>
        {unreadCount > 0 && (
          <Badge variant="destructive" className="text-xs">
            {unreadCount} 通知
          </Badge>
        )}
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-xs">
              👤 {user.name || '用户'}
            </Badge>
          </div>
        ) : (
          <Badge variant="secondary" className="text-xs">
            未登录
          </Badge>
        )}
      </div>
    </div>
  )
}

function TestLayoutComponent() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}