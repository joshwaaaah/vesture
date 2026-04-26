import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Skeleton } from 'moti/skeleton';
import { Image, Linking, Pressable, ScrollView, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { AppText } from '@/components/ui/text';
import { useWardrobeItem } from '@/hooks/use-wardrobe-item';
import { colors } from '@/constants/colors';

export default function WardrobeItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { data: item, isLoading, isError } = useWardrobeItem(id);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-wardrobe-item-background">
        <Skeleton.Group show>
          <View className="px-6 py-4 border-y border-wardrobe-item-border">
            <Pressable onPress={() => router.back()}>
              <AppText className="text-xl">Back to wardrobe</AppText>
            </Pressable>
          </View>

          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View
              testID="image-placeholder"
              className="w-full aspect-[3/4] bg-wardrobe-item-placeholder-background items-center justify-center"
            >
              <Ionicons name="image-outline" size={32} color="#a3a3a3" />
            </View>

            <View className="p-6">
              <View className="flex-row justify-between items-center mb-4">
                <View>
                  <Skeleton
                    width={200}
                    height={20}
                    colors={[
                      colors['wardrobe-item']['skeleton']['from'],
                      colors['wardrobe-item']['skeleton']['via'],
                      colors['wardrobe-item']['skeleton']['to'],
                    ]}
                  ></Skeleton>
                </View>
                <View>
                  <Skeleton
                    width={100}
                    height={20}
                    colors={[
                      colors['wardrobe-item']['skeleton']['from'],
                      colors['wardrobe-item']['skeleton']['via'],
                      colors['wardrobe-item']['skeleton']['to'],
                    ]}
                  ></Skeleton>
                </View>
              </View>

              <View className="border-t border-wardrobe-item-border pt-4 mt-2 space-y-2">
                <View className="flex-row justify-between">
                  <AppText className="text-wardrobe-item-foreground-secondary text-lg">
                    Category
                  </AppText>
                  <Skeleton
                    width={200}
                    height={15}
                    colors={[
                      colors['wardrobe-item']['skeleton']['from'],
                      colors['wardrobe-item']['skeleton']['via'],
                      colors['wardrobe-item']['skeleton']['to'],
                    ]}
                  ></Skeleton>
                </View>

                <View className="flex-row justify-between">
                  <AppText className="text-wardrobe-item-foreground-secondary text-lg">
                    Color
                  </AppText>
                  <Skeleton
                    width={200}
                    height={15}
                    colors={[
                      colors['wardrobe-item']['skeleton']['from'],
                      colors['wardrobe-item']['skeleton']['via'],
                      colors['wardrobe-item']['skeleton']['to'],
                    ]}
                  ></Skeleton>
                </View>

                <View className="flex-row justify-between">
                  <AppText className="text-wardrobe-item-foreground-secondary text-lg">
                    Size
                  </AppText>
                  <Skeleton
                    width={200}
                    height={15}
                    colors={[
                      colors['wardrobe-item']['skeleton']['from'],
                      colors['wardrobe-item']['skeleton']['via'],
                      colors['wardrobe-item']['skeleton']['to'],
                    ]}
                  ></Skeleton>
                </View>
              </View>
            </View>
          </ScrollView>
        </Skeleton.Group>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center px-6">
        <AppText className="text-lg text-wardrobe-item-foreground-secondary">
          Something went wrong. Please try again.
        </AppText>
      </SafeAreaView>
    );
  }

  if (!item) {
    return null;
  }

  return (
    <SafeAreaView
      className="flex-1 bg-wardrobe-item-background"
      edges={['right', 'left', 'top']}
    >
      <View className="px-6 py-4 border-y border-wardrobe-item-border">
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
            className="w-full aspect-[3/4] bg-wardrobe-item-placeholder-background items-center justify-center"
          >
            <Ionicons
              name="image-outline"
              size={32}
              color={colors['wardrobe-item']['placeholder-foreground']}
            />
          </View>
        )}

        <View className="p-6">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <AppText className="text-2xl text-wardrobe-item-foreground">
                {item.title}
              </AppText>
              <AppText className="text-lg text-wardrobe-item-price mt-1">
                £{(item.price ?? 0).toFixed(2)}
              </AppText>
            </View>
            <Ionicons
              name={item.favourited ? 'heart' : 'heart-outline'}
              size={26}
              color={colors['wardrobe-item'].foreground}
            />
          </View>

          <View className="border-t border-wardrobe-item-border pt-4 mt-2 space-y-2">
            {item.category ? (
              <View className="flex-row justify-between">
                <AppText className="text-wardrobe-item-foreground-secondary text-lg">
                  Category
                </AppText>
                <AppText className="text-wardrobe-item-foreground text-lg">
                  {item.category.name}
                </AppText>
              </View>
            ) : null}
            {item.color ? (
              <View className="flex-row justify-between">
                <AppText className="text-wardrobe-item-foreground-secondary text-lg">
                  Color
                </AppText>
                <AppText className="text-wardrobe-item-foreground text-lg">
                  {item.color.name}
                </AppText>
              </View>
            ) : null}
            {item.size ? (
              <View className="flex-row justify-between">
                <AppText className="text-wardrobe-item-foreground-secondary text-lg">
                  Size
                </AppText>
                <AppText className="text-wardrobe-item-foreground text-lg">
                  {item.size.name}
                </AppText>
              </View>
            ) : null}
            {item.seasons && item.seasons.length > 0 ? (
              <View className="flex-row justify-between">
                <AppText className="text-wardrobe-item-foreground-secondary text-lg">
                  Season
                </AppText>
                <AppText className="text-wardrobe-item-foreground text-lg">
                  {item.seasons
                    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
                    .join(', ')}
                </AppText>
              </View>
            ) : null}
            {item.shop_url ? (
              <View className="flex-row justify-between">
                <AppText className="text-wardrobe-item-foreground-secondary text-lg">
                  Shop
                </AppText>
                <Pressable onPress={() => Linking.openURL(item.shop_url!)}>
                  <AppText className="text-wardrobe-item-foreground text-lg underline">
                    View in shop
                  </AppText>
                </Pressable>
              </View>
            ) : null}
          </View>

          {item.notes ? (
            <View className="mt-6">
              <AppText className="text-wardrobe-item-foreground-secondary mb-1 text-lg">
                Notes
              </AppText>
              <AppText className="text-wardrobe-item-foreground text-lg">
                {item.notes}
              </AppText>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
