import React from "react";
import { View, Pressable, Image } from "react-native";
import { ServiceItem } from "./types";
import CustomText from "../../CustomText";


interface Props {
  items: ServiceItem[];
  onItemPress?: (item: ServiceItem) => void;
}

const BillPaymentSection: React.FC<Props> = ({ items, onItemPress }) => {
  return (
    <View className="mb-6 px-4">
      <View className="flex-row justify-between items-center mb-4 px-2">
        <CustomText size="lg" weight="bold">
          Bill Payment
        </CustomText>
      </View>

      <View className="flex-row flex-wrap gap-3">
        {items.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => onItemPress?.(item)}
            className="items-center mb-2"
            style={{ width: "22.6%" }}
          >
            <View
              className="bg-primary-300 rounded-2xl items-center justify-center"
              style={{ width: 70, height: 70 }}
            >
              <Image
                source={item.icon}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
            </View>
            <CustomText
              size="sm"
              weight="medium"
              className="text-center mt-1"
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

export default BillPaymentSection;
