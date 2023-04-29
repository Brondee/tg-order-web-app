import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdminActions: false,
  curEditType: "",
  isEdit: false,
  curCategoryIds: [],
  curTimeArray: [],
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setIsAdminActions: (state, action) => {
      state.isAdminActions = action.payload;
    },
    setCurEditType: (state, action) => {
      state.curEditType = action.payload;
    },
    setIsEdit: (state, action) => {
      state.isEdit = action.payload;
    },
    setCurCategoryIds: (state, action) => {
      state.curCategoryIds = action.payload;
    },
    setCurTimeArray: (state, action) => {
      state.curTimeArray = action.payload;
    },
  },
});

export const {
  setIsAdminActions,
  setCurEditType,
  setIsEdit,
  setCurCategoryIds,
  setCurTimeArray,
} = adminSlice.actions;

export default adminSlice.reducer;
