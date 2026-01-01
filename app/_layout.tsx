import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import 'react-native-gesture-handler'
import 'react-native-reanimated'
import "@/global.css"

import { AuthProvider, useAuth } from '@/providers/auth-providers'
import { useColorScheme } from '@/hooks/use-color-scheme'

import { SplashScreenController } from '@/components/splash-screen-controller'

export const unstable_settings = {
  anchor: '(tabs)',
}

function RootNavigator() {
  const { user } = useAuth()
  const isLoggedIn = user !== undefined && user !== null

  return (
    <Stack>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
        <Stack.Screen name="auth/register" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  )
}

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <SplashScreenController />
        <RootNavigator />
        <StatusBar style="auto" />
      </AuthProvider>
    </ThemeProvider>
  );
}
