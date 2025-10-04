import * as React from 'react'
import {
  Link,
  Outlet,
  createFileRoute,
} from '@tanstack/react-router'

export const Route = createFileRoute('/_test-layout')({
  component: TestLayoutComponent,
})

function TestLayoutComponent() {
  return (
    <>
      <div className="p-4 flex gap-4 text-lg border-b bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
        <div className="flex items-center gap-2">
          <span className="text-yellow-600 dark:text-yellow-400">🧪</span>
          <span className="font-semibold text-yellow-700 dark:text-yellow-300">测试环境</span>
        </div>
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
      <Outlet />
    </>
  )
}