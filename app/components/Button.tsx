import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  title: string;
  variant?: "primary" | "secondary";
  onPress?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}
const Button: React.FC<ButtonProps> = ({
  title,
  variant = "secondary",
  onPress,
  disabled = false,
  className = "",
  icon,
}) => {
  const baseStyles =
    "rounded-full px-8 py-4 items-center justify-center shadow-sm active:opacity-80 flex-row gap-2";
  const textStyles = "font-outfit-bold text-base";

 const variantStyles = {
   primary: disabled ? "bg-primary-300" : "bg-primary-200",
   secondary: "bg-white",
 };


  const textColorStyles = {
    primary: "text-white",
    secondary: "text-gray-800",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      activeOpacity={0.7}
    >
      <Text className={`${textStyles} ${textColorStyles[variant]}`}>
        {title}
      </Text>
      {icon}
    </TouchableOpacity>
  );
};
export default Button;
