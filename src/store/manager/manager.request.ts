import { privateAxios } from '~/axiosConfig';
import { GetAllDataFromUserType } from '../rootType';

export function requestManagerGetAllDataFromUser(
  payload: GetAllDataFromUserType & { project: string }
) {
  return privateAxios.request({
    method: 'GET',
    url: `/g/2/users/${payload.type}/${payload.project}`,
    params: payload.query,
  });
}
