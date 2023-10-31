import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/useSlice";
export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
});
