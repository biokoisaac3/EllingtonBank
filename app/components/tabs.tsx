import { Pressable, View } from "react-native";
import CustomText from "./CustomText";

interface Tab {
  label: string;
  value: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <View className="flex-row items-center justify-center  border-b border-primary-400">
      {tabs.map((tab) => (
        <Pressable
          key={tab.value}
          onPress={() => onTabChange(tab.value)}
          style={{
            paddingBottom: 8,
            borderBottomWidth: activeTab === tab.value ? 2 : 0,
            borderBottomColor: "#63642A",
          }}
        >
          <CustomText
            weight="medium"
            size="base"
            secondary={activeTab !== tab.value} 
            className="px-6 text-center"
          >
            {tab.label}
          </CustomText>
        </Pressable>
      ))}
    </View>
  );
};

export { TabBar, Tab };
