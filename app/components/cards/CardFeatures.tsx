import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "@/app/components/CustomText";

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

interface CardFeaturesProps {
  features: Feature[];
}

const CardFeatures: React.FC<CardFeaturesProps> = ({ features }) => {
  return (
    <View className="flex-col space-y-4 bg-primary-400 p-4 rounded-2xl">
      {features.map((item, idx) => (
        <View className="flex-row items-start" key={idx}>
          <Ionicons
            name={item.icon as any}
            size={24}
            color="#FFF"
            className="mr-3 mt-1"
          />
          <View className="flex-1">
            <CustomText weight="medium">{item.title}</CustomText>
            <CustomText size="sm">{item.desc}</CustomText>
          </View>
        </View>
      ))}
    </View>
  );
};

export default CardFeatures;
