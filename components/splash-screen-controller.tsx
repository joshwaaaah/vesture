import { useAuth } from '@/providers/auth-providers'
import { SplashScreen } from 'expo-router'

SplashScreen.preventAutoHideAsync()

export function SplashScreenController() {
  const { loading } = useAuth()

  if (!loading) {
    SplashScreen.hideAsync()
  }

  return null
}