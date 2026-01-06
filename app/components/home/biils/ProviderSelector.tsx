import React from "react";
import { View, Pressable, Image, Text } from "react-native";

interface Provider {
  id: string;
  label: string;
  icon: any;
}

interface Props {
  providers: Provider[];
  selected: string;
  onSelect: (id: string) => void;
}

export default function ProviderSelector({
  providers,
  selected,
  onSelect,
}: Props) {
  return (
    <View className="flex-row flex-wrap justify-between w-full mb-6 gap-y-4">
      {providers.map((item) => (
        <Pressable
          key={item.id}
          onPress={() => onSelect(item.id)}
          className={`flex-1 items-center rounded-xl p-4 bg-primary-400 mr-2 ${
            selected === item.id
              ? "border border-yellow-400"
              : "border border-transparent"
          }`}
          style={{
            maxWidth: "30%", 
          }}
        >
          <Image
            source={item.icon}
            className="w-12 h-12 rounded-full"
            resizeMode="contain"
          />

          <Text
            className="text-white mt-2 text-sm font-medium text-center"
            numberOfLines={1}
          >
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
