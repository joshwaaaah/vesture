import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/ui/text';

export default function HomeScreen() {
  return (
    <SafeAreaView className="bg-black flex-1">
      <AppText className="text-white">Home</AppText>
    </SafeAreaView>
  );
}
