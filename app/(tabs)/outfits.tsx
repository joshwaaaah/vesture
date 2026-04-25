import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/ui/text';

export default function OutfitsScreen() {
  return (
    <SafeAreaView className="flex-1">
      <AppText className="text-surface-inverted-foreground">Outfits</AppText>
    </SafeAreaView>
  );
}
