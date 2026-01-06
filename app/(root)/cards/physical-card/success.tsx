import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/app/components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import Header from "@/app/components/header-back";
import CustomText from "@/app/components/CustomText";

const PhysicalCardSuccess = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const selectedColor = (params.selectedColor as string) || "gold";

  return (
    <SafeAreaView className="flex-1 bg-primary-100 px-6">
      <View className="flex-row justify-start items-center  pb-6">
        <TouchableOpacity
          onPress={() => router.replace("/(root)/(tabs)/cards")}
        >
          <Ionicons name="close" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 justify-center items-center space-y-6">
        <Text className="text-8xl">🎉</Text>

        <CustomText
          size="xxxl"
          className="text-center leading-relaxed max-w-72 mt-4"
        >
          Your physical card is on the way!
        </CustomText>
        <CustomText
          size="xs"
          className="text-center leading-relaxed max-w-72 "
          secondary
        >
          Your card has been requested successfully
        </CustomText>

        <Text className="text-accent-100 text-center text-base leading-relaxed mt-4"></Text>
      </View>

      <View className="pb-6">
        <Button
          title="Ok"
          variant="primary"
          onPress={() =>
            router.replace({
              pathname: `/(root)/(tabs)/cards`,
              params: { hasCardphysical: "true", selectedColor,  },
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default PhysicalCardSuccess;
