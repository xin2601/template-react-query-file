import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className="p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        Layout 选择页面
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                        选择您要使用的Layout环境
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-blue-600 dark:text-blue-400">🏠</span>
                                默认Layout
                            </CardTitle>
                            <CardDescription>正式环境的布局和功能</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                适用于生产环境的正式布局，包含完整的功能和专业的界面设计。
                            </p>
                            <Link to="/home">
                                <Button className="w-full">进入默认Layout</Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="border-yellow-200 dark:border-yellow-800">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-yellow-600 dark:text-yellow-400">🧪</span>
                                测试Layout
                            </CardTitle>
                            <CardDescription>开发测试环境的布局</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                专门用于开发和测试的环境，包含调试工具和测试功能。
                            </p>
                            <Link to="/test-home">
                                <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                                    进入测试Layout
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}