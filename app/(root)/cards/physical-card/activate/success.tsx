import React from "react";
import { View, Text } from "react-native";
import Button from "@/app/components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import Header from "@/app/components/header-back";

const Success = () => {
  const params = useLocalSearchParams();
  const router = useRouter();

  const selectedColorStr = Array.isArray(params.selectedColor)
    ? params.selectedColor[0]
    : params.selectedColor;

  return (
    <SafeAreaView className="flex-1 bg-primary-100 px-6">
      <Header showCancel={true} showBack={false} title="" />

      <View className="flex-1 justify-center  space-y-6">
        <Text className="text-8xl text-center mt-10">🎉</Text>

        <Text className="text-3xl font-bold text-white leading-normal text-center mt-4 ">
          PIN Create Successfully
        </Text>

        <Text className="text-accent-100 text-center text-base leading-relaxed mt-4">
          Well done, Olamide,! You have created a PIN for your card successfully
        </Text>
      </View>

      <View className="pb-6">
        <Button
          title="Ok"
          variant="primary"
          onPress={() =>
            router.replace({
              pathname: `/(root)/(tabs)/cards`,
              params: {
                hasCardphysical: "true",
                isActivated: "true",
                selectedColor: selectedColorStr,
              },
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Success;
