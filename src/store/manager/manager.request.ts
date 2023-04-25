import { privateAxios } from '~/axiosConfig';
import { GetAllDataFromUserType, UserDataType } from '../rootType';

export function requestManagerGetAllDataFromUser(
  payload: GetAllDataFromUserType & { project: string }
) {
  return privateAxios.request({
    method: 'GET',
    url: `/g/2/users/${payload.type}/${payload.project}`,
    params: payload.query,
  });
}
export function requestManagerSoftDeleteUser(payload: UserDataType['id']) {
  return privateAxios.request({
    method: 'PATCH',
    url: '/u/2/user/soft-delete/' + payload,
  });
}
export function requestManagerRestoreUser(payload: UserDataType['id']) {
  return privateAxios.request({
    method: 'PATCH',
    url: '/u/2/user/restore/' + payload,
  });
}
export function requestManagerActivateUser(payload: UserDataType['id']) {
  return privateAxios.request({
    method: 'PATCH',
    url: '/u/2/user/activate/' + payload,
  });
}
export function requestManagerDeactivateUser(payload: UserDataType['id']) {
  return privateAxios.request({
    method: 'PATCH',
    url: '/u/2/user/deactivate/' + payload,
  });
}
export function requestManagerHardDeleteUser(payload: UserDataType['id']) {
  return privateAxios.request({
    method: 'DELETE',
    url: '/d/2/user/hard-delete/' + payload,
  });
}
