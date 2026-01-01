import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Alert, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { object, string } from "yup";

import { Container } from '@/components/ui/container';
import { FormError } from '@/components/ui/form-error';
import { FormLabel } from '@/components/ui/form-label';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { supabase } from "@/utils/supabase";
import { useState } from "react";

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);

  const loginSchema = object({
    email: string().email().required('Please enter your email'),
    password: string().required('Please enter your password'),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword(data)
    if (error) {
      Alert.alert('Your credentials are incorrect')
    }

    setLoading(false)
  })

  return (
    <KeyboardAvoidingView className="flex flex-1 bg-yellow-500" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View className="my-auto">
        <Container>
          <Text className="text-4xl text-white font-bold">
            Create your account to create your digital wardrobe
          </Text>

          <Text className="text-xl text-white mt-4">
            Create, organise and share your wardrobe.
          </Text>
        </Container>
      </View>

      <View className="bg-white py-14 rounded-tr-3xl rounded-tl-3xl">
        <Container className="flex flex-col gap-4">
          <View>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <FormLabel>
                    Email
                  </FormLabel>
                  <Input
                    placeholder="Enter your email"
                    onBlur={onBlur}
                    autoCapitalize="none"
                    onChangeText={onChange}
                    value={value}
                    inputMode="email"
                    autoComplete="email"
                    textContentType="username"
                    keyboardType="email-address"
                  />
                </>
              )}
              name="email"
            />

            <FormError error={errors.email} />
          </View>

          <View>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <FormLabel>
                    Password
                  </FormLabel>
                  <Input
                    placeholder="Enter your password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoComplete="password"
                    textContentType="password"
                    value={value}
                  />
                </>
              )}
              name="password"
            />

            <FormError error={errors.password} />
          </View>


          <Button
            onPress={onSubmit} 
            title={loading ? "Authenticating..." : "Login"}
            disabled={loading}
          />
        </Container>
      </View>
    </KeyboardAvoidingView>
  );
}
