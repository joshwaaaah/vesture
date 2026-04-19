import {
  Pressable,
  type PressableProps,
  View,
  ActivityIndicator,
} from 'react-native';
import { AppText } from '@/components/ui/text';

type Props = PressableProps & {
  title: string;
  loading?: boolean;
};

export function Button({ loading, title, testID, ...rest }: Props) {
  return (
    <Pressable testID={testID} {...rest} className="bg-black p-5 rounded-xl">
      <AppText
        className={`text-center text-white text-lg font-manrope-600 ${loading ? 'opacity-0' : ''}`}
      >
        {title}
      </AppText>

      {loading && (
        <View className="absolute inset-0 flex items-center justify-center">
          <ActivityIndicator
            testID={testID ? `${testID}-loading` : undefined}
            size="small"
            color="#ffffff"
          />
        </View>
      )}
    </Pressable>
  );
}
