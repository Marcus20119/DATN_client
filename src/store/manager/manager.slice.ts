import { createSlice } from '@reduxjs/toolkit';
import { UserDataType } from '../rootType';

type InitialStateType = {
  usersData: UserDataType[];
  toggleForceRefetchManagerUsersData: boolean;
  loadingGetUsersData: boolean;
  tableTotalPage: number;
};
type ManagerStateTypeBase<K extends keyof InitialStateType> = {
  state: K;
  value: InitialStateType[K];
};
type ManagerStateType = {
  [K in keyof InitialStateType]: ManagerStateTypeBase<K>;
}[keyof InitialStateType];

const initialState: InitialStateType = {
  usersData: [],
  loadingGetUsersData: false,
  toggleForceRefetchManagerUsersData: false,
  tableTotalPage: 1,
};

export const managerSlice = createSlice({
  name: 'manager',
  initialState,
  reducers: {
    setManagerState: (state, { payload }: { payload: ManagerStateType }) => ({
      ...state,
      [payload.state]: payload.value,
    }),
    forceRefetchManagerUsersData: state => ({
      ...state,
      toggleForceRefetchManagerUsersData:
        !state.toggleForceRefetchManagerUsersData,
    }),
  },
});

// Action creators are generated for each case reducer function
export const { setManagerState, forceRefetchManagerUsersData } =
  managerSlice.actions;

export default managerSlice.reducer;
