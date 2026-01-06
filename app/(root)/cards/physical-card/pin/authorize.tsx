import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";
import Button from "@/app/components/Button";
import OtpInput from "@/app/components/inputs/OtpInput";
import Loading from "@/app/components/Loading";
import InfoText from "@/app/components/InfoText";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/lib/store";

import Header from "@/app/components/header-back";

const EmailOtpScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { email, phone } = useLocalSearchParams();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (otp.length !== 6) return setError(true);

    setLoading(true);
    try {
      router.replace("/(root)/cards/physical-card/pin/change-pin");
    } catch {
      setError(true);
      // Alert.alert("Invalid Code", "Code incorrect. Retry.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-primary-100 px-6">
        <KeyboardAvoidingView behavior="padding" className="flex-1">
          <Header showCancel={true} showBack={false} title="Authorise" />

          <View className="flex-1 space-y-6">
            <Text className="text-2xl font-bold text-white">Enter code</Text>

            <Text className="text-accent-100 text-base leading-relaxed mt-4 mb-10">
              We’ve sent you a 6-digit code number to your email address.
            </Text>

            <OtpInput
              digitCount={6}
              value={otp}
              onChange={setOtp}
              error={error}
              autoFocus
            />

            {error && (
              <Text className="text-red-500 mt-2 text-sm font-semibold">
                Incorrect code. Try again.
              </Text>
            )}

            <InfoText
              text="Code not received?"
              actionText="Send again"
              onPress={handleResend}
            />
          </View>

          <View className="pb-2">
            <Button
              title="Verify"
              variant="primary"
              onPress={handleVerify}
              disabled={otp.length !== 6}
              className="w-full"
            />
          </View>

          <Loading visible={loading} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default EmailOtpScreen;
