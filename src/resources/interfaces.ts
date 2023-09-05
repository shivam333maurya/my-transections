export interface TransactionDataType {
  key: React.Key;
  name: string;
  date: string;
  invoiceNo: string;
  payer: string;
  payee: string;
  amount: number;
  usdEquivalent: number;
  status: string;
}
