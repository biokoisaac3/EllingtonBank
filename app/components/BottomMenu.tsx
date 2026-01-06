import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
  Dimensions,
  Image,
  Animated,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../lib/store"; // Adjust the import path to your store file where AppDispatch is exported
import { logoutUser } from "../lib/thunks/authThunks";
import { useRouter } from "expo-router";

interface MenuItem {
  id: string;
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress?: () => void;
}

interface UserProfile {
  avatarColor?: string;
  name: string;
  email: string;
  avatar?: string;
}

interface BottomMenuProps {
  visible: boolean;
  onClose: () => void;
  user: UserProfile;
  items?: MenuItem[];
  version: string;
}

// User profile display
const UserProfileSection: React.FC<UserProfile> = ({
  name,
  email,
  avatar = "https://i.pravatar.cc/100",
}) => (
  <View className="flex-row items-center mb-10 py-4 gap-3">
    <View className="w-12 h-12 rounded-full overflow-hidden bg-red-500">
      <Image
        source={{ uri: avatar }}
        className="w-full h-full"
        resizeMode="cover"
      />
    </View>
    <View>
      <Text className="text-white text-base">{name}</Text>
      <Text className="text-white/80 text-sm">{email}</Text>
    </View>
  </View>
);

const BottomMenu: React.FC<BottomMenuProps> = ({
  visible,
  onClose,
  user,
  items = [],
  version = "3.11",
}) => {
  const screenHeight = Dimensions.get("window").height;
  const [slideAnim] = useState(new Animated.Value(screenHeight));
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()

  const defaultListItems: MenuItem[] = [
    // {
    //   id: "1",
    //   label: "Bank account details",
    //   icon: "bank",
    //   onPress: () => console.log("Bank account details"),
    // },
    {
      id: "2",
      label: "Account settings",
      icon: "cog",
      onPress: () => router.push("/(root)/account-settings"),
    },
    // {
    //   id: "3",
    //   label: "Request bank statement",
    //   icon: "file-document",
    //   onPress: () => console.log("Request bank statement"),
    // },
    // {
    //   id: "4",
    //   label: "Rate us",
    //   icon: "star",
    //   onPress: () => console.log("Rate us"),
    // },
  ];

  const displayListItems = items.length > 0 ? items : defaultListItems;

  // Animate when visible changes
  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(screenHeight);
    }
  }, [visible]);

  const handleItemPress = (item: MenuItem) => {
    item.onPress?.();
    onClose();
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    router.replace("/(auth)/current-user")
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Pressable className="flex-1 bg-black/50 justify-end" onPress={onClose}>
        <View className="flex-1 justify-end">
          <Pressable onPress={(e) => e.stopPropagation()}>
            <Animated.View
              className="bg-primary-100 rounded-t-[32px] overflow-hidden"
              style={{
                transform: [{ translateY: slideAnim }],
                height: screenHeight * 0.9,
              }}
            >
              <View className=" rounded-t-[32px] px-6 py-4">
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-white text-xl">Menu</Text>
                  <Pressable
                    onPress={onClose}
                    className="p-2 rounded-full bg-primary-500"
                  >
                    <MaterialCommunityIcons
                      name="close"
                      size={24}
                      color="#FFFFFF"
                    />
                  </Pressable>
                </View>
                <UserProfileSection {...user} />
              </View>

              <ScrollView className="flex-1 px-4">
                <View className="bg-primary-400 rounded-2xl overflow-hidden mt-2">
                  {displayListItems.map((item, index) => (
                    <Pressable
                      key={item.id}
                      onPress={() => handleItemPress(item)}
                      className={`flex-row items-center px-6 py-4 border-b border-white/10 ${
                        index === displayListItems.length - 1
                          ? "border-b-0"
                          : ""
                      }`}
                    >
                      <MaterialCommunityIcons
                        name={item.icon}
                        size={24}
                        color="#FFFFFF"
                      />
                      <Text className="text-white text-base flex-1 ml-4">
                        {item.label}
                      </Text>
                      <MaterialCommunityIcons
                        name="chevron-right"
                        size={20}
                        color="#FFFFFF"
                      />
                    </Pressable>
                  ))}
                </View>

                <View className="bg-primary-400 rounded-2xl overflow-hidden mt-6">
                  <Pressable
                    onPress={handleLogout}
                    className="flex-row items-center px-6 py-4"
                  >
                    <MaterialCommunityIcons
                      name="logout"
                      size={24}
                      color="#FFFFFF"
                    />
                    <Text className="text-white text-base flex-1 ml-4">
                      Logout
                    </Text>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={20}
                      color="#FFFFFF"
                    />
                  </Pressable>
                </View>

                <Text className="text-accent-100 text-sm px-6 pt-8 pb-8">
                  Version {version}
                </Text>
              </ScrollView>
            </Animated.View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

export default BottomMenu;
