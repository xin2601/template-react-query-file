// Zustand Store 导出文件
// 这里导出所有的 store

export { useUserStore } from './user-store'
export { useThemeStore } from './theme-store'
export { useAppStore } from './app-store'

// 导出类型
export type { UserState, UserActions, UserStore } from './user-store'
export type { ThemeState, ThemeActions, ThemeStore, Theme } from './theme-store'
export type { AppState, AppActions, AppStore } from './app-store'

// 导出自定义 hooks
export {
  useAuth,
  useUserProfile,
  useUserPreferences,
  useTheme,
  useLoading,
  useSidebar,
  useNotifications,
  useModal,
  useBreadcrumbs,
  useAppState,
} from './hooks'