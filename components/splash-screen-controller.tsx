import { useAuth } from '@/providers/auth-providers';

import {
  useFonts,
  EBGaramond_400Regular,
  EBGaramond_500Medium,
  EBGaramond_700Bold,
} from '@expo-google-fonts/eb-garamond';

import { SplashScreen } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { loading: loadingAuthState } = useAuth();

  const [fontsLoaded, fontsLoadError] = useFonts({
    EBGaramond_400Regular,
    EBGaramond_500Medium,
    EBGaramond_700Bold,
  });

  if (!loadingAuthState && (fontsLoaded || fontsLoadError)) {
    SplashScreen.hideAsync();
  }

  return null;
}
