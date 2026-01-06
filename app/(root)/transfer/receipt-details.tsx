import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Share,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Button from "@/app/components/Button";
import { captureRef } from "react-native-view-shot";
import BottomSheet from "@/app/components/BottomSheet";
import { useAppSelector } from "@/app/lib/hooks/useAppSelector";

export default function ReceiptDetails() {
  const params = useLocalSearchParams();
  const fullViewRef = useRef<View>(null);
  const [shareBottomSheetVisible, setShareBottomSheetVisible] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  let transferResult;
  try {
    transferResult = JSON.parse(params.transferResult as string);
  } catch {
    transferResult = null;
  }

  if (!transferResult) return <Text>No transfer details available.</Text>;

  const receiptData = {
    amount: transferResult.amount,
    type: "Debit",
    status: transferResult.status,
    sender: user?.first_name,
    senderBank: transferResult.senderBank || "Ellington Bank",
    beneficiary: transferResult.beneficiaryName,
    beneficiaryAccount: transferResult.beneficiaryAccount,
    beneficiaryBank: transferResult.beneficiaryBankName,
    date: new Date(transferResult.date).toLocaleString(),
    remark: transferResult.remark,
    referenceNo: transferResult.transactionReference,
  };

  const handleSharePress = () => setShareBottomSheetVisible(true);
  const closeBottomSheet = () => setShareBottomSheetVisible(false);

  const shareAsImage = async () => {
    try {
      if (!fullViewRef.current) return;

      const uri = await captureRef(fullViewRef.current, {
        format: "png",
        quality: 1,
        result: "tmpfile",
      });

      await Share.share({
        url: `file://${uri}`,
        message: `Transfer Receipt\nAmount: ₦${receiptData.amount}\nTo: ${receiptData.beneficiary}\nReference: ${receiptData.referenceNo}`,
      });

      closeBottomSheet();
    } catch (error) {
      console.error("Error sharing image:", error);
      Alert.alert("Error", "Failed to capture and share image.");
    }
  };

  const ReceiptRow = ({
    label,
    value,
    highlight = false,
  }: {
    label: string;
    value: string;
    highlight?: boolean;
  }) => (
    <View className="flex-row justify-between items-center py-4 border-b border-primary-300">
      <Text className="text-accent-100 text-sm">{label}</Text>
      <Text
        className={`text-sm font-semibold max-w-44 ${
          label === "Status" && value === "SUCCESSFUL"
            ? "text-green-200 bg-green-100 rounded-xl px-2 py-1"
            : highlight
            ? "text-accent-100"
            : "text-white"
        }`}
      >
        {value}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-primary-100">
      <StatusBar barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24 }}
      >
        {/* THIS PART IS CAPTURED */}
        <View ref={fullViewRef} collapsable={false}>
          <Image
            source={require("../../assets/logo1.png")}
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
          />

          <LinearGradient
            colors={["#212207", "#515220"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              padding: 24,
              borderRadius: 16,
              overflow: "hidden",
              marginTop: 16,
            }}
          >
            <Image
              source={require("../../assets/card-1.png")}
              style={{ position: "absolute", top: 0, right: 0, width: 80 }}
              resizeMode="contain"
            />
            <Text className="text-2xl font-bold text-white mb-1">
              ₦{receiptData.amount}
            </Text>
            <Text className="text-sm text-white/60">{receiptData.type}</Text>
          </LinearGradient>

          <View className="bg-primary-400 rounded-2xl p-6 mt-4">
            <ReceiptRow label="Status" value={receiptData.status} highlight />
            <ReceiptRow label="Sender" value={user?.first_name as any} />
            <ReceiptRow label="Sender bank" value={receiptData.senderBank} />
            <ReceiptRow label="Beneficiary" value={receiptData.beneficiary} />
            <ReceiptRow
              label="Beneficiary account"
              value={receiptData.beneficiaryAccount}
            />
            <ReceiptRow
              label="Beneficiary bank"
              value={receiptData.beneficiaryBank}
            />
            <ReceiptRow label="Date" value={receiptData.date} />
            <ReceiptRow label="Remark" value={receiptData.remark} />

            <View className="flex-row justify-between items-center py-4">
              <Text className="text-accent-100 text-sm">Reference No.</Text>
              <View className="flex-row items-center">
                <Text className="text-white text-base font-semibold mr-2 max-w-44">
                  {receiptData.referenceNo}
                </Text>
                <TouchableOpacity>
                  <Ionicons name="copy-outline" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* THIS PART IS NOT CAPTURED */}
        <View className="px-0 pb-6 mt-6 mb-8">
          <Button
            title="Share receipt"
            variant="secondary"
            onPress={handleSharePress}
            className="rounded-2xl flex-row justify-center"
            icon={<Ionicons name="share-outline" size={20} color="#2a2a1a" />}
          />
        </View>
      </ScrollView>

      {/* Bottom Sheet */}
      <BottomSheet
        visible={shareBottomSheetVisible}
        onClose={closeBottomSheet}
        title="Share Receipt"
        hideshowButton
      >
        <TouchableOpacity
          className="flex-row items-center justify-center py-4"
          onPress={shareAsImage}
        >
          <Ionicons name="image-outline" size={24} color="#FFF" />
          <Text className="text-lg font-semibold text-white ml-2">Image</Text>
        </TouchableOpacity>
      </BottomSheet>
    </SafeAreaView>
  );
}

