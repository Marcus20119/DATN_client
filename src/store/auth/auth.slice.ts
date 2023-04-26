import { createSlice } from '@reduxjs/toolkit';
import { Cookie } from '~/helpers';
import { initialUserData, UserDataType } from '../rootType';

type InitialStateType = {
  showModalAuthHelp: boolean;
  showModalSignOutConfirm: boolean;
  contentModalAuthHelp: {
    name: string;
    helpMessage: string;
  };
  userData: UserDataType;
  loadingGetThisUserData: boolean;
  loadingSignUp: boolean;
  loadingSignIn: boolean;
  messageSignUpError: string;
  messageSignInError: string;
};
type AuthStateTypeBase<K extends keyof InitialStateType> = {
  state: K;
  value: InitialStateType[K];
};

type AuthStateType = {
  [K in keyof InitialStateType]: AuthStateTypeBase<K>;
}[keyof InitialStateType];

const initialState: InitialStateType = {
  showModalAuthHelp: false,
  showModalSignOutConfirm: false,
  contentModalAuthHelp: {
    name: '',
    helpMessage: '',
  },
  userData: Cookie.get('userData') || initialUserData,
  loadingGetThisUserData: false,
  loadingSignUp: false,
  loadingSignIn: false,
  messageSignUpError: '',
  messageSignInError: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, { payload }: { payload: AuthStateType }) => ({
      ...state,
      [payload.state]: payload.value,
    }),
    setUserData: (state, { payload }: { payload: Partial<UserDataType> }) => ({
      ...state,
      userData: { ...{ ...state.userData, ...payload } },
    }),
    handleShowAuthModal: (
      state,
      { payload }: { payload: 'showModalAuthHelp' | 'showModalSignOutConfirm' }
    ) => ({
      ...state,
      [payload]: true,
    }),
    handleHideAuthModal: state => ({
      ...state,
      showModalAuthHelp: false,
      showModalSignOutConfirm: false,
    }),
    signOut: state => {
      Cookie.remove('access_token');
      Cookie.remove('refresh_token');
      Cookie.remove('userData');
      return {
        ...state,
        userData: initialUserData,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAuthState,
  setUserData,
  handleShowAuthModal,
  handleHideAuthModal,
  signOut,
} = authSlice.actions;

export default authSlice.reducer;
