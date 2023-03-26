import { createSlice } from '@reduxjs/toolkit';

type InitialStateType = {};
type AdminStateType<T extends keyof InitialStateType> = {
  state: T;
  value: InitialStateType[T];
};
const initialState: InitialStateType = {};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminState: (
      state,
      { payload }: { payload: AdminStateType<keyof InitialStateType> }
    ) => ({
      ...state,
      [payload.state]: payload.value,
    }),
  },
});

// Action creators are generated for each case reducer function
export const { setAdminState } = adminSlice.actions;

export default adminSlice.reducer;
