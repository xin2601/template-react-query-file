import * as React from 'react'
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { QueryClient } from '@tanstack/react-query'

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
  return (
    <>
      <div className="p-2 flex gap-2 text-lg">
        导航链接将在这里添加
      </div>
      <hr />
      <Outlet />
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
