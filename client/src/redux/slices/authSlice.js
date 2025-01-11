import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../helpers/axiosInstance";
const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "",
    data: JSON.parse(localStorage.getItem("data")) || {},
};

export const createNewAccount = createAsyncThunk(
    "/auth/signup",
    async (data, { rejectWithValue }) => {
        try {
            const res = axiosInstance.post("users/register", data); // Pass FormData directly

            toast.promise(res, {
                loading: "Creating your account...",
                success: (data) => {
                    return data?.data?.message;
                },
                error: "Failed to create your account",
            });

            return (await res).data;
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        const res = axiosInstance.post("users/login", data);
        toast.promise(res, {
            loading: "Authentication in progress",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to login",
        });

        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const logout = createAsyncThunk(
    "/auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const res = axiosInstance.post("users/logout");
            toast.promise(res, {
                loading: "Logging you out",
                success: (data) => {
                    return data?.data?.message;
                },
                error: "Failed to logout",
            });

            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem(
                    "data",
                    JSON.stringify(action?.payload?.user)
                );
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("role", action?.payload?.user?.role);
                state.isLoggedIn = true;
                state.data = action?.payload?.user;
                state.role = action?.payload?.user?.role;
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.clear();
                state.data = {};
                state.isLoggedIn = false;
                state.role = "";
            });
    },
});

export default authSlice.reducer;
