import React from "react";
import { View, Pressable, Image } from "react-native";
import { ServiceItem } from "./types";
import CustomText from "../../CustomText";

interface Props {
  items: ServiceItem[];
  onItemPress?: (item: ServiceItem) => void;
}

const OtherServicesSection: React.FC<Props> = ({ items, onItemPress }) => {
  return (
    <View className="mb-6 px-4">
      <CustomText size="lg" weight="bold" className="mb-4">
        Other Services
      </CustomText>

      <View className="flex-row flex-wrap gap-4">
        {items.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => onItemPress?.(item)}
            className="bg-primary-300 rounded-2xl p-4 items-center justify-center"
            style={{ width: "30%", aspectRatio: 1 }}
          >
            <Image
              source={item.icon}
              style={{ width: 20, height: 44, marginBottom: 8 }}
              resizeMode="contain"
            />

            <CustomText
              size="sm"
              weight="medium"
              className="text-center"
              numberOfLines={2}
            >
              {item.label}
            </CustomText>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default OtherServicesSection;
