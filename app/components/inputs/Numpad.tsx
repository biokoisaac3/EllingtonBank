import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface NumpadProps {
  onPress: (value: string) => void;
  onDelete: () => void;
  disabled?: boolean;
}

const Numpad: React.FC<NumpadProps> = ({
  onPress,
  onDelete,
  disabled = false,
}) => {
  const rows = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ];

  return (
    <View className="gap-4">
      {rows.map((row, index) => (
        <View key={index} className="flex-row justify-between">
          {row.map((num) => (
            <TouchableOpacity
              key={num}
              disabled={disabled}
              onPress={() => onPress(num)}
              className="w-24 h-20 items-center justify-center"
            >
              <Text className="text-white text-3xl font-light">{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <View className="flex-row justify-between">
        <View className="w-24 h-20" />

        <TouchableOpacity
          disabled={disabled}
          onPress={() => onPress("0")}
          className="w-24 h-20 items-center justify-center"
        >
          <Text className="text-white text-3xl font-light">0</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={disabled}
          onPress={onDelete}
          className="w-24 h-20 items-center justify-center"
        >
          <Ionicons name="backspace-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Numpad;
