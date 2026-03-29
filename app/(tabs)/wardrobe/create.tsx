import * as yup from 'yup';
import { router, useLocalSearchParams } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ScrollView, View, Pressable, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { FormLabel } from '@/components/ui/form-label';
import { FormError } from '@/components/ui/form-error';
import { PillSelector } from '@/components/ui/pill-selector';
import { useCreateWardrobeItem } from '@/hooks/use-create-wardrobe-item';
import { useCategories } from '@/hooks/use-categories';
import { useColors } from '@/hooks/use-colors';
import { useSizes } from '@/hooks/use-sizes';
import { useRequiredAuth } from '@/providers/auth-providers';

const schema = yup.object({
  title: yup.string().required('Please enter a title'),
  price: yup.number().required('Please enter a price'),
  notes: yup.string().nullable().optional(),
  category_id: yup.string().nullable().optional(),
  color_id: yup.string().nullable().optional(),
  size_id: yup.string().nullable().optional(),
});

export default function CreateWardrobeItemScreen() {
  const { wardrobeId } = useLocalSearchParams<{ wardrobeId?: string }>();
  const { user } = useRequiredAuth();

  const { mutate: createWardrobeItem, isPending } = useCreateWardrobeItem();
  const { data: categories } = useCategories();
  const { data: colors } = useColors();
  const { data: sizes } = useSizes();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  if (!wardrobeId) {
    router.back();
    return null;
  }

  const onSubmit = handleSubmit(async (formData) => {
    createWardrobeItem({
      ...formData,
      wardrobe_id: wardrobeId,
      user_id: user.id
    }, {
      onSuccess: () => {
        router.back();
      },
      onError: () => {
        Alert.alert('We were unable to add your item')
      }
    });
  });
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="px-6 gap-4">
        <View>
          <FormLabel>Title</FormLabel>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="e.g. Black Jacket"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <FormError error={errors.title} />
        </View>

        <View>
          <FormLabel>Price</FormLabel>
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="e.g. 49.99"
                keyboardType="decimal-pad"
                onChangeText={(text) => onChange(text)}
                value={value != null ? String(value) : ''}
              />
            )}
          />

          <FormError error={errors.price} />
        </View>

        <View>
          <FormLabel>Notes</FormLabel>
          <Controller
            control={control}
            name="notes"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Any additional notes..."
                multiline
                numberOfLines={3}
                onChangeText={onChange}
                value={value ?? ''}
              />
              
            )}
          />
        </View>
        
        {categories && categories.length > 0 && (
          <View>
            <FormLabel>Category</FormLabel>
            <Controller
              control={control}
              name="category_id"
              render={({ field: { value, onChange } }) => (
                <PillSelector options={categories} selectedId={value} onSelect={onChange} />
              )}
            />
          </View>
        )}

        {colors && colors.length > 0 && (
          <View>
            <FormLabel>Color</FormLabel>
            <Controller
              control={control}
              name="color_id"
              render={({ field: { value, onChange } }) => (
                <PillSelector options={colors} selectedId={value} onSelect={onChange} />
              )}
            />
          </View>
        )}

        {sizes && sizes.length > 0 && (
          <View>
            <FormLabel>Size</FormLabel>
            <Controller
              control={control}
              name="size_id"
              render={({ field: { value, onChange } }) => (
                <PillSelector options={sizes} selectedId={value} onSelect={onChange} />
              )}
            />
          </View>
        )}

        <View className="mt-3">
          <Pressable
            onPress={onSubmit}
            disabled={isPending}
            className="bg-black p-5 rounded-xl"
          >
            {isPending ? (
              <ActivityIndicator testID="submit-loading" color="#ffffff" size="small" />
            ) : (
              <AppText className="text-center text-white text-lg font-manrope-600">Add item to wardrobe</AppText>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
