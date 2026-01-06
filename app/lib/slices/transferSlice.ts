import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  performIntraBankTransfer,
  performInterBankTransfer,
} from "../thunks/transferThunks";

export interface TransferResult {
  transactionReference?: string;
  amount?: number;
  currency?: string;
  beneficiaryAccount?: string;
  status?: string;
  beneficiaryName?: string;
  remark?: string;
  date?: string;
}

export interface TransferState {
  transferResult: TransferResult | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TransferState = {
  transferResult: null,
  isLoading: false,
  error: null,
};

const transferSlice = createSlice({
  name: "transfers",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearTransfer: (state) => {
      state.transferResult = null;
    },
  },

  extraReducers: (builder) => {
    /** -----------------------------------------
     * INTRA-BANK TRANSFER
     * ----------------------------------------- */
    builder
      .addCase(performIntraBankTransfer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.transferResult = null;
      })
      .addCase(
        performIntraBankTransfer.fulfilled,
        (state, action: PayloadAction<TransferResult | undefined>) => {
          state.isLoading = false;
          state.transferResult = action.payload || { status: "SUCCESS" };
          state.error = null;
        }
      )
      .addCase(performIntraBankTransfer.rejected, (state, action) => {
        state.isLoading = false;

        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Transfer failed";

        state.transferResult = null;
      });

    /** -----------------------------------------
     * INTER-BANK TRANSFER
     * ----------------------------------------- */
    builder
      .addCase(performInterBankTransfer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.transferResult = null;
      })
      .addCase(
        performInterBankTransfer.fulfilled,
        (state, action: PayloadAction<TransferResult | undefined>) => {
          state.isLoading = false;
          state.transferResult = action.payload || { status: "SUCCESS" };
          state.error = null;
        }
      )
      .addCase(performInterBankTransfer.rejected, (state, action) => {
        state.isLoading = false;

        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Transfer failed";

        state.transferResult = null;
      });
  },
});

export const { clearError, clearTransfer } = transferSlice.actions;
export default transferSlice.reducer;
