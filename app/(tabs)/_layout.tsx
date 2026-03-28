import React from 'react';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { DynamicColorIOS } from 'react-native';

export default function TabLayout() {
  return (
    <NativeTabs
      labelStyle={{
        // For the text color
        color: DynamicColorIOS({
          dark: 'white',
          light: 'black',
        }),
      }}
      // For the selected icon color
      tintColor={DynamicColorIOS({
        dark: 'white',
        light: 'black',
      })}
    >
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="wardrobe">
        <Icon sf="hanger" drawable="custom_settings_drawable" />
        <Label>Wardrobe</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="outfits">
        <Icon sf="tshirt" drawable="custom_settings_drawable" />
        <Label>Outfits</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <Icon sf="person" drawable="custom_settings_drawable" />
        <Label>Profile</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
