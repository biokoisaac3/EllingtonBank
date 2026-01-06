import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CARD_INITIATE_PAYMENT_ENDPOINT,
  CARD_FETCH_PHYSICAL_ENDPOINT,
  CARD_REQUEST_PHYSICAL_ENDPOINT,
} from "../api";

interface InitiateCardPaymentPayload {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  amount: number;
  beneficiaryAccount: string;
  currency?: string;
  remark?: string;
}

interface RequestPhysicalCardPayload {
  type: "Mastercard" | "Visa" | "Verve";
  deliveryOption?: string;
  address?: string;
  transactionPin: string;
  billingAddress: string;
  color: string;
  billingCity: string;
  billingCountry:string;
}

interface FetchPhysicalCardsPayload {
  status?: "Active" | "Frozen" | "Hotlist" | "Blocked" | "Expired";
}

export interface InitiatePaymentResponse {
  transactionReference: string;
  amount: number;
  currency: string;
  beneficiaryAccount: string;
  status: string;
  beneficiaryName: string;
  remark: string;
  date: string;
}

export interface PhysicalCard {
  id: string;
  account_number: string;
  card_type: string;
  delivery_option: string;
  delivery_address: string;
  date_linked: string | null;
  status: string;
  card_pan: string | null;
  serial_number: string | null;
  expiry_date: string | null;
  batch_no: string;
  has_debited_fee: string;
  has_debited_delivery_fee: string;
  has_debited_vat: string;
  batch_status: string;
  identifier: string;
  created_at: string;
  updated_at: string;
}

export interface RequestedCard {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  reference: string;
  status: string;
  type: string;
  delivery_option: string;
  delivery_fee: number;
  card_fee: number;
  address: string;
}

export interface RequestPhysicalResponse {
  message: string;
  card: RequestedCard;
}

interface ApiResponse<T = any> {
  status: string;
  success: boolean;
  data?: T;
  message?: string;
}

export const initiateCardPayment = createAsyncThunk<
  InitiatePaymentResponse,
  InitiateCardPaymentPayload
>(
  "cards/initiatePayment",
  async (
    payload: InitiateCardPaymentPayload,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;
      const response = await fetch(CARD_INITIATE_PAYMENT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        return rejectWithValue(
          errorData?.data?.message ||
            errorData?.message ||
            `Payment initiation failed (${response.status})`
        );
      }
      const data =
        (await response.json()) as ApiResponse<InitiatePaymentResponse>;
      if (!data.success || !data.data) {
        return rejectWithValue(data.message || "Payment initiation failed");
      }
      return data.data as InitiatePaymentResponse;
    } catch (error: any) {
      return rejectWithValue(
        error.data?.message || error.message || "Payment initiation error"
      );
    }
  }
);

export const fetchPhysicalCards = createAsyncThunk<
  { physicalCards: PhysicalCard[] },
  FetchPhysicalCardsPayload
>(
  "cards/fetchPhysical",
  async (payload: FetchPhysicalCardsPayload, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;
      console.log("Fetch physical cards - token exists:", !!token);
      const params = new URLSearchParams();
      if (payload.status) {
        params.append("status", payload.status);
      }
      const url = `${CARD_FETCH_PHYSICAL_ENDPOINT}${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      const response = await fetch(url, {
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
            `Physical cards fetch failed (${response.status})`
        );
      }
      const responseData = await response.json();
      const apiData = responseData as ApiResponse<PhysicalCard[]>;
      if (!apiData.data) {
        return rejectWithValue("Invalid response structure");
      }
      return { physicalCards: apiData.data };
    } catch (error: any) {
      return rejectWithValue(
        error.data?.message || error.message || "Physical cards fetch error"
      );
    }
  }
);

export const requestPhysicalCard = createAsyncThunk<
  RequestPhysicalResponse,
  RequestPhysicalCardPayload
>(
  "cards/requestPhysical",
  async (
    payload: RequestPhysicalCardPayload,
    { rejectWithValue, getState }
  ) => {
    console.log("requestPhysicalCard thunk started with payload:", payload);
    try {
      const state = getState() as any;
      const token = state.auth.token;
      console.log("requestPhysicalCard - token exists:", !!token);
      console.log(
        "requestPhysicalCard endpoint:",
        CARD_REQUEST_PHYSICAL_ENDPOINT
      );
      const body = JSON.stringify(payload);
      console.log("requestPhysicalCard body:", body);
      const response = await fetch(CARD_REQUEST_PHYSICAL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body,
      });
      console.log("requestPhysicalCard response status:", response.status);
      console.log("requestPhysicalCard response headers:", [
        ...response.headers.entries(),
      ]);
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.log("requestPhysicalCard error data:", errorData);
        return rejectWithValue(
          errorData?.data?.message ||
            errorData?.message ||
            `Physical card request failed (${response.status})`
        );
      }
      const data =
        (await response.json()) as ApiResponse<RequestPhysicalResponse>;
      console.log("requestPhysicalCard success data:", data);
      if (!data.success || !data.data) {
        return rejectWithValue(data.message || "Physical card request failed");
      }
      return data.data as RequestPhysicalResponse;
    } catch (error: any) {
      console.log("requestPhysicalCard catch error:", error);
      return rejectWithValue(
        error.data?.message || error.message || "Physical card request error"
      );
    }
  }
);
