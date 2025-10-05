import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// 主题类型
export type Theme = 'light' | 'dark' | 'system'

// 主题状态接口
export interface ThemeState {
    theme: Theme
    systemTheme: 'light' | 'dark'
    actualTheme: 'light' | 'dark' // 实际应用的主题
}

// 主题操作接口
export interface ThemeActions {
    setTheme: (theme: Theme) => void
    setSystemTheme: (systemTheme: 'light' | 'dark') => void
    toggleTheme: () => void
    getActualTheme: () => 'light' | 'dark'
}

// 主题 Store 类型
export type ThemeStore = ThemeState & ThemeActions

// 获取系统主题
const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
}

// 计算实际主题
const calculateActualTheme = (theme: Theme, systemTheme: 'light' | 'dark'): 'light' | 'dark' => {
    return theme === 'system' ? systemTheme : theme
}

// 初始状态
const initialSystemTheme = getSystemTheme()
const initialState: ThemeState = {
    theme: 'system',
    systemTheme: initialSystemTheme,
    actualTheme: calculateActualTheme('system', initialSystemTheme),
}

// 创建主题 Store
export const useThemeStore = create<ThemeStore>()(
    devtools(
        persist(
            (set, get) => ({
                ...initialState,

                setTheme: (theme) =>
                    set(
                        (state) => {
                            const actualTheme = calculateActualTheme(theme, state.systemTheme)
                            return {
                                theme,
                                actualTheme,
                            }
                        },
                        false,
                        'setTheme'
                    ),

                setSystemTheme: (systemTheme) =>
                    set(
                        (state) => {
                            const actualTheme = calculateActualTheme(state.theme, systemTheme)
                            return {
                                systemTheme,
                                actualTheme,
                            }
                        },
                        false,
                        'setSystemTheme'
                    ),

                toggleTheme: () =>
                    set(
                        (state) => {
                            const newTheme: Theme = state.actualTheme === 'light' ? 'dark' : 'light'
                            const actualTheme = calculateActualTheme(newTheme, state.systemTheme)
                            return {
                                theme: newTheme,
                                actualTheme,
                            }
                        },
                        false,
                        'toggleTheme'
                    ),

                getActualTheme: () => {
                    const state = get()
                    return calculateActualTheme(state.theme, state.systemTheme)
                },
            }),
            {
                name: 'theme-storage',
                partialize: (state) => ({
                    theme: state.theme,
                }),
            }
        ),
        {
            name: 'theme-store',
        }
    )
)

// 监听系统主题变化
if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
        useThemeStore.getState().setSystemTheme(e.matches ? 'dark' : 'light')
    })
}