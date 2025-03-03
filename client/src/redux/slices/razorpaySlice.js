import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
    key: "",
    subscription_id: "",
    isPaymentVerified: false,
    allPayments: {},
    finalMonths: {},
    monthlySalesRecord: [],
};

export const getRazorpayId = createAsyncThunk("/razorpay/getId", async () => {
    try {
        const response = await axiosInstance.get("/payments/razorpay-key");
        return response.data;
    } catch (error) {
        toast.error(error?.message || "Failed to load Razorpay ID");
        return null;
    }
});

export const purchaseCourseBundle = createAsyncThunk(
    "/purchaseCourse",
    async () => {
        try {
            const response = await axiosInstance.post("/payments/subscribe");
            return response.data;
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Subscription failed"
            );
            return null;
        }
    }
);

export const verifyUserPayment = createAsyncThunk(
    "/payment/verify",
    async (data) => {
        try {
            const response = await axiosInstance.post("/payments/verify", {
                razorpay_payment_id: data.razorpay_payment_id,
                razorpay_subscription_id: data.razorpay_subscription_id,
                razorpay_signature: data.razorpay_signature,
            });
            return response.data;
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Failed to load data"
            );
        }
    }
);

export const getPaymentRecord = createAsyncThunk(
    "/payments/record",
    async () => {
        try {
            const response = axiosInstance.get("/payments?count=100");
            toast.promise(response, {
                loading: "Fetching payment records",
                success: (data) => {
                    return data?.data?.message;
                },
                error: "Failed to get payment records",
            });
            return (await response).data;
        } catch (error) {
            toast.error(error?.message || "Operation failed");
        }
    }
);

export const cancelSubscription = createAsyncThunk(
    "/payments/cancel",
    async () => {
        try {
            const response = await axiosInstance.post("/payments/unsubscribe");
            toast.promise(response, {
                loading: "Processing unsubscription",
                success: (data) => {
                    return data?.data?.message;
                },
                error: "Failed to unsubscribe",
            });
            return response.data;
        } catch (error) {
            toast.error(error?.message || "Failed to unsubscribe");
        }
    }
);

const razorpaySlice = createSlice({
    name: "razorpay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRazorpayId.fulfilled, (state, action) => {
                state.key = action?.payload?.key;
            })
            .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
                state.subscription_id = action?.payload?.subscription_id;
            })
            .addCase(verifyUserPayment.fulfilled, (state, action) => {
                toast.success(action?.payload?.message);
                state.isPaymentVerified = action?.payload?.success;
            })
            .addCase(verifyUserPayment.rejected, (state, action) => {
                toast.success(action?.payload?.message);
                state.isPaymentVerified = action?.payload?.success;
            })
            .addCase(getPaymentRecord.fulfilled, (state, action) => {
                state.allPayments = action?.payload?.allPayments;
                state.finalMonths = action?.payload?.finalMonths;
                state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
            });
    },
});

export default razorpaySlice.reducer;
