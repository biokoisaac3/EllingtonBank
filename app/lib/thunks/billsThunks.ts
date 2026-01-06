import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  BILLS_DATA_OPTIONS_ENDPOINT,
  BILLS_VALIDATE_CUSTOMER_ENDPOINT,
  BILLS_PAY_ENDPOINT,
  BILLS_PROVIDERS_ENDPOINT,
  BILLS_PACKAGES_ENDPOINT,
} from "../api";

export interface BillerOption {
  id: number;
  name: string;
  slug: string;
  amount: number;
  billerId: number;
  hasPending: boolean;
  sequenceNumber: number;
}

export interface BillerProvider {
  id: number;
  name: string;
  slug: string;
  groupId: number;
  skipValidation: boolean;
  handleWithProductCode: boolean;
  isRestricted: boolean;
  hideInstitution: boolean;
  sendSms: boolean;
}

export interface Package {
  id: number;
  name: string;
  slug: string;
  amount: number;
  billerId: number;
  hasPending: boolean;
  sequenceNumber: number;
}

interface ApiResponse<T = any> {
  status: string;
  success: boolean;
  data?: T;
  message?: string;
}


export interface BillerOptionsPayload {
  type: string;
  provider: string;
}

export interface ValidateCustomerPayload {
  customerId: string;
  productName: string;
  billerSlug: string;
}

export interface PayBillPayload {
  type: string;
  provider: string;
  amount: number;
  bundleSlug: string;
  customerId: string;
  transactionPin: string;
}

export interface GetProvidersPayload {
  type: string;
}

export interface GetPackagesPayload {
  slug: string;
}

export const fetchBillerOptions = createAsyncThunk<
  BillerOption[],
  BillerOptionsPayload
>("bills/fetchOptions", async (payload, { rejectWithValue, getState }) => {
  const state = getState() as any;
  const token = state.auth.token;

  try {
    const response = await fetch(BILLS_DATA_OPTIONS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const data: ApiResponse<BillerOption[]> = await response.json();
    if (!data.success || !data.data)
      return rejectWithValue(data.message || "Failed");
    return data.data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Network error");
  }
});

export const validateBillCustomer = createAsyncThunk<
  any,
  ValidateCustomerPayload
>("bills/validateCustomer", async (payload, { rejectWithValue, getState }) => {
  const state = getState() as any;
  const token = state.auth.token;

  try {
    const response = await fetch(BILLS_VALIDATE_CUSTOMER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const data: ApiResponse<any> = await response.json();
    console.log(data)
    if (!data.success || !data.data)
      return rejectWithValue(data.data.message || "Failed");
    return data.data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Network error");
  }
});

export const payBill = createAsyncThunk<any, PayBillPayload>(
  "bills/payBill",
  async (payload, { rejectWithValue, getState }) => {
    const state = getState() as any;
    const token = state.auth.token;
    try {
      const response = await fetch(BILLS_PAY_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data: ApiResponse<any> = await response.json();
      console.log(data)
      if (!data.success || !data.data)
        return rejectWithValue(data.data.message || "Failed");
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

export const getBillerProviders = createAsyncThunk<
  BillerProvider[],
  GetProvidersPayload
>("bills/getProviders", async (payload, { rejectWithValue, getState }) => {
  const state = getState() as any;
  const token = state.auth.token;

  try {
    const response = await fetch(BILLS_PROVIDERS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const data: ApiResponse<BillerProvider[]> = await response.json();
    console.log(data)
    if (!data.success || !data.data)
      return rejectWithValue(data.message || "Failed");
    return data.data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Network error");
  }
});

export const getPackages = createAsyncThunk<Package[], GetPackagesPayload>(
  "bills/getPackages",
  async (payload, { rejectWithValue, getState }) => {
    const state = getState() as any;
    const token = state.auth.token;

    try {
      const response = await fetch(BILLS_PACKAGES_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data: ApiResponse<Package[]> = await response.json();

      if (!data.success || !data.data)
        return rejectWithValue(data.message || "Failed");
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);
