import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { Share } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Button from "@/app/components/Button";
import { Tab, TabBar } from "@/app/components/tabs";

const REFERRAL_CODE = "RINGGNRNOKS";

const ReferralScreen = () => {
  const [activeTab, setActiveTab] = useState("home");
  const tabs: Tab[] = [
    { label: "Home", value: "home" },
    { label: "Details", value: "details" },
  ];

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(REFERRAL_CODE);
    Alert.alert("Copied!", "Referral code copied to clipboard");
  };

  const shareReferral = async () => {
    const message = `Join me on [App Name] and use my referral code ${REFERRAL_CODE} to get started! Earn free ₦300.`;
    try {
      await Share.share({ message });
    } catch (error) {
      console.log(error);
    }
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Join me on [App Name] and use my referral code ${REFERRAL_CODE} to get started! Earn free ₦300.`
    );
    Linking.openURL(`whatsapp://send?text=${message}`).catch(() => {
      Alert.alert("Error", "WhatsApp is not installed");
    });
  };

  const openSMS = () => {
    const message = encodeURIComponent(
      `Join me on [App Name] and use my referral code ${REFERRAL_CODE} to get started! Earn free ₦300.`
    );
    Linking.openURL(`sms:?body=${message}`).catch(() => {
      Alert.alert("Error", "Cannot open SMS");
    });
  };

  const showComingSoon = () => {
    Alert.alert("Coming Soon", "This feature will be available soon!");
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#3D4020" }}>
      {/* Header */}
      <View className="px-4 pt-4">
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={() => console.log("Go back")}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-semibold">Referral</Text>
          <View style={{ width: 28 }} />
        </View>

        <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === "home" ? (
          <>
            <View className="mb-2 mt-2">
              <LinearGradient
                colors={["#2C2F1A", "#1A1C10"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  borderRadius: 24,
                  padding: 20,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 80, marginBottom: 8 }}>🎁</Text>
                <Text
                  className="text-white font-bold text-center mb-3"
                  style={{ fontSize: 24 }}
                >
                  Earn free ₦300
                </Text>
                <Text
                  className="text-center"
                  style={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: 14,
                    lineHeight: 20,
                  }}
                >
                  Receive ₦300 for every new person you refer. Plus, earn ₦10 on
                  every transaction they make.
                </Text>
              </LinearGradient>
            </View>

            <View className="rounded-2xl mt-2 mb-6">
              <Text
                className="text-white font-semibold mb-4"
                style={{ fontSize: 16 }}
              >
                Referral code
              </Text>
              <TouchableOpacity
                className="flex-row items-center justify-center gap-4 rounded-xl p-4 border border-primary-300"
                onPress={copyToClipboard}
              >
                <Text
                  className="text-white font-bold"
                  style={{ fontSize: 18, letterSpacing: 1 }}
                >
                  {REFERRAL_CODE}
                </Text>
                <Ionicons name="copy-outline" size={20} color="#fff" />
              </TouchableOpacity>
              <Text
                className="text-center  tex-sm text-accent-100 mt-2"
                style={{}}
              >
                Click to copy
              </Text>
            </View>

            <View className="mb-6">
              <Text
                className="text-white font-semibold mb-4"
                style={{ fontSize: 16 }}
              >
                Share with
              </Text>
              <View className="flex-row justify-between ">
                <TouchableOpacity
                  onPress={openWhatsApp}
                  className="items-center"
                  style={{ width: 70 }}
                >
                  <View
                    className="items-center justify-center mb-2 bg-primary-300"
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 16,
                    }}
                  >
                    <Ionicons name="logo-whatsapp" size={24} color="#fff" />
                  </View>
                  <Text className="text-sm color-accent-100">WhatsApp</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={openSMS}
                  className="items-center"
                  style={{ width: 70 }}
                >
                  <View
                    className="items-center justify-center mb-2 bg-primary-300"
                    style={{
                      width: 60,
                      height: 60,

                      borderRadius: 16,
                    }}
                  >
                    <Ionicons
                      name="chatbubble-ellipses-outline"
                      size={24}
                      color="#fff"
                    />
                  </View>
                  <Text className="text-sm color-accent-100">SMS</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={shareReferral}
                  className="items-center"
                  style={{ width: 70 }}
                >
                  <View
                    className="items-center justify-center mb-2 bg-primary-300"
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 16,
                    }}
                  >
                    <Ionicons name="share-outline" size={24} color="#fff" />
                  </View>
                  <Text className="text-sm color-accent-100">Share</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={copyToClipboard}
                  className="items-center"
                  style={{ width: 70 }}
                >
                  <View
                    className="items-center justify-center mb-2 bg-primary-300"
                    style={{
                      width: 60,
                      height: 60,

                      borderRadius: 16,
                    }}
                  >
                    <Ionicons name="link-outline" size={24} color="#fff" />
                  </View>
                  <Text className="text-sm color-accent-100">Copy</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="mb-8">
              <Text
                className="text-center mb-4"
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: 14,
                }}
              >
                Need to see how you've performed?
              </Text>

              <Button
                title=" View referral details"
                variant="primary"
                onPress={showComingSoon}
              />
            </View>
          </>
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-white text-xl font-semibold">
              Coming Soon
            </Text>
            <Text
              className="text-center mt-2"
              style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: 14 }}
            >
              Referral details will be available soon
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReferralScreen;
export { TabBar };
