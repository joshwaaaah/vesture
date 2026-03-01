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
    </Stack>
  );
}

