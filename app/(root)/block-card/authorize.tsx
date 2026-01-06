import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Vibration,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/app/components/header-back";
import OtpInput from "@/app/components/inputs/OtpInput";
import Numpad from "@/app/components/inputs/Numpad";

export default function AuthorizePayment() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);

  const handleNumberPress = (num: string) => {
    if (passcode.length < 4) {
      setPasscode((prev) => {
        const next = prev + num;
        setError(false);
        return next;
      });
    }
  };

  const handleDelete = () => {
    setPasscode((prev) => prev.slice(0, -1));
    setError(false);
  };

  useEffect(() => {
    if (passcode.length === 4) {
      const t = setTimeout(() => {
        if (passcode === "1234") {
          router.replace({
            pathname: "/(root)/block-card/success",
            params: params,
          });
        } else {
          setError(true);
          Vibration.vibrate(400);
          setPasscode("");
        }
      }, 300);

      return () => clearTimeout(t);
    }
  }, [passcode]);

  return (
    <SafeAreaView className="flex-1 bg-primary-100">
      <StatusBar barStyle="light-content" />

      <Header title="Authorize" />

      <View className="flex-1 justify-between px-6 pb-12">
        <View className="mt-12">
          <Text className="text-white text-base mb-8">Enter your Pin</Text>

          <OtpInput
            digitCount={4}
            value={passcode}
            onChange={(value) => {
              setPasscode(value.slice(0, 4));
              setError(false);
            }}
            error={error}
            autoFocus={false}
            secure={true}
            inputStyle="w-20 h-20"
          />

          {error && (
            <Text className="text-red-500 text-sm mt-4">
              Incorrect passcode. Please try again.
            </Text>
          )}
        </View>

        <Numpad onPress={handleNumberPress} onDelete={handleDelete} />
      </View>
    </SafeAreaView>
  );
}
