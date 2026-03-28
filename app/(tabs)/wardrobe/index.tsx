import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AppText } from '@/components/ui/text';
import { ActivityIndicator, FlatList, Pressable, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import WardrobeItem from '@/components/wardrobe-item/wardrobe-item';
import {
  useWardrobeItems,
  type WardrobeItem as WardrobeItemType,
} from '@/hooks/use-wardrobe-items';

export default function WardrobeScreen() {
  const { data, isLoading, isError } = useWardrobeItems();

  const renderContent = () => {
    if (isLoading) {
      return (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if (isError) {
      return (
        <View className="flex-1 items-center justify-center px-6">
          <AppText className="text-center text-neutral-500">
            Something went wrong. Please try again.
          </AppText>
        </View>
      );
    }

    if (!data || data.length === 0) {
      return (
        <View className="flex-1 items-center justify-center px-6">
          <AppText className="text-center text-neutral-500">
            Your wardrobe is empty.
          </AppText>
        </View>
      );
    }

    const renderItem = ({ item }: { item: WardrobeItemType }) => (
      <View className="flex-1 max-w-[50%]">
        <Pressable
          onPress={() =>
            router.push({
              pathname: '/wardrobe/[id]',
              params: { id: item.id },
            })
          }
        >
          <WardrobeItem
            title={item.title}
            image={item.image_url}
            price={item.price ?? 0}
            favourited={item.favourited}
          />
        </Pressable>
      </View>
    );

    return (
      <FlatList
        data={data}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentInsetAdjustmentBehavior="automatic"
      />
    );
  };

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView
        className="flex-1 bg-white"
        edges={['right', 'left', 'top']}
      >
        <View className="px-6 py-4 border-y border-neutral-200 flex-row items-center justify-between">
          <AppText className="text-3xl font-eb-garamond-400">Vesture</AppText>
        </View>

        <View className="px-6 flex-row items-center justify-between py-4 border-b border-neutral-200">
          <AppText className="text-lg">
            {data?.length ?? 0} item{data?.length !== 1 ? 's' : ''}
          </AppText>
          <Ionicons name="filter-sharp" size={22} color="black" />
        </View>

        {renderContent()}
      </SafeAreaView>
    </>
  );
}
