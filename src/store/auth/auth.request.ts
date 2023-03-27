import { privateAxios } from '~/axiosConfig';
import { SignInDataType, SignUpDataType } from './auth.type';

export function requestSignUp(payload: SignUpDataType) {
  return privateAxios.request({
    method: 'POST',
    url: '/auth/sign-up',
    data: payload,
  });
}
export function requestSignIn(payload: SignInDataType) {
  return privateAxios.request({
    method: 'POST',
    url: '/auth/sign-in',
    data: payload,
  });
}
