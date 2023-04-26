import { call, put } from 'redux-saga/effects';
import { Cookie } from '~/helpers';
import { UserDataType } from '../rootType';
import {
  requestGetThisUserData,
  requestSignIn,
  requestSignUp,
} from './auth.request';
import { setAuthState, setUserData } from './auth.slice';
import { SignInDataType, SignUpDataType } from './auth.type';

export function* handleSignUp(action: {
  type: string;
  payload: {
    data: SignUpDataType;
    onSuccess: () => void;
  };
}) {
  yield put(setAuthState({ state: 'loadingSignUp', value: true }));
  try {
    const { data } = yield call(requestSignUp, action.payload.data);
    if (data) {
      yield put(setAuthState({ state: 'messageSignUpError', value: '' }));
      action.payload.onSuccess();
    }
  } catch (err: any) {
    console.log(err);
    yield put(
      setAuthState({
        state: 'messageSignUpError',
        value: err?.response?.data?.message,
      })
    );
  } finally {
    yield put(setAuthState({ state: 'loadingSignUp', value: false }));
  }
}

export function* handleSignIn(action: {
  type: string;
  payload: {
    data: SignInDataType;
    onSuccess: () => void;
  };
}) {
  yield put(setAuthState({ state: 'loadingSignIn', value: true }));
  try {
    const { data } = yield call(requestSignIn, action.payload.data);
    if (data) {
      yield put(setAuthState({ state: 'messageSignInError', value: '' }));
      const userData: UserDataType = data.userData;
      yield put(setUserData(userData));
      Cookie.set({
        cName: 'access_token',
        cValue: data.access_token,
        exDays: 7,
      });
      Cookie.set({
        cName: 'refresh_token',
        cValue: data.refresh_token,
        exDays: 7,
      });
      Cookie.set({
        cName: 'userData',
        cValue: userData,
        exDays: 7,
      });
      Cookie.set({
        cName: 'user_id',
        cValue: userData.id,
        exDays: 7,
      });
      action.payload.onSuccess();
    }
  } catch (err: any) {
    console.log(err);
    yield put(
      setAuthState({
        state: 'messageSignInError',
        value: err?.response?.data?.message,
      })
    );
  } finally {
    yield put(setAuthState({ state: 'loadingSignIn', value: false }));
  }
}

export function* handleGetThisUserData(action: {
  type: string;
  payload: UserDataType['id'];
}) {
  yield put(setAuthState({ state: 'loadingGetThisUserData', value: true }));
  try {
    const { data } = yield call(requestGetThisUserData, action.payload);
    if (data) {
      const userData: UserDataType = data.data;
      yield put(setUserData(userData));
      Cookie.set({
        cName: 'userData',
        cValue: userData,
        exDays: 7,
      });
    }
  } catch (err: any) {
    console.log(err);
  } finally {
    yield put(setAuthState({ state: 'loadingGetThisUserData', value: false }));
  }
}
