import React, { useState } from "react";
import { View, Pressable, Image, Text } from "react-native";
import { ServiceItem } from "./types";
import CustomText from "../../CustomText";

interface Props {
  items: ServiceItem[];
}

const OtherServicesSection: React.FC<Props> = ({ items }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handlePress = (id: string) => {
    setActiveId(id);

    setTimeout(() => {
      setActiveId((prev) => (prev === id ? null : prev));
    }, 1000);
  };

  return (
    <View className="mb-6 px-4">
      <CustomText size="lg" weight="bold" className="mb-4">
        Other Services
      </CustomText>

      <View className="flex-row flex-wrap gap-4">
        {items.map((item) => (
          <View
            key={item.id}
            className="relative"
            style={{ width: "30%", aspectRatio: 1 }}
          >
            <Pressable
              onPress={() => handlePress(item.id)}
              className="bg-primary-300 rounded-2xl p-4 items-center justify-center h-full"
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

            {activeId === item.id && (
              <View className="absolute -right-2 top-2 bg-primary-200 px-2 py-1 rounded-full">
                <Text className="text-white text-xs">Coming soon</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default OtherServicesSection;
