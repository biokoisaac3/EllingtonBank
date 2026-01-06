import React from "react";
import { View, Pressable, Image } from "react-native";
import CustomText from "./CustomText"; 

interface InfoBannerProps {
  title: string;
  description: string;
  icon?: any;
  onPress?: () => void;
  backgroundColor?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export default function InfoBanner({
  title,
  description,
  icon,
  onPress,
  backgroundColor = "#4a4b20",
  imageWidth = 108,
  imageHeight = 112,
}: InfoBannerProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{ backgroundColor }}
      className="mx-4 mb-4 mt-2 rounded-xl flex-row items-center p-6 py-4"
    >
      <View className="flex-1 pr-3">
        <CustomText size="lg" weight="medium" className="mb-1">
          {title}
        </CustomText>
        <CustomText size="xs" secondary={true} className="mt-1 leading-4">
          {description}
        </CustomText>
      </View>

      {icon && (
        <Image
          source={icon}
          style={{ width: imageWidth, height: imageHeight }}
          resizeMode="contain"
        />
      )}
    </Pressable>
  );
}
