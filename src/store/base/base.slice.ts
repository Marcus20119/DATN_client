import { createSlice } from '@reduxjs/toolkit';

type InitialStateType = {
  isReachScrolling: boolean;
};
type BaseStateType<T extends keyof InitialStateType> = {
  state: T;
  value: InitialStateType[T];
};
const initialState: InitialStateType = {
  isReachScrolling: false,
};

export const baseSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setBaseState: (
      state,
      { payload }: { payload: BaseStateType<keyof InitialStateType> }
    ) => ({
      ...state,
      [payload.state]: payload.value,
    }),

    // handleShowBaseModal: (
    //   state,
    //   { payload }: { payload: 'showModalBaseHelp' }
    // ) => ({
    //   ...state,
    //   [payload]: true,
    // }),
    // handleHideBaseModal: state => ({
    //   ...state,
    //   showModalBaseHelp: false,
    // }),
  },
});

// Action creators are generated for each case reducer function
export const { setBaseState } = baseSlice.actions;

export default baseSlice.reducer;
