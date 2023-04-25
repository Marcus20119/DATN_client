import {
  actionAdminActivateUser,
  actionAdminDeactivateUser,
  actionAdminGetAllDataFromUser,
  actionAdminHardDeleteUser,
  actionAdminRestoreUser,
  actionAdminSoftDeleteUser,
} from './admin.action';
import { setAdminState, forceRefetchAdminUsersData } from './admin.slice';

type AdminActionTypeInitial = {
  'admin/setAdminState': Parameters<typeof setAdminState>[0];
  'admin/forceRefetchAdminUsersData': Parameters<
    typeof forceRefetchAdminUsersData
  >[0];
  'ADMIN/GET-ALL-DATA-FROM-USER': Parameters<
    typeof actionAdminGetAllDataFromUser
  >[0];
  'ADMIN/SOFT-DELETE-USER': Parameters<typeof actionAdminSoftDeleteUser>[0];
  'ADMIN/RESTORE-USER': Parameters<typeof actionAdminRestoreUser>[0];
  'ADMIN/ACTIVATE-USER': Parameters<typeof actionAdminActivateUser>[0];
  'ADMIN/DEACTIVATE-USER': Parameters<typeof actionAdminDeactivateUser>[0];
  'ADMIN/HARD-DELETE-USER': Parameters<typeof actionAdminHardDeleteUser>[0];
};

type AdminActionTypeBase<T extends keyof AdminActionTypeInitial> = {
  type: T;
  payload: AdminActionTypeInitial[T];
};

export type AdminActionType = {
  [K in keyof AdminActionTypeInitial]: AdminActionTypeBase<K>;
}[keyof AdminActionTypeInitial];
