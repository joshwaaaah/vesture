import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { MotiText } from 'moti';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import { object, string, ref } from 'yup';
import { MeshGradientView } from 'expo-mesh-gradient';

import { Container } from '@/components/ui/container';
import { FormError } from '@/components/ui/form-error';
import { FormLabel } from '@/components/ui/form-label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AppText } from '@/components/ui/text';

import { supabase } from '@/utils/supabase';
import { useState } from 'react';

export default function Register() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const registerSchema = object({
    firstName: string().required('Please enter your first name'),
    lastName: string().required('Please enter your last name'),
    email: string().email().required('Please enter your email'),
    password: string().required('Please enter your password'),
    passwordConfirm: string()
      .required('Confirm Password is required')
      .oneOf([ref('password')], 'Passwords must match'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    const transformedRequest = {
      ...data,
      options: {
        data: {
          full_name: `${data.firstName} ${data.lastName}`,
        },
      },
    };
    const { error } = await supabase.auth.signUp(transformedRequest);
    setLoading(false);

    if (error) {
      Alert.alert(error.message);
      return;
    }

    Alert.alert(
      'An email has been sent to your account. Please confirm your email address to complete registration.',
    );
  });

  return (
    <KeyboardAvoidingView
      className="flex flex-1 bg-surface-inverted-background"
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
        <ScrollView>
          <Container className="flex-1 flex flex-col mt-16">
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
              <AppText className="text-4xl text-surface-inverted-foreground font-manrope-600 text-center">
                Register for an account.
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
              <AppText className="text-xl text-surface-inverted-foreground text-center">
                Curate your collection, compose ensembles and showcase your
                style.
              </AppText>
            </MotiText>

            <View className="bg-surface-primary-background p-10 mt-12 shadow-xl rounded-xl flex flex-col gap-6">
              <View>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <FormLabel>First name</FormLabel>
                      <Input
                        placeholder="Enter your first name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        autoComplete="given-name"
                        textContentType="givenName"
                        value={value}
                      />
                    </>
                  )}
                  name="firstName"
                />

                <FormError error={errors.firstName} />
              </View>

              <View>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <FormLabel>Last name</FormLabel>
                      <Input
                        placeholder="Enter your last name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        autoComplete="family-name"
                        textContentType="familyName"
                        value={value}
                      />
                    </>
                  )}
                  name="lastName"
                />

                <FormError error={errors.firstName} />
              </View>

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

              <View>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <FormLabel>Confirm password</FormLabel>
                      <Input
                        placeholder="Confirm your password"
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
                  name="passwordConfirm"
                />

                <FormError error={errors.password} />
              </View>

              <Button
                onPress={onSubmit}
                title="Register"
                disabled={loading}
                loading={loading}
              />

              <Pressable
                onPress={() => {
                  router.navigate('/auth/login');
                }}
              >
                <AppText className="font-manrope-600">
                  Already have an account? Login.
                </AppText>
              </Pressable>
            </View>
          </Container>
        </ScrollView>
      </MeshGradientView>
    </KeyboardAvoidingView>
  );
}
