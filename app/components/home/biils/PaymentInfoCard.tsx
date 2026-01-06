import React, { ReactNode } from "react";
import { View, Image, ImageSourcePropType, TextStyle } from "react-native";
import CustomText from "../../CustomText";

interface PaymentInfoCardProps {
  provider: string;
  phone: string;
  icon?: ImageSourcePropType | (() => ReactNode);
  providerStyle?: TextStyle;
  phoneStyle?: TextStyle;
}

export default function PaymentInfoCard({
  provider,
  phone,
  icon,
  providerStyle,
  phoneStyle,
}: PaymentInfoCardProps) {
  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === "function") return icon();
    return (
      <Image
        source={icon}
        className="w-8 h-8 rounded-full"
        resizeMode="contain"
      />
    );
  };

  return (
    <View className="mb-4 flex-row justify-between items-center bg-primary-400 mt-4 p-4 rounded-xl">
      <View>
        <CustomText
          size="lg"
          weight="bold"
          className="text-white mt-2"
          style={providerStyle}
        >
          {provider.toUpperCase()}
        </CustomText>

        <CustomText
          size="lg"
          weight="medium"
          className="text-white mb-2"
          style={phoneStyle}
        >
          {phone}
        </CustomText>
      </View>

      <View className="bg-primary-500 p-4 rounded-full">{renderIcon()}</View>
    </View>
  );
}
