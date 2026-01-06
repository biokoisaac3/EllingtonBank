import React from "react";
import { View, ColorValue } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import CustomText from "@/app/components/CustomText";
import { getBrandLogo } from "@/app/lib/utils";
import { svgIcons } from "../assets/icons/icons";

interface VirtualCardPreviewProps {
  gradientColors: readonly [ColorValue, ColorValue, ...ColorValue[]];
  icon: string;
  textColor: ColorValue;
  amount: string;
  symbol: string;
  showDetails?: boolean;
}

export default function VirtualCardPreview({
  gradientColors,
  icon,
  textColor,
  amount,
  symbol,
  showDetails = false,
}: VirtualCardPreviewProps) {
  const CardLogo = svgIcons.card_logo;
  const CardLogo2 = svgIcons.card_logo2;

  return (
    <View className="mb-6 rounded-3xl overflow-hidden ">
      <LinearGradient
        colors={gradientColors}
        style={{ padding: 20 }}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1.3, y: 0.5 }}
      >
        <View className="flex-row justify-between items-center mb-6">
          <CardLogo fill={textColor} />

          <View>
            <CustomText
              size="xs"
              className={` ${
                textColor === "black" ? "text-black" : "text-white"
              }`}
            >
              Balance
            </CustomText>
            <CustomText
              size="xl"
              className={`font-medium ${
                textColor === "black" ? "text-black" : "text-white"
              }`}
            >
              {symbol}
              {amount}
            </CustomText>
          </View>
        </View>

        <View className="mb-1">
          <CustomText
            size="xs"
            className={`opacity-70 mb-1 ${
              textColor === "black" ? "text-black" : "text-white"
            }`}
          >
            Card Number
          </CustomText>
          <CustomText
            size="xl"
            className={`tracking-widest ${
              textColor === "black" ? "text-black" : "text-white"
            }`}
            weight="bold"
          >
            {showDetails ? "4920 1234 5678 0000" : "•••• •••• •••• ••••"}
          </CustomText>
        </View>

        <View className="flex-row justify-between items-end">
          <View className="flex-1">
            <CustomText
              size="xs"
              className={`opacity-70 mb-1  ${
                textColor === "black" ? "text-black" : "text-white"
              }`}
            >
              Expiry
            </CustomText>

            <CustomText
              className={`${
                textColor === "black" ? "text-black" : "text-white"
              }`}
              size="xl"
              weight="bold"
            >
              {showDetails ? "12/28" : "•••"}
            </CustomText>
          </View>

          <View className="flex-1 items-center">
            <CustomText
              size="xs"
              className={`opacity-70 mb-1 ${
                textColor === "black" ? "text-black" : "text-white"
              }`}
            >
              CVV
            </CustomText>

            <CustomText
              className={`${
                textColor === "black" ? "text-black" : "text-white"
              }`}
              size="xl"
              weight="bold"
            >
              {showDetails ? "123" : "•••"}
            </CustomText>
          </View>

          <View className="flex-1 items-end">
            {getBrandLogo(icon, 40, textColor)}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
