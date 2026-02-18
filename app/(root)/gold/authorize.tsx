import React, { useEffect, useState } from "react";
import { View, StatusBar, Vibration } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import Header from "@/app/components/header-back";
import OtpInput from "@/app/components/inputs/OtpInput";
import Numpad from "@/app/components/inputs/Numpad";
import Loading from "@/app/components/Loading";
import CustomText from "@/app/components/CustomText"; 
import { useAppDispatch } from "@/app/lib/hooks/useAppDispatch";
import { buyGold } from "@/app/lib/thunks/goldThunks";

const toNumber = (s: string) => Number((s || "").replace(/,/g, "")) || 0;

export default function AuthorizeGold() {
  const params = useLocalSearchParams<Record<string, string>>();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (passcode.length !== 4) return;

    const t = setTimeout(() => {
      setLoading(true);
      setError(false);
      setErrorMessage("");

      const payload: any = {
        amount_ngn: toNumber(params.amountRaw || params.amount || "0"),
        // amount_grams: Number(params.grams || 0),
        transaction_pin: passcode,
      };

      dispatch(buyGold(payload) as any)
        .unwrap()
        .then(() => {
          router.replace({
            pathname: "/(root)/gold/success",
            params: { amount: String(params.amount || "0") },
          });
        })
        .catch((err: any) => {
          setError(true);
          setErrorMessage(err?.message || String(err) || "Transaction failed");
          Vibration.vibrate(400);
          setPasscode("");
        })
        .finally(() => setLoading(false));
    }, 200);

    return () => clearTimeout(t);
  }, [
    passcode,
    dispatch,
    router,
    params.amount,
    params.amountRaw,
    params.grams,
  ]);

  return (
    <SafeAreaView className="flex-1 bg-primary-100">
      <StatusBar barStyle="light-content" />
      <Header title="Authorize" />

      <Loading visible={loading} />

      <View className="flex-1 justify-between px-6 pb-12">
        <View className="mt-12">
          <CustomText size="base" className="mb-8">
            Enter your PIN
          </CustomText>

          <OtpInput
            digitCount={4}
            value={passcode}
            onChange={(value) => setPasscode(value.slice(0, 4))}
            error={error}
            autoFocus={false}
            secure={true}
            inputStyle="w-20 h-20"
          />

          {error ? (
            <CustomText
              className="text-red-500 mt-4 mb-0"
              size="sm"
              weight="medium"
            >
              {errorMessage || "Transaction failed. Please try again."}
            </CustomText>
          ) : null}
        </View>

        <Numpad
          onPress={(n) => {
            if (loading) return;
            if (passcode.length < 4) setPasscode((p) => p + n);
          }}
          onDelete={() => setPasscode((p) => p.slice(0, -1))}
        />
      </View>
    </SafeAreaView>
  );
}
