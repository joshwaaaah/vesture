import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AppText } from '@/components/ui/text';
import { FlatList, Pressable, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import WardrobeItem from '@/components/wardrobe-item/wardrobe-item';
import { getWardrobeItems } from '@/lib/wardrobe-items';

export default function WardrobeScreen() {
  const items = getWardrobeItems();

  const renderItem = ({ item }: { item: (typeof items)[number] }) => (
    <View className="flex-1 max-w-[50%]">
      <Pressable
        onPress={() =>
          router.push({
            pathname: '/wardrobe/[id]',
            params: { id: item.id.toString() },
          })
        }
      >
        <WardrobeItem
          title={item.title}
          image={item.image}
          price={item.price}
          favourited={item.favourited}
        />
      </Pressable>
    </View>
  );

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1 bg-white" edges={['right', 'left', 'top']}>
        <View className="px-6 py-4 border-y border-neutral-200 flex-row items-center justify-between">
          <AppText className="text-3xl font-eb-garamond-400">Vesture</AppText>
        </View>

        <View className="px-6 flex-row items-center justify-between py-4 border-b border-neutral-200">
          <AppText className="text-lg">21 items</AppText>
          <Ionicons name="filter-sharp" size={22} color="black" />
        </View>

        <FlatList
          data={items}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    </>
  );
}

