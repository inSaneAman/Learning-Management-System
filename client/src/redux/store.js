import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./slices/authSlice";
import courseSliceReducer from "./slices/courseSlice";
import lectureSliceReducer from "./slices/lectureSlice";
import razorpaySliceReducer from "./slices/razorpaySlice";
import statSliceReducer from "./slices/statSlice";
const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course: courseSliceReducer,
        razorpay: razorpaySliceReducer,
        lecture: lectureSliceReducer,
        stat: statSliceReducer,
    },
    devTools: true,
});

export default store;
