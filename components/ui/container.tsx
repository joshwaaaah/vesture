import { StyleSheet, View } from 'react-native';

type Props = {
  className?: string;
  children: React.ReactNode;
};

export function Container({ children, className }: Props) {
  return (
    <View style={styles.container} className={className}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
});
