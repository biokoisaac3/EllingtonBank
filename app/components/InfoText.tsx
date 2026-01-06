import React from "react";
import { Pressable, Text, TouchableOpacity } from "react-native";

interface InfoTextProps {
  text: string;
  actionText: string;
  onPress?: () => void | Promise<void>;
  containerClassName?: string;
  textClassName?: string;
  actionClassName?: string;
  disabled?: boolean;
}

const InfoText: React.FC<InfoTextProps> = ({
  text,
  actionText,
  onPress,
  containerClassName = "text-accent-200 text-center mt-3 text-accent-100 font-semibold text-md",
  textClassName = "",
  actionClassName = "text-primary-200 font-semibold -mb-1",
  disabled = false,
}) => {
  return (
    <Text className={containerClassName}>
      {text}{" "}
      {actionText ? (
        <Pressable
          onPress={onPress}
          disabled={disabled}
        >
          <Text className={actionClassName}>{actionText}</Text>
        </Pressable>
      ) : (
        <Text className={actionClassName} >{actionText}</Text>
      )}
    </Text>
  );
};

export default InfoText;
