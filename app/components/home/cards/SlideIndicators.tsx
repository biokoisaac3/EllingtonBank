import React from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface SlideIndicatorsProps {
  currentIndex: number;
  total: number;
}

export default function SlideIndicators({
  currentIndex,
  total,
}: SlideIndicatorsProps) {
  return (
    <View className="flex-row justify-center items-center gap-2 mt-4">
      {Array.from({ length: total }).map((_, index) => {
        const width = index === currentIndex ? 32 : 8; 
        const animatedStyle = useAnimatedStyle(() => ({
          width: withTiming(width, { duration: 200 }),
        }));

        return (
          <Animated.View
            key={index}
            style={[
              {
                height: 8,
                borderRadius: 4,
                backgroundColor: "#969841",
                marginHorizontal: 4,
              },
              animatedStyle,
            ]}
          />
        );
      })}
    </View>
  );
}
