import {
  Pressable,
  type PressableProps,
  View,
  ActivityIndicator,
} from 'react-native';
import { AppText } from '@/components/ui/text';
import { tokens } from '@/constants/theme';

type Props = PressableProps & {
  title: string;
  loading?: boolean;
};

export function Button({ loading, title, testID, ...rest }: Props) {
  return (
    <Pressable testID={testID} {...rest} className="bg-button-background p-5 rounded-xl">
      <AppText
        className={`text-center text-button-foreground text-lg font-manrope-600 ${loading ? 'opacity-0' : ''}`}
      >
        {title}
      </AppText>

      {loading && (
        <View className="absolute inset-0 flex items-center justify-center">
          <ActivityIndicator
            testID={testID ? `${testID}-loading` : undefined}
            size="small"
            color={tokens.button.foreground}
          />
        </View>
      )}
    </Pressable>
  );
}
