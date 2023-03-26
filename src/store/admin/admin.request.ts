import { privateAxios } from '~/axiosConfig';
import { TestType } from './admin.type';

export function requestTest(payload: TestType) {
  return privateAxios.request({
    method: 'GET',
    url: '/test',
  });
}
