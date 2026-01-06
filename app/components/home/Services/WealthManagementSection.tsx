import React from "react";
import { View, Pressable, Image } from "react-native";
import { ServiceItem } from "./types";
import CustomText from "../../CustomText";

interface Props {
  items: ServiceItem[];
  onItemPress?: (item: ServiceItem) => void;
}

const WealthManagementSection: React.FC<Props> = ({ items, onItemPress }) => {
  return (
    <View className="mb-6 px-4">
      <CustomText size="lg" weight="bold" className="mb-4">
        Wealth Management
      </CustomText>

      <View className="flex-row flex-wrap gap-4">
        {items.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => onItemPress?.(item)}
            className="items-center mb-2"
            style={{ width: "30%", aspectRatio: 1 }}
          >
            <View
              className="bg-primary-300 rounded-2xl items-center justify-center"
              style={{ width: 100, height: 100 }}
            >
              <Image
                source={item.icon}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
            </View>

            <CustomText
              size="sm"
              weight="medium"
              className="text-center mt-2"
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

export default WealthManagementSection;
