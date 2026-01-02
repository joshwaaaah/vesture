import { TextInput, type TextInputProps } from 'react-native';

type InputProps = TextInputProps & {
  className?: string;
};

export function Input({ className, ...props }: InputProps) {
  return (
    <TextInput
      className={
        className ||
        'border rounded-lg p-5 border-gray-200 font-manrope-400 placeholder:text-gray-600'
      }
      {...props}
    />
  );
}
