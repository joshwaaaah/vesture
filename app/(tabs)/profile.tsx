import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/ui/text';

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1">
      <AppText className="text-surface-inverted-foreground">Profile</AppText>
    </SafeAreaView>
  );
}
