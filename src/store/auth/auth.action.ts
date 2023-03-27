import { createAction } from '@reduxjs/toolkit';
import { SignInDataType, SignUpDataType } from './auth.type';

export const actionSignUp = createAction<{
  data: SignUpDataType;
  onSuccess: () => void;
}>('AUTH/SIGN-UP');

export const actionSignIn = createAction<{
  data: SignInDataType;
  onSuccess: () => void;
}>('AUTH/SIGN-IN');
