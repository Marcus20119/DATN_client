import { createSlice } from '@reduxjs/toolkit';
import { UserDataType } from '../rootType';

type InitialStateType = {
  usersData: UserDataType[];
  loadingGetUsersData: boolean;
  toggleForceRefetchAdminUsersData: boolean;
  tableTotalPage: number;
};
type AdminStateTypeBase<K extends keyof InitialStateType> = {
  state: K;
  value: InitialStateType[K];
};
type AdminStateType = {
  [K in keyof InitialStateType]: AdminStateTypeBase<K>;
}[keyof InitialStateType];

const initialState: InitialStateType = {
  usersData: [],
  loadingGetUsersData: false,
  toggleForceRefetchAdminUsersData: false,
  tableTotalPage: 1,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminState: (state, { payload }: { payload: AdminStateType }) => ({
      ...state,
      [payload.state]: payload.value,
    }),
    forceRefetchAdminUsersData: state => ({
      ...state,
      toggleForceRefetchAdminUsersData: !state.toggleForceRefetchAdminUsersData,
    }),
  },
});

// Action creators are generated for each case reducer function
export const { setAdminState, forceRefetchAdminUsersData } = adminSlice.actions;

export default adminSlice.reducer;
