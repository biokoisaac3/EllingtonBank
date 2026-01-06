import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/app/components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import CustomText from "@/app/components/CustomText";

const RegistrationSuccessScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-primary-100 px-6">
      <View className="flex-row justify-start items-center pt-4 pb-6">
        <TouchableOpacity onPress={() => router.replace("/(root)/(tabs)")}>
          <Ionicons name="close" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 justify-center items-center space-y-6">
        <Text className="text-8xl">🎉</Text>

        <CustomText className="max-w-72 text-center mt-6" size="xxxl"> KYC registered successful</CustomText>
        <CustomText secondary size="sm" className="text-center"> Thank you for your time</CustomText>

      
      </View>

      <View className="pb-6">
        <Button
          title="Ok"
          variant="primary"
          onPress={() =>
            router.replace({
              pathname: `/(root)/(tabs)`,
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default RegistrationSuccessScreen;
