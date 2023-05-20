import { StaffDataType } from '../rootType';
import { actionClientGetAllDataFromError } from './client.action';
import { forceRefetchClientErrorData, setClientState } from './client.slice';

type ClientActionTypeInitial = {
  'client/setClientState': Parameters<typeof setClientState>[0];
  'client/forceRefetchClientErrorData': Parameters<
    typeof forceRefetchClientErrorData
  >[0];
  'CLIENT/GET-ALL-DATA-FROM-ERROR': Parameters<
    typeof actionClientGetAllDataFromError
  >[0];
};

type ClientActionTypeBase<T extends keyof ClientActionTypeInitial> = {
  type: T;
  payload: ClientActionTypeInitial[T];
};

export type ClientActionType = {
  [K in keyof ClientActionTypeInitial]: ClientActionTypeBase<K>;
}[keyof ClientActionTypeInitial];
