import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  curDate: "",
  curSpecialistId: null,
  curServiceIds: [],
};

export const orderInfoSlice = createSlice({
  name: "orderInfo",
  initialState,
  reducers: {
    setCurDate: (state, action) => {
      state.curDate = action.payload;
    },
    setSpecialistId: (state, action) => {
      state.curSpecialistId = action.payload;
    },
    curServiceIds: (state, action) => {
      state.curServiceIds = action.payload;
    },
  },
});

export const { setCurDate, setSpecialistId, curServiceIds } =
  orderInfoSlice.actions;

export default orderInfoSlice.reducer;
