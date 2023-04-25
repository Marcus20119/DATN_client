import {
  actionManagerActivateUser,
  actionManagerDeactivateUser,
  actionManagerGetAllDataFromUser,
  actionManagerHardDeleteUser,
  actionManagerRestoreUser,
  actionManagerSoftDeleteUser,
} from './manager.action';
import { forceRefetchManagerUsersData, setManagerState } from './manager.slice';

type ManagerActionTypeInitial = {
  'manager/setManagerState': Parameters<typeof setManagerState>[0];
  'manager/forceRefetchManagerUsersData': Parameters<
    typeof forceRefetchManagerUsersData
  >[0];
  'MANAGER/GET-ALL-DATA-FROM-USER': Parameters<
    typeof actionManagerGetAllDataFromUser
  >[0];
  'MANAGER/SOFT-DELETE-USER': Parameters<typeof actionManagerSoftDeleteUser>[0];
  'MANAGER/RESTORE-USER': Parameters<typeof actionManagerRestoreUser>[0];
  'MANAGER/ACTIVATE-USER': Parameters<typeof actionManagerActivateUser>[0];
  'MANAGER/DEACTIVATE-USER': Parameters<typeof actionManagerDeactivateUser>[0];
  'MANAGER/HARD-DELETE-USER': Parameters<typeof actionManagerHardDeleteUser>[0];
};

type ManagerActionTypeBase<K extends keyof ManagerActionTypeInitial> = {
  type: K;
  payload: ManagerActionTypeInitial[K];
};

export type ManagerActionType = {
  [K in keyof ManagerActionTypeInitial]: ManagerActionTypeBase<K>;
}[keyof ManagerActionTypeInitial];
