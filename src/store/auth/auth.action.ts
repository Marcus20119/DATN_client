import { createAction } from '@reduxjs/toolkit';
import { UserDataType } from '../rootType';
import { SignInDataType, SignUpDataType } from './auth.type';

export const actionSignUp = createAction<{
  data: SignUpDataType;
  onSuccess: () => void;
}>('AUTH/SIGN-UP');

export const actionSignIn = createAction<{
  data: SignInDataType;
  onSuccess: (url: string) => void;
}>('AUTH/SIGN-IN');

export const actionGetThisUserData = createAction<UserDataType['id']>(
  'AUTH/GET-THIS-USER-DATA'
);
