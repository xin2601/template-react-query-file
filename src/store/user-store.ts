import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// 用户状态接口
export interface UserState {
    id: string | null
    name: string | null
    email: string | null
    avatar: string | null
    isAuthenticated: boolean
    preferences: {
        language: string
        notifications: boolean
    }
}

// 用户操作接口
export interface UserActions {
    setUser: (user: Partial<UserState>) => void
    login: (userData: { id: string; name: string; email: string; avatar?: string }) => void
    logout: () => void
    updatePreferences: (preferences: Partial<UserState['preferences']>) => void
    clearUser: () => void
}

// 用户 Store 类型
export type UserStore = UserState & UserActions

// 初始状态
const initialState: UserState = {
    id: null,
    name: null,
    email: null,
    avatar: null,
    isAuthenticated: false,
    preferences: {
        language: 'zh-CN',
        notifications: true,
    },
}

// 创建用户 Store
export const useUserStore = create<UserStore>()(
    devtools(
        persist(
            (set, get) => ({
                ...initialState,

                setUser: (user) =>
                    set(
                        (state) => ({
                            ...state,
                            ...user,
                        }),
                        false,
                        'setUser'
                    ),

                login: (userData) =>
                    set(
                        {
                            id: userData.id,
                            name: userData.name,
                            email: userData.email,
                            avatar: userData.avatar || null,
                            isAuthenticated: true,
                        },
                        false,
                        'login'
                    ),

                logout: () =>
                    set(
                        {
                            ...initialState,
                        },
                        false,
                        'logout'
                    ),

                updatePreferences: (preferences) =>
                    set(
                        (state) => ({
                            preferences: {
                                ...state.preferences,
                                ...preferences,
                            },
                        }),
                        false,
                        'updatePreferences'
                    ),

                clearUser: () =>
                    set(
                        {
                            ...initialState,
                        },
                        false,
                        'clearUser'
                    ),
            }),
            {
                name: 'user-storage',
                partialize: (state) => ({
                    id: state.id,
                    name: state.name,
                    email: state.email,
                    avatar: state.avatar,
                    isAuthenticated: state.isAuthenticated,
                    preferences: state.preferences,
                }),
            }
        ),
        {
            name: 'user-store',
        }
    )
)