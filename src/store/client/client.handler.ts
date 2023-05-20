import { call, put } from 'redux-saga/effects';

import { ErrorDataType, GetAllDataFromErrorType } from '../rootType';
import { requestClientGetAllDataFromError } from './client.request';
import { setClientState } from './client.slice';

export function* handleClientGetAllDataFromError(action: {
  type: string;
  payload: GetAllDataFromErrorType;
}) {
  yield put(setClientState({ state: 'loadingGetErrorsData', value: true }));
  try {
    const { data } = yield call(
      requestClientGetAllDataFromError,
      action.payload
    );
    if (data) {
      const errorsData: ErrorDataType[] = data.data;
      const tableTotalPage: number = data.totalPages;
      yield put(setClientState({ state: 'errorsData', value: errorsData }));
      yield put(
        setClientState({ state: 'tableTotalPage', value: tableTotalPage })
      );
    }
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setClientState({ state: 'loadingGetErrorsData', value: false }));
  }
}
