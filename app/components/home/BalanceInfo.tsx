import React, { ReactNode } from "react";
import { View, Image, ImageSourcePropType, TextStyle } from "react-native";
import CustomText from "../CustomText";
import { LinearGradient } from "expo-linear-gradient";

interface PaymentInfoCardProps {
  title: string;
  balance: string;
  icon?: ImageSourcePropType | (() => ReactNode);
  providerStyle?: TextStyle;
  balanceStyle?: TextStyle;
}

export default function BalanceInfoCard({
  title,
  balance,
  icon,
  providerStyle,
  balanceStyle,
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
    <LinearGradient
      colors={["#212207", "#515220"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        padding: 16,
        borderRadius: 20,
        marginBottom: 16,
        marginTop: 16,
      }}
    >
      <View className="flex-row justify-between items-center">
        <View>
          <CustomText size="sm" weight="bold" className="text-white mt-2">
            {title.toUpperCase()}
          </CustomText>

          <CustomText size="xl" weight="medium" className="text-white mb-2">
            {balance}
          </CustomText>
        </View>

        <View className="bg-primary-500 p-4 rounded-full">{renderIcon()}</View>
      </View>
    </LinearGradient>
  );
}
