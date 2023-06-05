import { privateAxios } from '~/axiosConfig';
import {
  GetAllDataFromProjectType,
  GetAllDataFromStaffType,
  GetAllDataFromUserType,
  ProjectDataType,
  StaffDataType,
  UserDataType,
} from '../rootType';

export function requestAdminGetAllDataFromUser(
  payload: GetAllDataFromUserType
) {
  return privateAxios.request({
    method: 'GET',
    url: '/g/3/users/' + payload.type,
    params: payload.query,
  });
}
export function requestAdminGetAllDataFromStaff(
  payload: GetAllDataFromStaffType
) {
  return privateAxios.request({
    method: 'GET',
    url: '/g/staffs/' + payload.type,
    params: payload.query,
  });
}
export function requestAdminGetAllDataFromProject(
  payload: GetAllDataFromProjectType
) {
  return privateAxios.request({
    method: 'GET',
    url: '/g/projects/' + payload.type,
    params: payload.query,
  });
}
export function requestAdminSoftDeleteUser(payload: UserDataType['id']) {
  return privateAxios.request({
    method: 'PATCH',
    url: '/u/3/user/soft-delete/' + payload,
  });
}
export function requestAdminSoftDeleteStaff(payload: StaffDataType['id']) {
  return privateAxios.request({
    method: 'PATCH',
    url: '/u/staff/soft-delete/' + payload,
  });
}
export function requestAdminRestoreUser(payload: UserDataType['id']) {
  return privateAxios.request({
    method: 'PATCH',
    url: '/u/3/user/restore/' + payload,
  });
}
export function requestAdminRestoreStaff(payload: StaffDataType['id']) {
  return privateAxios.request({
    method: 'PATCH',
    url: '/u/staff/restore/' + payload,
  });
}
export function requestAdminActivateUser(payload: UserDataType['id']) {
  return privateAxios.request({
    method: 'PATCH',
    url: '/u/3/user/activate/' + payload,
  });
}
export function requestAdminDeactivateUser(payload: UserDataType['id']) {
  return privateAxios.request({
    method: 'PATCH',
    url: '/u/3/user/deactivate/' + payload,
  });
}
export function requestAdminHardDeleteUser(payload: UserDataType['id']) {
  return privateAxios.request({
    method: 'DELETE',
    url: '/d/3/user/hard-delete/' + payload,
  });
}
export function requestAdminFinishProject(payload: ProjectDataType['id']) {
  return privateAxios.request({
    method: 'PATCH',
    url: '/u/project/edit/' + payload,
    data: {
      status: 1,
    },
  });
}
export function requestAdminUnfinishProject(payload: ProjectDataType['id']) {
  return privateAxios.request({
    method: 'PATCH',
    url: '/u/project/edit/' + payload,
    data: {
      status: 0,
    },
  });
}
