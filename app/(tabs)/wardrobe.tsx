import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/ui/text';
import { FlatList, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import WardrobeItem from '@/components/wardrobe-item/wardrobe-item';

export default function WardrobeScreen() {
  const items = [
    {
      id: 1,
      title: 'Wool-blend Jacket',
      image:
        'https://images.asos-media.com/products/asos-design-oversized-cropped-t-shirt-in-blue-with-italy-graphic/208582022-1-truenavy?$n_960w$&wid=952&fit=constrain',
      price: 129.99,
    },
    {
      id: 2,
      title: 'Pleated Trousers',
      image:
        'https://images.asos-media.com/products/asos-design-boxy-oversized-polo-with-football-front-print-in-white-and-green/210324365-1-offwhite?$n_960w$&wid=952&fit=constrain',
      price: 79.99,
    },
    {
      id: 3,
      title: 'Graphic Tees',
      image:
        'https://images.asos-media.com/products/asos-design-boxy-oversized-polo-with-football-front-print-in-white-and-green/210324365-1-offwhite?$n_960w$&wid=952&fit=constrain',
      price: 34.99,
    },
    {
      id: 4,
      title: 'Graphic Tee',
      image:
        'https://images.asos-media.com/products/asos-design-oversized-cropped-t-shirt-in-blue-with-italy-graphic/208582022-1-truenavy?$n_960w$&wid=952&fit=constrain',
      price: 29.99,
      favourited: true,
    },
    {
      id: 5,
      title: 'Graphic Tee',
      image:
        'https://images.asos-media.com/products/asos-design-oversized-cropped-t-shirt-in-blue-with-italy-graphic/208582022-1-truenavy?$n_960w$&wid=952&fit=constrain',
      price: 24.99,
    },
    {
      id: 6,
      title: 'Graphic Tee',
      image:
        'https://images.asos-media.com/products/asos-design-oversized-cropped-t-shirt-in-blue-with-italy-graphic/208582022-1-truenavy?$n_960w$&wid=952&fit=constrain',
      price: 32.99,
    },
  ];

  const renderItem = ({ item }: { item: (typeof items)[number] }) => (
    <View className="flex-1 max-w-[50%]">
      <WardrobeItem
        title={item.title}
        image={item.image}
        price={item.price}
        favourited={item.favourited}
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1" edges={['right', 'left', 'top']}>
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
  );
}
