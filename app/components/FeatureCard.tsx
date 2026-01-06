import type React from "react";
import { Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface FeatureCardProps {
  title: string;
  icon: string;
  onPress?: () => void;
  bgColor?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  icon,
  onPress,
  bgColor = "#969841",
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-1 rounded-xl p-4 m-2 items-center justify-center min-h-32 shadow-sm"
      style={{ backgroundColor: bgColor }}
    >
      <MaterialCommunityIcons name={icon as any} size={32} color="#FFFFFF" />
      <Text className="text-white text-xs font-rubik-semibold mt-3 text-center">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default FeatureCard;
