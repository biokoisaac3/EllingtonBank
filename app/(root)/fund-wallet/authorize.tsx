import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  Vibration,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import Header from "@/app/components/header-back";
import OtpInput from "@/app/components/inputs/OtpInput";
import Numpad from "@/app/components/inputs/Numpad";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/lib/store";
import { fundVirtualCard } from "@/app/lib/thunks/virtualCardsThunks";

export default function AuthorizePayment() {
  const dispatch = useDispatch<AppDispatch>();
  const params = useLocalSearchParams();
  const router = useRouter();

  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState<string | null>(null); // <-- string
  const [loading, setLoading] = useState(false);

  // Remove commas and convert amount to number
  const rawAmount = Array.isArray(params.amount)
    ? params.amount[0]
    : params.amount;
  const amount = Number(String(rawAmount).replace(/,/g, ""));

  const source = Array.isArray(params.source)
    ? params.source[0]
    : params.source; // 'wallet' | 'virtual-<id>'

  const handleNumberPress = (num: string) => {
    if (passcode.length < 4) setPasscode((prev) => prev + num);
    setError(null);
  };

  const handleDelete = () => {
    setPasscode((prev) => prev.slice(0, -1));
    setError(null);
  };

  useEffect(() => {
    if (passcode.length === 4) {
      const t = setTimeout(async () => {
        if (!amount || !source) return;

        setLoading(true);
        setError(null);

        try {
          if (source.startsWith("virtual-")) {
            // Extract card ID and convert to number
            const cardIdStr = source.split("-")[1];
            const cardId = Number(cardIdStr);

            if (isNaN(cardId)) {
              throw new Error("Invalid card ID");
            }

            // Call API with real transaction pin
            await dispatch(
              fundVirtualCard({
                cardId,
                amount,
                transactionPin: passcode,
              })
            ).unwrap();
          } else if (source === "wallet") {
            // TODO: Add wallet top-up logic here if needed
          }

         router.replace({
           pathname: "/(root)/fund-wallet/success",
           params: {
             amount: amount,
           },
         });
;
        } catch (err: any) {
          console.error("Authorization failed:", err);

          // Check if it's a Redux rejected value (API message)
          if (err && typeof err === "string") {
            setError(err);
          } else if (err?.message) {
            setError(err.message);
          } else {
            setError("Unable to complete request. Please try again");
          }

          Vibration.vibrate(400);
        } finally {
          setLoading(false);
          setPasscode(""); // Reset pin input
        }
      }, 300);

      return () => clearTimeout(t);
    }
  }, [passcode, amount, source, dispatch, router]);

  return (
    <SafeAreaView className="flex-1 bg-primary-100">
      <StatusBar barStyle="light-content" />

      <Header title="Authorize" />

      <View className="flex-1 justify-between px-6 pb-12">
        <View className="mt-12">
          <Text className="text-white text-base mb-8">
            Enter your Transaction Pin
          </Text>

          <OtpInput
            value={passcode}
            onChange={setPasscode}
            error={!!error}
            secure
            autoFocus={false} // prevent automatic focus
            showSoftInputOnFocus={false} // prevent keyboard from showing
            caretHidden={true} // optional: hide caret
            inputStyle="w-20 h-20"
            digitCount={4}
          />

          {error && <Text className="text-red-500 text-sm mt-4">{error}</Text>}

          {loading && (
            <View className="mt-4 flex-row items-center justify-center">
              <ActivityIndicator size="small" color="#FFD700" />
              <Text className="text-white ml-2">Processing...</Text>
            </View>
          )}
        </View>

        <Numpad onPress={handleNumberPress} onDelete={handleDelete} />
      </View>
    </SafeAreaView>
  );
}
