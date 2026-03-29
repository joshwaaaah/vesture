import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Image, Pressable, ScrollView, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { AppText } from '@/components/ui/text';
import { useWardrobeItem } from '@/hooks/use-wardrobe-item';

export default function WardrobeItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { data: item, isLoading, isError } = useWardrobeItem(id);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator testID="loading-indicator" />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center px-6">
        <AppText className="text-lg text-neutral-700">Something went wrong. Please try again.</AppText>
      </SafeAreaView>
    );
  }

  if (!item) {
    return null;
  };

  return (
    <>
      <SafeAreaView
        className="flex-1 bg-white"
        edges={['right', 'left', 'top']}
      >
        <View className="px-6 py-4 border-y border-neutral-200">
          <Pressable onPress={() => router.back()}>
            <AppText className="text-xl">Back to wardrobe</AppText>
          </Pressable>
        </View>

        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {item.image_url ? (
            <Image
              source={{ uri: item.image_url }}
              className="w-full aspect-[3/4]"
              resizeMode="cover"
            />
          ) : (
            <View
              testID="image-placeholder"
              className="w-full aspect-[3/4] bg-neutral-100 items-center justify-center"
            >
              <Ionicons name="image-outline" size={32} color="#a3a3a3" />
            </View>
          )}

          <View className="p-6">
            <View className="flex-row justify-between items-center mb-4">
              <View>
                <AppText className="text-2xl text-black">{item.title}</AppText>
                <AppText className="text-lg text-neutral-700 mt-1">
                  £{(item.price ?? 0).toFixed(2)}
                </AppText>
              </View>
              <Ionicons
                name={item.favourited ? 'heart' : 'heart-outline'}
                size={26}
                color="black"
              />
            </View>

            <View className="border-t border-neutral-200 pt-4 mt-2 space-y-2">
              {item.category ? (
                <View className="flex-row justify-between">
                  <AppText className="text-neutral-500 text-lg">Category</AppText>
                  <AppText className="text-black text-lg">{item.category.name}</AppText>
                </View>
              ) : null}
              {item.color ? (
                <View className="flex-row justify-between">
                  <AppText className="text-neutral-500 text-lg">Color</AppText>
                  <AppText className="text-black text-lg">{item.color.name}</AppText>
                </View>
              ) : null}
              {item.size ? (
                <View className="flex-row justify-between">
                  <AppText className="text-neutral-500 text-lg">Size</AppText>
                  <AppText className="text-black text-lg">{item.size.name}</AppText>
                </View>
              ) : null}
            </View>

            {item.notes ? (
              <View className="mt-6">
                <AppText className="text-neutral-500 mb-1 text-lg">Notes</AppText>
                <AppText className="text-black text-lg">{item.notes}</AppText>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
