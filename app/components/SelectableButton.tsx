import React from "react";
import { Pressable, View } from "react-native";
import CustomText from "@/app/components/CustomText";

interface SelectableButtonProps<T = string> {
  item: {
    value: T;
    label: string;
    icon?: string | React.ReactNode;
  };
  selected: boolean;
  onPress: (value: T) => void;
  className?: string; 
}

const SelectableButton = <T extends string>({
  item,
  selected,
  onPress,
  className = "",
}: SelectableButtonProps<T>) => {
  return (
    <Pressable
      className={`p-3 px-6  rounded-lg flex-row items-center bg-primary-400  ${
        selected ? "border-2 border-primary-300" : ""
      } ${className}`}
      onPress={() => onPress(item.value)}
    >
      {item.icon && (
        <View className="pr-3">
          {typeof item.icon === "string" ? (
            <CustomText size="lg">{item.icon}</CustomText>
          ) : (
            item.icon
          )}
        </View>
      )}
      <CustomText size="base">{item.label}</CustomText>
    </Pressable>
  );
};

export default SelectableButton;
