import { privateAxios } from '~/axiosConfig';
import { GetAllDataFromErrorType } from '../rootType';

export function requestClientGetAllDataFromError(
  payload: GetAllDataFromErrorType
) {
  return privateAxios.request({
    method: 'GET',
    url: '/g/errors/' + payload.project_id,
    params: payload.query,
  });
}
