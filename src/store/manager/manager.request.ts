import { privateAxios } from '~/axiosConfig';
import { GetAllDataFromUserType } from '../rootType';

export function requestManagerGetAllDataFromUser(
  payload: GetAllDataFromUserType & { project: string }
) {
  return privateAxios.request({
    method: 'GET',
    url: '/g/' + payload.project + '/users/' + payload.type,
    params: payload.query,
  });
}
