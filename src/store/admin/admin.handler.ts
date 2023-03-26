import { call, put } from 'redux-saga/effects';

import { requestTest } from './admin.request';
import { TestType } from './admin.type';

export function* handleTest(action: { type: string; payload: TestType }) {
  try {
    const { data } = yield call(requestTest, action.payload);
    console.log('data:', data);
  } catch (err) {
    console.log(err);
  } finally {
  }
}
