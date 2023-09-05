import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TransactionDataType } from "../../resources/interfaces";
import { transactionDetails } from "../../resources/helper";

interface StateProps {
  data: TransactionDataType[];
  transactionDetails: TransactionDataType;
}

const initialState: StateProps = {
  data: [],
  transactionDetails: transactionDetails,
};

export const TransactionSlice = createSlice({
  name: "transaction",
  initialState: initialState,
  reducers: {
    updateTransaction: (
      state,
      actions: PayloadAction<TransactionDataType[]>
    ) => {
      return { ...state, data: actions.payload };
    },
    updateTransactionDetails: (
      state,
      actions: PayloadAction<TransactionDataType>
    ) => {
      console.log({ actions });
      return { ...state, transactionDetails: actions.payload };
    },
  },
});

export const { updateTransaction, updateTransactionDetails } =
  TransactionSlice.actions;

export default TransactionSlice.reducer;
