import Button from "@/app/components/Button";
import {
  Dropdown,
  DropdownOption,
} from "@/app/components/inputs/DropdownInputs";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GenderDropdownExample() {
  const [gender, setGender] = useState("");
  const router = useRouter();
  const handleBack = () => router.back();

  const genderOptions: DropdownOption[] = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];
  const handleContinue = () => {
    router.push("/(auth)/facial-verification");
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-100">
      <View className="flex-row items-center justify-between px-4 pt-4 pb-6">
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="close" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <View className="px-6 flex-1 justify-between">
        <View>
          <Text className="text-white text-2xl font-bold mb-8">
            Select your gender
          </Text>

          <Dropdown
            label="Gender"
            placeholder="Select"
            options={genderOptions}
            selectedValue={gender}
            onSelect={setGender}
            searchable={true}
          />
        </View>
        <Button
          title="Continue"
          variant="primary"
          className="w-full"
          onPress={handleContinue}
        />
      </View>
    </SafeAreaView>
  );
}
