import { privateAxios } from '~/axiosConfig';
import { AllDataFromUsersType } from './admin.type';

export function requestGetAllDataFromUsers(payload: AllDataFromUsersType) {
  return privateAxios.request({
    method: 'GET',
    url: '/g/users/' + payload.type,
    params: payload.query,
  });
}
