import React from "react";
import { Text, TextProps, TextStyle } from "react-native";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
  className?: string;
  style?: TextStyle;
  weight?: "regular" | "medium" | "bold";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "xxl" | "xxxl";
  secondary?: boolean;
}

const fontMap = {
  regular: "Outfit",
  medium: "OutfitMedium",
  bold: "OutfitBold",
};

const sizeMap = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  xxl: "text-2xl",
  xxxl: "text-3xl",
};

export default function CustomText({
  children,
  className,
  style,
  weight = "regular",
  size = "base",
  secondary = false, 
  ...rest
}: CustomTextProps) {
  const mergedClass = twMerge(
    clsx(
      sizeMap[size],
      secondary ? "text-accent-100" : "text-white",
      "mb-2",
      className
    )
  );

  return (
    <Text
      {...rest}
      className={mergedClass}
      style={[{ fontFamily: fontMap[weight] }, style]}
    >
      {children}
    </Text>
  );
}
