import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'

export const Route = createFileRoute('/_default-layout/home')({
    component: DefaultHome,
})

function DefaultHome() {
    return (
        <div className="p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        🏠 正式环境 - HTTP 集成演示应用
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                        基于 TanStack Router + React Query + redaxios 的完整 HTTP 解决方案
                    </p>
                </div>
            </div>
        </div>
    )
}