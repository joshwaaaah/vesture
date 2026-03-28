import { Image, View } from 'react-native';
import { AppText } from '../ui/text';
import Ionicons from '@expo/vector-icons/Ionicons';

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
    <View className="border-b border-r border-neutral-200">
      {image ? (
        <Image source={{ uri: image }} className="w-full aspect-[3/4]" resizeMode="cover" />
      ) : (
        <View className="w-full aspect-[3/4] bg-neutral-100 items-center justify-center">
          <Ionicons name="image-outline" size={32} color="#a3a3a3" />
        </View>
      )}
      <View className="p-4 flex flex-row gap-2 justify-between">
        <View>
          <AppText className="text-black text-xl">{title}</AppText>
          <AppText className="text-neutral-700 mt-1">
            £{price.toFixed(2)}
          </AppText>
        </View>
        <View>
          <Ionicons
            name={favourited ? 'heart' : 'heart-outline'}
            size={22}
            color="black"
          />
        </View>
      </View>
    </View>
  );
}
