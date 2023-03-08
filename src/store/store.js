import { configureStore } from "@reduxjs/toolkit";
import orderInfoSlice from "./orderInfoSlice";

export const store = configureStore({
  reducer: {
    orderInfo: orderInfoSlice,
  },
});
