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
import { useDefaultWardrobe } from '@/hooks/use-default-wardrobe';
import { useCategories } from '@/hooks/use-categories';
import { useColors } from '@/hooks/use-colors';
import { useSizes } from '@/hooks/use-sizes';
import { tokens } from '@/constants/theme';

export default function WardrobeScreen() {
  const { data, isLoading, isError } = useWardrobeItems();
  const { data: wardrobe } = useDefaultWardrobe();

  // Prefetch reference data so the create modal renders without layout shift.
  useCategories();
  useColors();
  useSizes();

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
          <AppText className="text-center text-surface-primary-foreground-secondary">
            Something went wrong. Please try again.
          </AppText>
        </View>
      );
    }

    if (!data || data.length === 0) {
      return (
        <View className="flex-1 items-center justify-center px-6">
          <AppText className="text-center text-surface-primary-foreground-secondary">
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
        className="flex-1 bg-surface-primary-background"
        edges={['right', 'left', 'top']}
      >
        <View className="px-6 py-4 border-y border-surface-primary-border flex-row items-center justify-between">
          <AppText className="text-3xl font-eb-garamond-400">Vesture</AppText>
          <Pressable
            onPress={() =>
              router.push({
                pathname: '/wardrobe/create',
                params: { wardrobeId: wardrobe?.id },
              })
            }
            disabled={!wardrobe}
          >
            <Ionicons name="add" size={28} color={tokens.surface.primary.foreground} />
          </Pressable>
        </View>

        <View className="px-6 flex-row items-center justify-between py-4 border-b border-surface-primary-border">
          <AppText className="text-lg">
            {data?.length ?? 0} item{data?.length !== 1 ? 's' : ''}
          </AppText>
          <Ionicons name="filter-sharp" size={22} color={tokens.surface.primary.foreground} />
        </View>

        {renderContent()}
      </SafeAreaView>
    </>
  );
}
