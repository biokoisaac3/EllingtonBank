import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface BundleCardProps {
  price: string | number;
}

const BundleCard: React.FC<BundleCardProps> = ({ price }) => {
  return (
    <LinearGradient
      colors={["#212207", "#515220"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
      }}
    >
      <View className="flex-row items-center">
        <View className="bg-primary-300 w-10 h-10 rounded-full items-center justify-center mr-4">
          <Ionicons name="phone-portrait-outline" size={20} color="#D4FF00" />
        </View>

        <View className="flex-1">
          <Text className="text-accent-100/70 text-sm mb-1">
            Product amount
          </Text>
          <Text className="text-white text-2xl font-bold">₦{price}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default BundleCard;
