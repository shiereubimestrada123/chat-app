import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoaderState {
  loader: boolean;
}

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    loader: false,
  } as LoaderState,
  reducers: {
    ShowLoader: (state) => {
      state.loader = true;
    },
    HideLoader: (state) => {
      state.loader = false;
    },
  },
});

export interface LoaderActions {
  ShowLoader(): PayloadAction;
  HideLoader(): PayloadAction;
}

export const { ShowLoader, HideLoader } = loaderSlice.actions;
export default loaderSlice.reducer;