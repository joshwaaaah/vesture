import { twMerge } from 'tailwind-merge';

import { Text, type TextProps } from 'react-native';

type AppTextProps = TextProps & {
  className?: string;
};

export function AppText({ className, ...props }: AppTextProps) {
  const mergedClassName = twMerge('font-eb-garamond-400', className);

  return <Text {...props} className={mergedClassName} />;
}
