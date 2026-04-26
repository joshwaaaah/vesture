import { Pressable, View } from 'react-native';
import { AppText } from '@/components/ui/text';

type Option = {
  id: string;
  name: string;
};

type Props = {
  options: Option[];
  selectedIds: string[];
  onSelect: (ids: string[]) => void;
  disabled?: boolean;
};

export function MultiPillSelector({ options, selectedIds, onSelect, disabled }: Props) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selectedIds.includes(option.id);
        return (
          <Pressable
            key={option.id}
            disabled={disabled}
            onPress={() => {
              if (isSelected) {
                onSelect(selectedIds.filter((id) => id !== option.id));
              } else {
                onSelect([...selectedIds, option.id]);
              }
            }}
            className={`px-4 py-2 rounded-full border ${
              disabled
                ? 'bg-pill-background border-pill-border opacity-40'
                : isSelected
                  ? 'bg-pill-selected-background border-pill-selected-border'
                  : 'bg-pill-background border-pill-border'
            }`}
          >
            <AppText
              className={`font-manrope-500 text-sm ${disabled || !isSelected ? 'text-pill-foreground' : 'text-pill-selected-foreground'}`}
            >
              {option.name}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}
