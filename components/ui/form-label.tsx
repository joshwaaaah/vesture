import { Text } from 'react-native';
import { ReactNode } from 'react';

type FormLabelProps = {
  children: ReactNode;
};

export function FormLabel({ children }: FormLabelProps) {
  return (
    <Text className="text-gray-700 text-lg mb-3">
      {children}
    </Text>
  );
}

