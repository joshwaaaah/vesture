import { Stack } from 'expo-router';

export default function WardrobeStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Wardrobe',
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          presentation: 'modal',
          headerShown: true,
          title: 'Add to your wardrobe',
        }}
      />
    </Stack>
  );
}

