import { createSlice } from '@reduxjs/toolkit';
import { ProjectDataType, StaffDataType, UserDataType } from '../rootType';

type InitialStateType = {
  usersData: UserDataType[];
  staffsData: StaffDataType[];
  projectsData: ProjectDataType[];
  loadingGetUsersData: boolean;
  loadingGetStaffsData: boolean;
  loadingGetProjectsData: boolean;
  toggleForceRefetchAdminUsersData: boolean;
  toggleForceRefetchAdminStaffsData: boolean;
  toggleForceRefetchAdminProjectsData: boolean;
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
  projectsData: [],
  loadingGetUsersData: false,
  loadingGetStaffsData: false,
  loadingGetProjectsData: false,
  toggleForceRefetchAdminUsersData: false,
  toggleForceRefetchAdminStaffsData: false,
  toggleForceRefetchAdminProjectsData: false,
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
      toggleForceRefetchAdminStaffsData:
        !state.toggleForceRefetchAdminStaffsData,
    }),
    forceRefetchAdminProjectsData: state => ({
      ...state,
      toggleForceRefetchAdminProjectsData:
        !state.toggleForceRefetchAdminProjectsData,
    }),
  },
});

// Action creators are generated for each case reducer function
export const {
  setAdminState,
  forceRefetchAdminUsersData,
  forceRefetchAdminStaffsData,
  forceRefetchAdminProjectsData,
} = adminSlice.actions;

export default adminSlice.reducer;
