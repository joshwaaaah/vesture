import { AppText } from '@/components/ui/text';
import { ReactNode } from 'react';

type FormLabelProps = {
  children: ReactNode;
};

export function FormLabel({ children }: FormLabelProps) {
  return (
    <AppText className="text-lg mb-3 font-manrope-600">
      {children}
    </AppText>
  );
}

