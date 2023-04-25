import { myAxios, privateAxios } from '~/axiosConfig';
import { UserDataType } from '../rootType';
import { SignInDataType, SignUpDataType } from './auth.type';

export function requestSignUp(payload: SignUpDataType) {
  return myAxios.request({
    method: 'POST',
    url: '/auth/sign-up',
    data: payload,
  });
}
export function requestSignIn(payload: SignInDataType) {
  return myAxios.request({
    method: 'POST',
    url: '/auth/sign-in',
    data: payload,
  });
}
export function requestGetThisUserData(payload: UserDataType['id']) {
  return privateAxios.request({
    method: 'GET',
    url: '/g/user/' + payload,
  });
}
