import * as React from 'react'
import {
  Link,
  Outlet,
  createFileRoute,
} from '@tanstack/react-router'

export const Route = createFileRoute('/_default-layout')({
  component: DefaultLayoutComponent,
})

function DefaultLayoutComponent() {
  return (
    <>
      <div className="p-4 flex gap-4 text-lg border-b bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <span className="text-blue-600 dark:text-blue-400">🏠</span>
          <span className="font-semibold text-gray-700 dark:text-gray-300">正式环境</span>
        </div>
        <Link
          to="/home"
          className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          首页
        </Link>
        <Link
          to="/posts"
          className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          文章管理
        </Link>
      </div>
      <Outlet />
    </>
  )
}