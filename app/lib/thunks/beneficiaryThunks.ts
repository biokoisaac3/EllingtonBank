import { createAsyncThunk } from "@reduxjs/toolkit";
import { BENEFICIARIES_ENDPOINT } from "../api";

export interface Beneficiary {
  account_number: string;
  account_name: string;
  bank_code: string;
  bank_name: string;
}

interface ApiResponse<T = any> {
  status: string;
  success: boolean;
  data?: T;
  message?: string;
}

export const fetchBeneficiaries = createAsyncThunk<
  { beneficiaries: Beneficiary[] },
  void
>("beneficiaries/fetch", async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState() as any;
    const token = state.auth.token;

    const response = await fetch(BENEFICIARIES_ENDPOINT, {
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
          `Beneficiaries fetch failed (${response.status})`
      );
    }

    const responseData = await response.json();
    const apiData = responseData as ApiResponse<Beneficiary[]>;
    if (!apiData.data) {
      return rejectWithValue("Invalid response structure");
    }
    return { beneficiaries: apiData.data };
  } catch (error: any) {
    console.log("Fetch error:", error);
    return rejectWithValue(
      error.data?.message || error.message || "Beneficiaries fetch error"
    );
  }
});
