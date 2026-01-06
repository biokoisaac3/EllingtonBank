import { createAsyncThunk } from "@reduxjs/toolkit";
import { TRANSFER_SAME_BANK, TRANSFER_OTHER_BANK } from "../api";

export interface TransferPayload {
  beneficiaryAccountNumber: string;
  amount: number;
  narration: string;
  transactionPin: string;
  uniqueReference: string;
  isScheduled: boolean;
  saveBeneficiary: boolean;
  scheduleType?: string;
  dayOfWeek?: string;
  dateOfTransfer?: string;
  dateOfMonth?: number;
  startDate?: string;
  endDate?: string;
  scheduleName?: string;
}

export interface InterBankTransferPayload extends TransferPayload {
  beneficiaryBankName: string;
  beneficiaryBankCode: string;
  beneficiaryName: string;
}

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

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

function extractError(errorData: any, status: number) {
  return errorData?.message || errorData?.data || `Transfer failed (${status})`;
}

export const performIntraBankTransfer = createAsyncThunk<
  TransferResult,
  TransferPayload
>(
  "transfers/performIntraBank",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as any).auth.token;

      const response = await fetch(TRANSFER_SAME_BANK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        return rejectWithValue(extractError(result, response.status));
      }

      return result.data ?? { status: "SUCCESS" };
    } catch (err: any) {
      return rejectWithValue(err.message || "Network Error");
    }
  }
);

export const performInterBankTransfer = createAsyncThunk<
  TransferResult,
  InterBankTransferPayload
>(
  "transfers/performInterBank",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as any).auth.token;

      const response = await fetch(TRANSFER_OTHER_BANK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        return rejectWithValue(extractError(result, response.status));
      }

      return result.data ?? { status: "SUCCESS" };
    } catch (err: any) {
      return rejectWithValue(err.message || "Network Error");
    }
  }
);
