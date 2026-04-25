import { Pressable, View } from 'react-native';
import { AppText } from '@/components/ui/text';

type Option = {
  id: string;
  name: string;
};

type Props = {
  options: Option[];
  selectedId: string | null | undefined;
  onSelect: (id: string | null) => void;
  disabled?: boolean;
};

export function PillSelector({ options, selectedId, onSelect, disabled }: Props) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selectedId === option.id;
        return (
          <Pressable
            key={option.id}
            disabled={disabled}
            onPress={() => onSelect(isSelected ? null : option.id)}
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
