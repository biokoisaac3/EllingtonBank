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
import { useDispatch } from "react-redux";
import Header from "@/app/components/header-back";
import OtpInput from "@/app/components/inputs/OtpInput";
import Numpad from "@/app/components/inputs/Numpad";
import { requestPhysicalCard } from "@/app/lib/thunks/cardsThunks";

export default function AuthorizePayment() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log("Params:", params);

  const handleNumberPress = (num: string) => {
    if (passcode.length < 4 && !isLoading) {
      setPasscode((prev) => {
        const next = prev + num;
        setError(false);
        setApiError(null);
        return next;
      });
    }
  };

  const handleDelete = () => {
    if (!isLoading) {
      setPasscode((prev) => prev.slice(0, -1));
      setError(false);
      setApiError(null);
    }
  };

  useEffect(() => {
    if (passcode.length === 4 && !isLoading) {
      const t = setTimeout(async () => {
        console.log("Timeout executed - passcode:", passcode);
        setIsLoading(true);
        console.log("Constructing payload with PIN");
        const brand = (params.brand as string) || "verve";
        const type = (brand.charAt(0).toUpperCase() +
          brand.slice(1).toLowerCase()) as "Verve" | "Mastercard" | "Visa";

        const address1 = params.address1 as string;
        const city =
          (params.city as string).charAt(0).toUpperCase() +
          (params.city as string).slice(1).toLowerCase();
        const state =
          (params.state as string).charAt(0).toUpperCase() +
          (params.state as string).slice(1).toLowerCase();
        const firstName = params.firstName as string;
        const lastName = params.lastName as string;

        const address = `${address1}, ${city}, ${state}, Nigeria`;

        const selectedColor = (params.selectedColor as string) || "White";
        const color =
          selectedColor.charAt(0).toUpperCase() +
          selectedColor.slice(1).toLowerCase();

        const payload = {
          type,
          deliveryOption: "Home Delivery",
          address,
          transactionPin: passcode,
          billingAddress: address1,
          color,
          billingCity: city,
          billingCountry: "Nigeria",
          billingState: state,  
        };

        console.log("Payload constructed:", payload);
        try {
          console.log("Dispatching requestPhysicalCard");
          const result = await (dispatch as any)(
            requestPhysicalCard(payload)
          ).unwrap();
          console.log("Thunk succeeded - result:", result);
          router.push({
            pathname: "/(root)/cards/physical-card/success",
            params: { ...params },
          });
        } catch (err: unknown) {
          console.log("Thunk failed - err:", err);
          const errorMessage =
            typeof err === "string"
              ? err
              : err instanceof Error
              ? err.message
              : "Failed to request physical card. Please try again.";
          setApiError(errorMessage);
          Vibration.vibrate(400);
          setPasscode("");
          setError(false);
        } finally {
          setIsLoading(false);
        }
      }, 300);
      return () => {
        console.log("Cleaning up timeout");
        clearTimeout(t);
      };
    }
  }, [passcode, dispatch, router, params]);

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
              if (!isLoading) {
                setPasscode(value.slice(0, 4));
                setError(false);
                setApiError(null);
              }
            }}
            error={error || !!apiError}
            autoFocus={false}
            secure={true}
            inputStyle="w-20 h-20"
          />
          {error && (
            <Text className="text-red-500 text-sm mt-4">
              Incorrect passcode. Please try again.
            </Text>
          )}
          {apiError && (
            <View className="mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <Text className="text-red-500 text-sm">{apiError}</Text>
            </View>
          )}
        </View>
        <Numpad
          onPress={handleNumberPress}
          onDelete={handleDelete}
          disabled={isLoading}
        />
      </View>
    </SafeAreaView>
  );
}
