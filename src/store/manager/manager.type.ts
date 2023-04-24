import { actionManagerGetAllDataFromUser } from './manager.action';
import { setManagerState } from './manager.slice';

type ManagerActionTypeInitial = {
  'manager/setManagerStateR': Parameters<typeof setManagerState>[0];
  'MANAGER/GET-ALL-DATA-FROM-USER': Parameters<
    typeof actionManagerGetAllDataFromUser
  >[0];
};

type ManagerActionTypeBase<K extends keyof ManagerActionTypeInitial> = {
  type: K;
  payload: ManagerActionTypeInitial[K];
};

export type ManagerActionType = {
  [K in keyof ManagerActionTypeInitial]: ManagerActionTypeBase<K>;
}[keyof ManagerActionTypeInitial];
