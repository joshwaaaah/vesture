import { TextInput, type TextInputProps } from "react-native";

type InputProps = TextInputProps & {
  className?: string;
};

export function Input({ className, ...props }: InputProps) {
  return (
    <TextInput 
      className={className || "border rounded-lg p-5 border-gray-300 shadow shadow-slate-300 placeholder:text-gray-600"}
      {...props}
    />
  );
}
  