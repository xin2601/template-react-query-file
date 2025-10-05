import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { ZustandDemo } from '../../components/zustand-demo'

export const Route = createFileRoute('/_test-layout/test-home')({
    component: TestHome,
})

function TestHome() {
    return (
        <div className="p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        🧪 测试环境 - 全栈集成演示应用
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                        基于 TanStack Router + React Query + Zustand + redaxios 的完整解决方案
                    </p>
                    <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4 mb-8">
                        <p className="text-yellow-800 dark:text-yellow-200">
                            🧪 这是测试环境，用于安全的开发和功能验证
                        </p>
                    </div>
                </div>

                {/* 技术栈介绍 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">🚀 TanStack Router</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                类型安全的路由系统，支持文件基础路由和代码分割。
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">⚡ React Query</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                强大的数据获取和状态管理库，支持缓存、同步和更新。
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">🌐 redaxios</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                轻量级的 HTTP 客户端，提供类似 axios 的 API。
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">🐻 Zustand</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                轻量级状态管理库，提供简洁的 API 和强大的功能。
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* 功能介绍 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Layout 系统</CardTitle>
                            <CardDescription>灵活的布局管理系统</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-600 dark:text-blue-400">🏠</span>
                                    <span className="text-sm">默认Layout - 正式环境布局</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-yellow-600 dark:text-yellow-400">🧪</span>
                                    <span className="text-sm">测试Layout - 当前环境布局</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                                    通过不同的Layout可以为不同的使用场景提供专门的界面和功能。
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>开发工具</CardTitle>
                            <CardDescription>内置的开发和调试工具</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-green-600 dark:text-green-400">🔧</span>
                                    <span className="text-sm">React Query Devtools</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-purple-600 dark:text-purple-400">🛣️</span>
                                    <span className="text-sm">TanStack Router Devtools</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                                    强大的开发工具帮助调试和优化应用性能。
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* 快速导航 */}
                <Card>
                    <CardHeader>
                        <CardTitle>快速导航</CardTitle>
                        <CardDescription>选择您要访问的环境</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 border border-yellow-200 dark:border-yellow-800 rounded-lg bg-yellow-50/30 dark:bg-yellow-900/10">
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <span className="text-yellow-600 dark:text-yellow-400">🧪</span>
                                    测试环境 (当前)
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    安全的测试环境，用于开发和功能验证
                                </p>
                                <div className="flex gap-2">
                                    <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                                        测试文章
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        测试功能
                                    </Button>
                                </div>
                            </div>
                            <div className="p-4 border rounded-lg">
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <span className="text-blue-600 dark:text-blue-400">🏠</span>
                                    正式环境
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    生产级别的功能展示和正式内容管理
                                </p>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline">切换到正式</Button>
                                    <Button variant="outline" size="sm">查看文档</Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 项目信息 */}
                <Card>
                    <CardHeader>
                        <CardTitle>项目信息</CardTitle>
                        <CardDescription>关于这个演示项目</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <h5 className="font-semibold mb-2">技术栈</h5>
                                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                                    <li>• React 18</li>
                                    <li>• TypeScript</li>
                                    <li>• TanStack Router</li>
                                    <li>• React Query</li>
                                    <li>• Tailwind CSS</li>
                                </ul>
                            </div>
                            <div>
                                <h5 className="font-semibold mb-2">特性</h5>
                                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                                    <li>• 类型安全路由</li>
                                    <li>• 数据缓存管理</li>
                                    <li>• 响应式设计</li>
                                    <li>• 开发工具集成</li>
                                    <li>• Layout 系统</li>
                                </ul>
                            </div>
                            <div>
                                <h5 className="font-semibold mb-2">环境</h5>
                                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                                    <li>• 测试环境布局 (当前)</li>
                                    <li>• 安全测试模式</li>
                                    <li>• 开发工具支持</li>
                                    <li>• 热重载</li>
                                    <li>• 类型检查</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Zustand 演示 */}
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-center">
                        🐻 Zustand 状态管理演示
                    </h2>
                    <ZustandDemo />
                </div>
            </div>
        </div>
    )
}