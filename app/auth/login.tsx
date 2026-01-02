import { yupResolver } from '@hookform/resolvers/yup';
import { MeshGradientView } from 'expo-mesh-gradient';
import { useRouter } from 'expo-router';
import { MotiText } from 'moti';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
} from 'react-native';
import { object, string } from 'yup';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { FormError } from '@/components/ui/form-error';
import { FormLabel } from '@/components/ui/form-label';
import { Input } from '@/components/ui/input';
import { AppText } from '@/components/ui/text';

import { supabase } from '@/utils/supabase';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const loginSchema = object({
    email: string()
      .email('Please use a valid email address')
      .required('Please enter your email'),
    password: string().required('Please enter your password'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword(data);
    if (error) {
      Alert.alert('Your credentials are incorrect');
    }

    setLoading(false);
  });

  return (
    <KeyboardAvoidingView
      className="flex flex-1 bg-black"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <MeshGradientView
        style={{ flex: 1 }}
        columns={3}
        rows={3}
        colors={[
          'black',
          '#292828',
          'black',
          '#292828',
          'black',
          '#292828',
          'black',
          'black',
          '#292828',
        ]}
        points={[
          [0.0, 0.0],
          [0.5, 0.0],
          [1.0, 0.0],
          [0.0, 0.5],
          [0.5, 0.5],
          [1.0, 0.5],
          [0.0, 1.0],
          [0.5, 1.0],
          [1.0, 1.0],
        ]}
      >
        <View className="flex-1 flex flex-col justify-center items-center">
          <Container>
            <MotiText
              from={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 1500,
              }}
            >
              <AppText className="text-4xl text-white font-manrope-600 text-center">
                Welcome back to your digital wardrobe.
              </AppText>
            </MotiText>

            <MotiText
              className="mt-4"
              from={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 1500,
                delay: 250,
              }}
            >
              <AppText className="text-xl text-white text-center">
                Curate your collection, compose ensembles and showcase your
                style.
              </AppText>
            </MotiText>

            <View className="bg-white p-10 mt-20 shadow-xl rounded-xl flex flex-col gap-6">
              <View>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <FormLabel>Email</FormLabel>
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
                      <FormLabel>Password</FormLabel>
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
                title={loading ? 'Authenticating...' : 'Login'}
                disabled={loading}
              />

              <Pressable
                onPress={() => {
                  router.navigate('/auth/register');
                }}
              >
                <AppText className="font-manrope-600">
                  Register for an account.
                </AppText>
              </Pressable>
            </View>
          </Container>
        </View>
      </MeshGradientView>
    </KeyboardAvoidingView>
  );
}
