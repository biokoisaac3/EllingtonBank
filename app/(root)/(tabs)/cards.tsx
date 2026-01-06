import React, { useState, useEffect } from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Image,
} from "react-native";
import { Tab, TabBar } from "@/app/components/tabs";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import CardHeader from "@/app/components/cards/CardHeader";
import VirtualCardSection from "@/app/components/cards/VirtualCardSection";
import CardSwitch from "@/app/components/cards/CardSwitch";
import CardContent from "@/app/components/cards/CardContent";
import { SafeAreaView } from "react-native-safe-area-context";
import CardActions from "@/app/components/cards/CardAction";
import { TransactionHistory } from "@/app/components/cards/Transactions";
import BottomSheet from "@/app/components/BottomSheet";
import WithdrawalContent from "@/app/components/cards/WithdrawalContent";
import BlockCardContent from "@/app/components/cards/lockCardContent";
import FundWalletContent from "@/app/components/cards/FundWallet";
import MoreInfoContent from "@/app/components/cards/MoreInfoContent";
import images from "@/app/assets/images";
import ChangePin from "@/app/components/cards/ChangePinContent";
import CustomText from "@/app/components/CustomText";
import Button from "@/app/components/Button";
import CardActivation from "@/app/components/cards/CardActivation";
import { fetchPhysicalCards, PhysicalCard } from "@/app/lib/thunks/cardsThunks";
import { RootState, AppDispatch } from "@/app/lib/store";

export default function Card() {
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState("virtual");
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [showWithdrawalSheet, setShowWithdrawalSheet] = useState(false);
  const [showFundSheet, setShowFundSheet] = useState(false);
  const [showBlockSheet, setShowBlockSheet] = useState(false);
  const [showPinSheet, setShowPinSheet] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [amount, setAmount] = useState("");
  const router = useRouter();

  const physicalCards: PhysicalCard[] = useSelector(
    (state: RootState) => state.cards.physicalCards || []
  );

  const {
    hasCardvirtual: queryHasCardvirtual,
    isActivated: queryIsActivated,
    selectedColor,
  } = useLocalSearchParams();

  const tabs: Tab[] = [
    { label: "Virtual Card", value: "virtual" },
    { label: "Physical Card", value: "physical" },
  ];

  const hasCardvirtual = queryHasCardvirtual === "true";
  const hasCardphysical = physicalCards.length > 0;
  const activeCard = physicalCards.find((card) => card.status === "Active");
  const isActivated = !!activeCard;

  const selectedColorStr = Array.isArray(selectedColor)
    ? selectedColor[0]
    : selectedColor;

  const PhysicalCard1 = images.physical_card_1;
  const PhysicalCard2 = images.physical_card_2;
  const PhysicalCard3 = images.physical_card_3;

  const cardImageMap: Record<string, any> = {
    gold: PhysicalCard1,
    white: PhysicalCard2,
    black: PhysicalCard3,
  };

  const cardImage = cardImageMap[(selectedColorStr as string) || "gold"];

  useEffect(() => {
    dispatch(fetchPhysicalCards({}));
  }, [dispatch]);

  useEffect(() => {
    if (hasCardphysical) {
      setActiveTab("physical");
    }
  }, [hasCardphysical]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setShowCardDetails(false);
  };

  const handleItemPress = (item: any) => {
    switch (item.id) {
      case "withdrawal":
        setShowWithdrawalSheet(true);
        break;
      case "fund":
        setShowFundSheet(true);
        break;
      case "block":
        setShowBlockSheet(true);
        break;
      case "pin":
        setShowPinSheet(true);
        break;
      case "more":
        setShowMore(true);
        break;
    }
  };

  const handleConfirmWithdrawal = () => {
    if (amount) {
      router.push(`/(root)/send-money/authorize?amount=${amount}`);
    }
    setShowWithdrawalSheet(false);
    setAmount("");
  };

  const handleCloseWithdrawal = () => {
    setShowWithdrawalSheet(false);
    setAmount("");
  };

  const handleConfirmFund = () => {
    router.push(`/(root)/fund-wallet/authorize?amount=${amount}`);
    setShowFundSheet(false);
    setAmount("");
  };

  const handleCloseFund = () => {
    setShowFundSheet(false);
    setAmount("");
  };

  const handleContinueFund = (reason: string) => {
    console.log("Funding reason:", reason);
  };

  const handleConfirmBlock = () => {
    router.push("/(root)/block-card/authorize");
    setShowBlockSheet(false);
  };

  const handleCloseBlock = () => {
    setShowBlockSheet(false);
  };

  const handleContinueBlock = (reason: string) => {
    console.log("Blocking reason:", reason);
  };

  const handleConfirmPin = () => {
    router.push("/(root)/cards/physical-card/pin/authorize");
    setShowPinSheet(false);
  };

  const handleClosePin = () => {
    setShowPinSheet(false);
  };

  const handleContinuePin = (reason: string) => {
    console.log("Change pin reason:", reason);
  };

  const handleCloseMore = () => {
    setShowMore(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-100 -mb-12">
      <CardHeader title="My Cards" />

      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {activeTab === "virtual" ? (
            hasCardvirtual ? (
              <>
                <VirtualCardSection
                  activeTab="virtual"
                  showCardDetails={showCardDetails}
                />
                <CardSwitch
                  value={showCardDetails}
                  onChange={setShowCardDetails}
                />
                <CardActions onItemPress={handleItemPress} />
                <TransactionHistory />
              </>
            ) : (
              <CardContent
                buttonTitle="Request virtual card"
                buttonRoute="/(root)/cards/virtual-card"
                sectionTitle="Why a Virtual Card?"
              />
            )
          ) : activeTab === "physical" ? (
            hasCardphysical ? (
              isActivated ? (
                <>
                  <View className="w-full items-center mb-8">
                    <Image
                      source={cardImage}
                      style={{
                        width: "100%",
                        height: 220,
                        resizeMode: "contain",
                      }}
                    />
                  </View>

                  <CardActions onItemPress={handleItemPress} physical={true} />
                </>
              ) : (
                <CardActivation
                  cardImage={cardImage}
                  selectedColor={selectedColorStr}
                />
              )
            ) : (
              <CardContent
                buttonTitle="Request physical card"
                buttonRoute="/(root)/cards/physical-card"
                sectionTitle="Track your physical card"
              />
            )
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomSheet
        visible={showWithdrawalSheet}
        onClose={handleCloseWithdrawal}
        onConfirm={handleConfirmWithdrawal}
        title="Withdraw Money"
        buttonText="Confirm"
      >
        <WithdrawalContent amount={amount} setAmount={setAmount} />
      </BottomSheet>

      <BottomSheet
        visible={showFundSheet}
        onClose={handleCloseFund}
        onConfirm={handleConfirmFund}
        title="Fund Wallet"
        buttonText="Top Up"
      >
        <FundWalletContent amount={amount} setAmount={setAmount} />
      </BottomSheet>

      <BottomSheet
        visible={showMore}
        onClose={handleCloseMore}
        title="Card details"
        hideshowButton
      >
        <MoreInfoContent />
      </BottomSheet>

      <BottomSheet
        visible={showBlockSheet}
        onClose={handleCloseBlock}
        onConfirm={handleConfirmBlock}
        title="Block Card"
        buttonText="Continue"
      >
        <BlockCardContent onContinue={handleContinueBlock} />
      </BottomSheet>

      <BottomSheet
        visible={showPinSheet}
        onClose={handleClosePin}
        onConfirm={handleConfirmPin}
        title="Change Pin"
        buttonText="Continue"
      >
        <ChangePin onContinue={handleContinuePin} />
      </BottomSheet>
    </SafeAreaView>
  );
}
