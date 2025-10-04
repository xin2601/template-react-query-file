/**
 * Hooks 统一导出
 */

// 导出所有查询 hooks
export * from './queries'

// 导出所有变更 hooks
export * from './mutations'

// 重新导出常用的查询键工厂
export { postKeys } from './queries/usePosts'