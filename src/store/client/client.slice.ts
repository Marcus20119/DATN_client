import { createSlice } from '@reduxjs/toolkit';
import { ErrorDataType } from '../rootType';

type InitialStateType = {
  errorsData: ErrorDataType[];
  loadingGetErrorsData: boolean;
  toggleForceRefetchClientErrorsData: boolean;
  tableTotalPage: number;
};
type ClientStateTypeBase<K extends keyof InitialStateType> = {
  state: K;
  value: InitialStateType[K];
};
type ClientStateType = {
  [K in keyof InitialStateType]: ClientStateTypeBase<K>;
}[keyof InitialStateType];

const initialState: InitialStateType = {
  errorsData: [],
  loadingGetErrorsData: false,
  toggleForceRefetchClientErrorsData: false,
  tableTotalPage: 1,
};

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setClientState: (state, { payload }: { payload: ClientStateType }) => ({
      ...state,
      [payload.state]: payload.value,
    }),
    forceRefetchClientErrorData: state => ({
      ...state,
      toggleForceRefetchClientErrorsData:
        !state.toggleForceRefetchClientErrorsData,
    }),
  },
});

// Action creators are generated for each case reducer function
export const { setClientState, forceRefetchClientErrorData } =
  clientSlice.actions;

export default clientSlice.reducer;
