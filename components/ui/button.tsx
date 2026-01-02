import { Pressable, type PressableProps, Text } from 'react-native';

type Props = PressableProps & {
  title: string;
};

export function Button(props: Props) {
  return (
    <Pressable {...props} className="bg-black p-5 rounded-xl">
      <Text className="text-center text-white text-lg">{props.title}</Text>
    </Pressable>
  );
}
