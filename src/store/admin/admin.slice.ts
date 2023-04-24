import { createSlice } from '@reduxjs/toolkit';
import { UserDataType } from '../rootType';

type InitialStateType = {
  usersData: UserDataType[];
  loadingGetUsersData: boolean;
  toggleForceRefetchUsersData: boolean;
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
  toggleForceRefetchUsersData: false,
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
    forceRefetchUsersData: state => ({
      ...state,
      toggleForceRefetchUsersData: !state.toggleForceRefetchUsersData,
    }),
  },
});

// Action creators are generated for each case reducer function
export const { setAdminState, forceRefetchUsersData } = adminSlice.actions;

export default adminSlice.reducer;
