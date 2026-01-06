import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleChange = (text: string) => {
    setQuery(text);
    onSearch(text);
  };

  return (
    <View className="flex-row items-center bg-primary-400 rounded-xl p-6 mb-4">
      <Ionicons name="search" size={20} color="white" className="mr-2" />
      <TextInput
        value={query}
        onChangeText={handleChange}
        placeholder="Search transactions..."
        placeholderTextColor="white/60"
        className="flex-1 text-white"
        autoCapitalize="none"
      />
    </View>
  );
}
