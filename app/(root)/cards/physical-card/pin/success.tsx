import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/app/components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import AmountCard from "@/app/components/home/cards/AmountCard";
import Header from "@/app/components/header-back";

const Success = () => {
  const router = useRouter();


  return (
    <SafeAreaView className="flex-1 bg-primary-100 px-6">
        <Header showCancel={true} showBack={false} title="" />

      <View className="flex-1 justify-center  space-y-6">
        <Text className="text-8xl text-center mt-10">🎉</Text>

        <Text className="text-3xl font-bold text-white leading-normal text-center mt-4 ">
          PIN changed successfully
        </Text>

        <Text className="text-accent-100 text-center text-base leading-relaxed mt-4">
          Your request was successful
        </Text>
      </View>

      <View className="pb-6">
        <Button
          title="Done"
          variant="primary"
          onPress={() =>
            router.replace({
              pathname: `/(root)/(tabs)/cards`,
              params: { hasCardphysical: "true" },
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Success;
