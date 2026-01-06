import { ImageSourcePropType } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Images from "../../../assets/images"; 
import { AccountInfo } from "@/app/lib/thunks/accountThunks";

export interface ActionButton {
  icon: keyof typeof Ionicons.glyphMap | keyof typeof MaterialIcons.glyphMap;
  label: string;
  iconLibrary: "Ionicons" | "MaterialIcons";
  onPress?: () => void;
}

export interface CardData {
  id: number;
  title: string;
  balance: string;
  cardNumber?: string;
  displayCardNumber?: string;
  gradientColors: [string, string];
  image: ImageSourcePropType;
  imagePosition?: "bottom-right" | "top-right";
  actions?: ActionButton[];
}

export const getCardsData = (accountInfo?: AccountInfo | null): CardData[] => {
  console.log(accountInfo)
const firstCardBalance =
  accountInfo?.accountBalance !== undefined &&
  accountInfo.accountBalance !== null
    ? accountInfo.accountBalance.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "0.00";


  const firstCardAccountNumber = accountInfo?.accountNumber || "";
  const firstCardDisplayNumber = firstCardAccountNumber
    ? `${firstCardAccountNumber.substring(0, 5)}****`
    : "";

  return [
    {
      id: 1,
      title: "Available balance",
      balance: firstCardBalance,
      cardNumber: firstCardAccountNumber,
      displayCardNumber: firstCardDisplayNumber,
      gradientColors: ["#181905", "#515220"],
      image: Images.landing_balance_card1,
      actions: [
        {
          icon: "arrow-forward",
          label: "Transfer",
          iconLibrary: "Ionicons",
        },
        {
          icon: "account-balance",
          label: "Accounts",
          iconLibrary: "MaterialIcons",
        },
      ],
    },
    {
      id: 2,
      title: "Total savings",
      balance: "0.00",
      gradientColors: ["#333419", "#18180C"],
      imagePosition: "top-right",
      image: Images.landing_balance_card2,
      actions: [
        {
          icon: "arrow-forward",
          label: "Create Plan",
          iconLibrary: "Ionicons",
        },
        {
          icon: "account-balance",
          label: "View plans",
          iconLibrary: "MaterialIcons",
        },
      ],
    },
    {
      id: 3,
      title: "Investment portfolio",
      balance: "0.00",
      gradientColors: ["#333419", "#18180C"],
      imagePosition: "top-right",
      image: Images.landing_balance_card3,
      actions: [
        {
          icon: "wallet",
          label: "Wallet",
          iconLibrary: "Ionicons",
        },
      ],
    },
  ];
};
