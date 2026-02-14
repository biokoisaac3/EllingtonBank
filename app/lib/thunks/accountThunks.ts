import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ACCOUNT_INFO_ENDPOINT,
  ACCOUNT_VALIDATE_NIP_ENDPOINT,
  ACCOUNT_VALIDATE_ELLINGLON_ENDPOINT,
  BANKS_ENDPOINT,
} from "../api";

interface ValidateAccountPayload {
  accountNumber: string;
  bankCode?: string;
}

interface AccountValidation {
  accountName: string;
  accountNumber: string;
}

export interface AccountInfo {
  accountName: string;
  accountNumber: string;
  accountBalance: number;
}

export interface Bank {
  id: number;
  name: string;
  code: string;
  suffices: string | null;
  is_blacklisted: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T = any> {
  status: string;
  success: boolean;
  data?: T;
  message?: string;
}

export const validateEllingtonAccount = createAsyncThunk<
  AccountValidation,
  ValidateAccountPayload
>(
  "accounts/validateEllington",
  async (payload: ValidateAccountPayload, { rejectWithValue, getState }) => {
    const state = getState() as any;
    const token = state.auth.token;
    try {
      const response = await fetch(ACCOUNT_VALIDATE_ELLINGLON_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ accountNumber: payload.accountNumber }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        return rejectWithValue(
          errorData?.data?.message ||
            errorData?.message ||
            `Validation failed (${response.status})`
        );
      }

      const data = (await response.json()) as ApiResponse<AccountValidation>;
      console.log(data);
      if (!data.success || !data.data) {
        return rejectWithValue(data.message || "Account validation failed");
      }
      console.log(data);
      return data.data as AccountValidation;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error.data?.message || error.message || "Validation error"
      );
    }
  }
);

export const validateNipAccount = createAsyncThunk<
  AccountValidation,
  ValidateAccountPayload
>(
  "accounts/validateNip",
  async (payload: ValidateAccountPayload, { rejectWithValue, getState }) => {
    const state = getState() as any;
    const token = state.auth.token;
    try {
      if (!payload.bankCode) {
        return rejectWithValue("Bank code is required for NIP validation");
      }
      const response = await fetch(ACCOUNT_VALIDATE_NIP_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          accountNumber: payload.accountNumber,
          bankCode: payload.bankCode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        return rejectWithValue(
          errorData?.data?.message ||
            errorData?.message ||
            `Validation failed (${response.status})`
        );
      }

      const data = (await response.json()) as ApiResponse<AccountValidation>;
      console.log(data);
      if (!data.success || !data.data) {
        return rejectWithValue(data.message || "Account validation failed");
      }
      return data.data as AccountValidation;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error.data?.message || error.message || "Validation error"
      );
    }
  }
);

export const fetchAccountInfo = createAsyncThunk<
  { accountInfo: AccountInfo },
  void
>("accounts/fetchInfo", async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState() as any;
    const token = state.auth.token;

    const response = await fetch(ACCOUNT_INFO_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return rejectWithValue(
        errorData?.data?.message ||
          errorData?.message ||
          `Account info fetch failed (${response.status})`
      );
    }

    const responseData = await response.json();
    const apiData = responseData as ApiResponse<AccountInfo>;
    if (!apiData.data) {
      return rejectWithValue("Invalid response structure");
    }
    return { accountInfo: apiData.data };
  } catch (error: any) {
    console.log("Fetch error:", error);
    return rejectWithValue(
      error.data?.message || error.message || "Account info fetch error"
    );
  }
});

export const fetchBanks = createAsyncThunk<{ banks: Bank[] }, void>(
  "accounts/fetchBanks",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;

      const response = await fetch(BANKS_ENDPOINT, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        return rejectWithValue(
          errorData?.data?.message ||
            errorData?.message ||
            `Banks fetch failed (${response.status})`
        );
      }

      const responseData = await response.json();
      const apiData = responseData as ApiResponse<Bank[]>;
      if (!apiData.data) {
        return rejectWithValue("Invalid response structure");
      }
      return { banks: apiData.data };
    } catch (error: any) {
      console.log("Fetch banks error:", error);
      return rejectWithValue(
        error.data?.message || error.message || "Banks fetch error"
      );
    }
  }
);
