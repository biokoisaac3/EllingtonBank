interface Transaction {
  id: string;
  type: "transfer" | "airtime" | "received" | "sent";
  name: string;
  number: string;
  amount: number;
  date: string;
  status?: "successful" | "pending" | "failed";
  remark?: string;
  fee?: number;
  sender?: string;
  senderBank?: string;
  beneficiary?: string;
  beneficiaryAccount?: string;
  beneficiaryBank?: string;
  reference?: string;
}
export { Transaction };
