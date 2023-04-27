import { createSlice } from '@reduxjs/toolkit';
import { StaffDataType, UserDataType } from '../rootType';

type InitialStateType = {
  usersData: UserDataType[];
  staffsData: StaffDataType[];
  loadingGetUsersData: boolean;
  loadingGetStaffsData: boolean;
  toggleForceRefetchAdminUsersData: boolean;
  toggleForceRefetchAdminStaffsData: boolean;
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
  staffsData: [],
  loadingGetUsersData: false,
  loadingGetStaffsData: false,
  toggleForceRefetchAdminUsersData: false,
  toggleForceRefetchAdminStaffsData: false,
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
    forceRefetchAdminStaffsData: state => ({
      ...state,
      toggleForceRefetchAdminUsersData: !state.toggleForceRefetchAdminUsersData,
    }),
  },
});

// Action creators are generated for each case reducer function
export const {
  setAdminState,
  forceRefetchAdminUsersData,
  forceRefetchAdminStaffsData,
} = adminSlice.actions;

export default adminSlice.reducer;
