import { createSlice } from '@reduxjs/toolkit';
import { UserDataType } from '../rootType';

type InitialStateType = {
  usersData: UserDataType[];
  loadingGetUsersData: boolean;
  tableTotalPage: number;
};
type AdminStateType<T extends keyof InitialStateType> = {
  state: T;
  value: InitialStateType[T];
};
const initialState: InitialStateType = {
  usersData: [],
  loadingGetUsersData: false,
  tableTotalPage: 1,
};

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
