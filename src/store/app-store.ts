import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// 应用状态接口
export interface AppState {
    isLoading: boolean
    isSidebarOpen: boolean
    notifications: Array<{
        id: string
        type: 'success' | 'error' | 'warning' | 'info'
        title: string
        message: string
        timestamp: number
        read: boolean
    }>
    modal: {
        isOpen: boolean
        type: string | null
        data: any
    }
    breadcrumbs: Array<{
        label: string
        href?: string
    }>
}

// 应用操作接口
export interface AppActions {
    setLoading: (loading: boolean) => void
    toggleSidebar: () => void
    setSidebarOpen: (open: boolean) => void
    addNotification: (notification: Omit<AppState['notifications'][0], 'id' | 'timestamp' | 'read'>) => void
    removeNotification: (id: string) => void
    markNotificationAsRead: (id: string) => void
    clearNotifications: () => void
    openModal: (type: string, data?: any) => void
    closeModal: () => void
    setBreadcrumbs: (breadcrumbs: AppState['breadcrumbs']) => void
    addBreadcrumb: (breadcrumb: AppState['breadcrumbs'][0]) => void
    clearBreadcrumbs: () => void
}

// 应用 Store 类型
export type AppStore = AppState & AppActions

// 初始状态
const initialState: AppState = {
    isLoading: false,
    isSidebarOpen: true,
    notifications: [],
    modal: {
        isOpen: false,
        type: null,
        data: null,
    },
    breadcrumbs: [],
}

// 生成通知 ID
const generateNotificationId = () => `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

// 创建应用 Store
export const useAppStore = create<AppStore>()(
    devtools(
        (set, get) => ({
            ...initialState,

            setLoading: (loading) =>
                set(
                    { isLoading: loading },
                    false,
                    'setLoading'
                ),

            toggleSidebar: () =>
                set(
                    (state) => ({ isSidebarOpen: !state.isSidebarOpen }),
                    false,
                    'toggleSidebar'
                ),

            setSidebarOpen: (open) =>
                set(
                    { isSidebarOpen: open },
                    false,
                    'setSidebarOpen'
                ),

            addNotification: (notification) =>
                set(
                    (state) => ({
                        notifications: [
                            ...state.notifications,
                            {
                                ...notification,
                                id: generateNotificationId(),
                                timestamp: Date.now(),
                                read: false,
                            },
                        ],
                    }),
                    false,
                    'addNotification'
                ),

            removeNotification: (id) =>
                set(
                    (state) => ({
                        notifications: state.notifications.filter((n) => n.id !== id),
                    }),
                    false,
                    'removeNotification'
                ),

            markNotificationAsRead: (id) =>
                set(
                    (state) => ({
                        notifications: state.notifications.map((n) =>
                            n.id === id ? { ...n, read: true } : n
                        ),
                    }),
                    false,
                    'markNotificationAsRead'
                ),

            clearNotifications: () =>
                set(
                    { notifications: [] },
                    false,
                    'clearNotifications'
                ),

            openModal: (type, data = null) =>
                set(
                    {
                        modal: {
                            isOpen: true,
                            type,
                            data,
                        },
                    },
                    false,
                    'openModal'
                ),

            closeModal: () =>
                set(
                    {
                        modal: {
                            isOpen: false,
                            type: null,
                            data: null,
                        },
                    },
                    false,
                    'closeModal'
                ),

            setBreadcrumbs: (breadcrumbs) =>
                set(
                    { breadcrumbs },
                    false,
                    'setBreadcrumbs'
                ),

            addBreadcrumb: (breadcrumb) =>
                set(
                    (state) => ({
                        breadcrumbs: [...state.breadcrumbs, breadcrumb],
                    }),
                    false,
                    'addBreadcrumb'
                ),

            clearBreadcrumbs: () =>
                set(
                    { breadcrumbs: [] },
                    false,
                    'clearBreadcrumbs'
                ),
        }),
        {
            name: 'app-store',
        }
    )
)