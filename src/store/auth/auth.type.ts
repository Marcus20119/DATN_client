import {
  actionGetThisUserData,
  actionSignIn,
  actionSignUp,
} from './auth.action';
import { setAuthState, setUserData, signOut } from './auth.slice';

export type SignUpDataType = {
  email: string;
  password: string;
  user_name: string;
  project_key: string;
};
export type SignInDataType = {
  email: string;
  password: string;
};

type AuthActionTypeInitial = {
  'auth/setAuthState': Parameters<typeof setAuthState>[0];
  'auth/setUserData': Parameters<typeof setUserData>[0];
  'auth/signOut': Parameters<typeof signOut>[0];
  'AUTH/SIGN-UP': Parameters<typeof actionSignUp>[0];
  'AUTH/SIGN-IN': Parameters<typeof actionSignIn>[0];
  'AUTH/GET-THIS-USER-DATA': Parameters<typeof actionGetThisUserData>[0];
};

type AuthActionTypeBase<T extends keyof AuthActionTypeInitial> = {
  type: T;
  payload: AuthActionTypeInitial[T];
};
export type AuthActionType = {
  [K in keyof AuthActionTypeInitial]: AuthActionTypeBase<K>;
}[keyof AuthActionTypeInitial];
