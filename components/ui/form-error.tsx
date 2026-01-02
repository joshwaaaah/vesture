import { AppText } from '@/components/ui/text';

type FormErrorProps = {
  error?: { message?: string } | null;
};

export function FormError({ error }: FormErrorProps) {
  if (!error?.message) return null;

  return <AppText className="font-manrope-400 mt-2">{error.message}</AppText>;
}
