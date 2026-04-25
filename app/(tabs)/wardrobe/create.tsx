import * as yup from 'yup';
import { router, useLocalSearchParams } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ScrollView, View, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
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
  notes: yup.string().nullable(),
  favourited: yup.boolean().default(false),
  parent_category_id: yup.string().required('Please select a category'),
  category_id: yup
    .string()
    .nullable()
    .when('parent_category_id', {
      is: (v: string | null | undefined) => !!v,
      then: (schema) =>
        schema.required('Please select a more specific category'),
    }),
  color_id: yup.string().nullable(),
  size_id: yup.string().nullable(),
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
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { favourited: false },
  });

  const selectedParentId = watch('parent_category_id') ?? null;

  const parentCategories =
    categories?.filter((cat) => cat.parent_id === null) ?? [];
  const subcategories = selectedParentId
    ? (categories?.filter((cat) => cat.parent_id === selectedParentId) ?? [])
    : [];

  if (!wardrobeId) {
    router.back();
    return null;
  }

  const onSubmit = handleSubmit(
    (formData) => {
      const { parent_category_id, ...itemData } = formData;
      createWardrobeItem(
        { ...itemData, wardrobe_id: wardrobeId, user_id: user.id },
        {
          onSuccess: () => router.back(),
          onError: () => Alert.alert('We were unable to add your item.'),
        },
      );
    },
    () => {
      Alert.alert('Please fix the validation issues in your submission.');
    },
  );

  return (
    <SafeAreaView className="flex-1 bg-surface-primary-background">
      <ScrollView contentContainerClassName="px-6 gap-6">
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
                onChangeText={onChange}
                value={String(value ?? '')}
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

        {parentCategories.length > 0 && (
          <>
            <View>
              <FormLabel>What category does it fall into?</FormLabel>
              <PillSelector
                options={parentCategories}
                selectedId={selectedParentId}
                onSelect={(id) => {
                  setValue('parent_category_id', id ?? '', {
                    shouldValidate: true,
                  });
                  setValue('category_id', null);
                }}
              />
              <FormError error={errors.parent_category_id} />
            </View>

            {selectedParentId && (
              <View>
                <FormLabel>More specifically...</FormLabel>
                <Controller
                  control={control}
                  name="category_id"
                  render={({ field: { value, onChange } }) => (
                    <PillSelector
                      options={subcategories}
                      selectedId={value}
                      onSelect={onChange}
                    />
                  )}
                />
                <FormError error={errors.category_id} />
              </View>
            )}
          </>
        )}

        {colors && colors.length > 0 && (
          <View>
            <FormLabel>Color</FormLabel>
            <Controller
              control={control}
              name="color_id"
              render={({ field: { value, onChange } }) => (
                <PillSelector
                  options={colors}
                  selectedId={value}
                  onSelect={onChange}
                />
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
                <PillSelector
                  options={sizes}
                  selectedId={value}
                  onSelect={onChange}
                />
              )}
            />
          </View>
        )}

        <View>
          <FormLabel>Add to favourites</FormLabel>
          <Controller
            control={control}
            name="favourited"
            render={({ field: { value, onChange } }) => (
              <Switch
                testID="favourited-switch"
                value={value ?? false}
                onValueChange={onChange}
                trackColor={{ false: '#666666', true: '#000000' }}
                ios_backgroundColor="#666666"
                thumbColor="#ffffff"
              />
            )}
          />
        </View>

        <View className="mt-3">
          <Button
            title="Add item to wardrobe"
            onPress={onSubmit}
            disabled={isPending}
            loading={isPending}
            testID="submit"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
