import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/ui/text';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1">
      <AppText className="text-surface-inverted-foreground">Home</AppText>
    </SafeAreaView>
  );
}
