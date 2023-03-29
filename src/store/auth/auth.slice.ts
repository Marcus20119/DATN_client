import { createSlice } from '@reduxjs/toolkit';
import { Cookie } from '~/helpers';
import { UserDataType } from '../rootType';

const initialUserData: UserDataType = {
  id: 0,
  user_name: '',
  email: '',
  role_id: -1,
  gender: -1,
  is_activated: false,
  is_deleted: false,
  project_id: 0,
  project_key: '',
  avatar: '',
  phone_number: '',
  created_at: null,
  updated_at: null,
};

type InitialStateType = {
  showModalAuthHelp: boolean;
  showModalSignOutConfirm: boolean;
  contentModalAuthHelp: {
    name: string;
    helpMessage: string;
  };
  userData: UserDataType;
  loadingSignUp: boolean;
  loadingSignIn: boolean;
  messageSignUpError: string;
  messageSignInError: string;
};
type AuthStateType<T extends keyof InitialStateType> = {
  state: T;
  value: InitialStateType[T];
};
const initialState: InitialStateType = {
  showModalAuthHelp: false,
  showModalSignOutConfirm: false,
  contentModalAuthHelp: {
    name: '',
    helpMessage: '',
  },
  userData: Cookie.get('userData') || initialUserData,
  loadingSignUp: false,
  loadingSignIn: false,
  messageSignUpError: '',
  messageSignInError: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (
      state,
      { payload }: { payload: AuthStateType<keyof InitialStateType> }
    ) => ({
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
