import { Text, View } from "react-native";
import CustomText from "../CustomText";

interface Transaction {
  id: string;
  date: string;
  type: string;
  description: string;
  amount: string;
  balance: string;
  isPositive: boolean;
}

export const TransactionHistory: React.FC = () => {
  const transactions: Transaction[] = [
    {
      id: "1",
      date: "Sun 23 Nov 2025",
      type: "Top up",
      description: "from debit card",
      amount: "+10,000",
      balance: "20,000",
      isPositive: true,
    },
    {
      id: "2",
      date: "",
      type: "Withdrawal",
      description: "to bank account",
      amount: "-10,000",
      balance: "20,000",
      isPositive: false,
    },
    {
      id: "3",
      date: "",
      type: "Online payment",
      description: "to Jumia Nigeria",
      amount: "-10,000",
      balance: "20,000",
      isPositive: false,
    },
    {
      id: "4",
      date: "Sun 23 Nov 2025",
      type: "Top up",
      description: "from bank account",
      amount: "+10,000",
      balance: "20,000",
      isPositive: true,
    },
  ];

  const renderDateHeader = (date: string) => (
    <View className="flex-row items-center mb-2">
      <CustomText className="ml-2 font-medium mb-4">{date}</CustomText>
    </View>
  );

  const renderTransaction = (transaction: Transaction) => (
    <View key={transaction.id}>
      {transaction.date ? renderDateHeader(transaction.date) : null}
      <View className="flex-row justify-between bg-primary-400 items-start mb-4 p-4 rounded-2xl">
        <View className="flex-1">
          <CustomText>{transaction.type}</CustomText>
          <CustomText secondary size="xs" className="mt-2">
            {transaction.description}
          </CustomText>
        </View>
        <View className="items-end">
          <CustomText
            size="xl"
            className={`font-semibold ${
              transaction.isPositive ? "text-green-200" : "text-error"
            }`}
          >
            {transaction.amount}
          </CustomText>
          <CustomText secondary size="xs" className="mt-1">
            Total Bal: N{transaction.balance}
          </CustomText>
        </View>
      </View>
    </View>
  );

  return (
    <View className="mb-6 ">
      <CustomText size="xl" className=" mb-4 ml-2" weight="bold">
        History
      </CustomText>
      <View>{transactions.map(renderTransaction)}</View>
    </View>
  );
};
