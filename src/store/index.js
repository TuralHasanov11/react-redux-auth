import { apiSlice } from "../api/apiSlice";
import authReducer from "./authSlice"
import {configureStore} from "@reduxjs/toolkit"

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },

    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})