import { useCallback } from 'react'
import { useUserStore } from './user-store'
import { useThemeStore } from './theme-store'
import { useAppStore } from './app-store'

// 用户相关的自定义 hooks
export const useAuth = () => {
    const { isAuthenticated, login, logout, clearUser } = useUserStore()

    return {
        isAuthenticated,
        login,
        logout,
        clearUser,
    }
}

export const useUserProfile = () => {
    const { id, name, email, avatar, setUser } = useUserStore()

    const updateProfile = useCallback((updates: { name?: string; email?: string; avatar?: string }) => {
        setUser(updates)
    }, [setUser])

    return {
        user: { id, name, email, avatar },
        updateProfile,
    }
}

export const useUserPreferences = () => {
    const { preferences, updatePreferences } = useUserStore()

    return {
        preferences,
        updatePreferences,
    }
}

// 主题相关的自定义 hooks
export const useTheme = () => {
    const { theme, actualTheme, setTheme, toggleTheme } = useThemeStore()

    return {
        theme,
        actualTheme,
        setTheme,
        toggleTheme,
        isDark: actualTheme === 'dark',
        isLight: actualTheme === 'light',
    }
}

// 应用状态相关的自定义 hooks
export const useLoading = () => {
    const { isLoading, setLoading } = useAppStore()

    return {
        isLoading,
        setLoading,
    }
}

export const useSidebar = () => {
    const { isSidebarOpen, toggleSidebar, setSidebarOpen } = useAppStore()

    return {
        isSidebarOpen,
        toggleSidebar,
        setSidebarOpen,
    }
}

export const useNotifications = () => {
    const {
        notifications,
        addNotification,
        removeNotification,
        markNotificationAsRead,
        clearNotifications
    } = useAppStore()

    const unreadCount = notifications.filter(n => !n.read).length

    const showSuccess = useCallback((title: string, message: string) => {
        addNotification({ type: 'success', title, message })
    }, [addNotification])

    const showError = useCallback((title: string, message: string) => {
        addNotification({ type: 'error', title, message })
    }, [addNotification])

    const showWarning = useCallback((title: string, message: string) => {
        addNotification({ type: 'warning', title, message })
    }, [addNotification])

    const showInfo = useCallback((title: string, message: string) => {
        addNotification({ type: 'info', title, message })
    }, [addNotification])

    return {
        notifications,
        unreadCount,
        addNotification,
        removeNotification,
        markNotificationAsRead,
        clearNotifications,
        showSuccess,
        showError,
        showWarning,
        showInfo,
    }
}

export const useModal = () => {
    const { modal, openModal, closeModal } = useAppStore()

    return {
        modal,
        openModal,
        closeModal,
        isOpen: modal.isOpen,
    }
}

export const useBreadcrumbs = () => {
    const { breadcrumbs, setBreadcrumbs, addBreadcrumb, clearBreadcrumbs } = useAppStore()

    return {
        breadcrumbs,
        setBreadcrumbs,
        addBreadcrumb,
        clearBreadcrumbs,
    }
}

// 组合 hook - 获取应用的整体状态
export const useAppState = () => {
    const user = useUserStore()
    const theme = useThemeStore()
    const app = useAppStore()

    return {
        user,
        theme,
        app,
    }
}