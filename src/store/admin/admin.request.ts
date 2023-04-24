import { privateAxios } from '~/axiosConfig';
import { GetAllDataFromUserType, UserDataType } from '../rootType';

export function requestAdminGetAllDataFromUser(
  payload: GetAllDataFromUserType
) {
  return privateAxios.request({
    method: 'GET',
    url: '/g/3/users/' + payload.type,
    params: payload.query,
  });
}
export function requestAdminSoftDeleteUser(payload: UserDataType['id']) {
  return privateAxios.request({
    method: 'PATCH',
    url: '/u/3/user/soft-delete/' + payload,
  });
}
export function requestAdminRestoreUser(payload: UserDataType['id']) {
  return privateAxios.request({
    method: 'PATCH',
    url: '/u/3/user/restore/' + payload,
  });
}
