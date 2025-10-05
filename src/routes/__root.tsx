import * as React from 'react'
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { useTheme } from '../store'

// 判断是否为开发环境
const isDevelopment = !import.meta.env.PROD

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">页面未找到</h2>
        <p className="text-gray-600 dark:text-gray-400">
          抱歉，您访问的页面不存在。
        </p>
      </div>
    )
  },
})

function RootComponent() {
  const { actualTheme } = useTheme()

  // 应用主题到 DOM
  React.useEffect(() => {
    const root = document.documentElement
    if (actualTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [actualTheme])

  return (
    <>
      <Outlet />
      {isDevelopment && (
        <>
          <ReactQueryDevtools buttonPosition="bottom-left" />
          <TanStackRouterDevtools position="bottom-right" />
        </>
      )}
    </>
  )
}
