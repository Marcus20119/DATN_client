import { call, put } from 'redux-saga/effects';
import { Cookie } from '~/helpers';
import { UserDataType } from '../rootType';
import { requestSignIn, requestSignUp } from './auth.request';
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

// const setAuthCookie = (data: AuthResponseType) => {
//   const { accessToken, refreshToken, userData } = data;

//   Cookie.set({
//     cName: 'accessToken',
//     cValue: accessToken,
//     exDays: 7,
//   });
//   Cookie.set({
//     cName: 'refreshToken',
//     cValue: refreshToken,
//     exDays: 7,
//   });
//   Cookie.set({
//     cName: 'userData',
//     cValue: userData,
//     exDays: 7,
//   });
// };

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
      console.log('data:', data);
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
