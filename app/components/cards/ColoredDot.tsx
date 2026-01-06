import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ColorValue, ViewStyle } from "react-native";

type GradientColors = readonly [ColorValue, ColorValue];

interface ColoredDotProps {
  gradient: GradientColors;
  selected: boolean;
}

export default function ColoredDot({ gradient, selected }: ColoredDotProps) {
  return (
    <LinearGradient
      colors={gradient}
      style={
        {
          width: 22,
          height: 22,
          borderRadius: 11,
          borderWidth: selected ? 0 : 2,
        } as ViewStyle
      }
    />
  );
}
