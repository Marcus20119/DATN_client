import { createSlice } from '@reduxjs/toolkit';
import { UserDataType } from '../rootType';

type InitialStateType = {
  usersData: UserDataType[];
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
  },
});

// Action creators are generated for each case reducer function
export const { setManagerState } = managerSlice.actions;

export default managerSlice.reducer;
