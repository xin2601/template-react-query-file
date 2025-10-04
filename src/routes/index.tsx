import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8">
                    欢迎使用 TanStack Router + React Query 应用
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-3">🚀 TanStack Router</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            类型安全的路由系统，支持文件基础路由和代码分割。
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-3">⚡ React Query</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            强大的数据获取和状态管理库，支持缓存、同步和更新。
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-3">🎨 Tailwind CSS</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            实用优先的 CSS 框架，快速构建现代化的用户界面。
                        </p>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                        开始构建你的应用吧！
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
                            开始使用
                        </button>
                        <button className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors">
                            查看文档
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}