import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface AmountCardProps {
  amount: string | number;
  description?: string; 
}

export default function AmountCard({ amount, description }: AmountCardProps) {
  return (
    <LinearGradient
      colors={["#212207", "#515220"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ borderRadius: 20, padding: 10 }}
    >
      <View className="p-4 py-5">
        <Text className="text-3xl font-bold text-white mb-2 text-center">
          ₦{amount}
        </Text>

        {description && (
          <Text className="text-sm text-accent-100 text-center">
            {description}
          </Text>
        )}
      </View>
    </LinearGradient>
  );
}
