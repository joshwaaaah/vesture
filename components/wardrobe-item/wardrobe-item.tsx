import { Image, View } from 'react-native';
import { AppText } from '../ui/text';
import Ionicons from '@expo/vector-icons/Ionicons';
import { tokens } from '@/constants/theme';

type WardrobeItemProps = {
  title: string;
  image: string | null;
  price: number;
  favourited?: boolean;
};

export default function WardrobeItem({
  title,
  image,
  price,
  favourited,
}: WardrobeItemProps) {
  return (
    <View className="border-b border-r border-wardrobe-item-border">
      {image ? (
        <Image
          source={{ uri: image }}
          className="w-full aspect-[3/4]"
          resizeMode="cover"
        />
      ) : (
        <View className="w-full aspect-[3/4] bg-wardrobe-item-placeholder-background items-center justify-center">
          <Ionicons
            name="image-outline"
            size={32}
            color={tokens.wardrobeItem.placeholderForeground}
          />
        </View>
      )}
      <View className="p-4 flex flex-row gap-2 justify-between">
        <View>
          <AppText className="text-wardrobe-item-foreground text-xl">
            {title}
          </AppText>
          <AppText className="text-wardrobe-item-price mt-1">
            £{price.toFixed(2)}
          </AppText>
        </View>
        <View>
          <Ionicons
            name={favourited ? 'heart' : 'heart-outline'}
            size={22}
            color={tokens.wardrobeItem.foreground}
          />
        </View>
      </View>
    </View>
  );
}
