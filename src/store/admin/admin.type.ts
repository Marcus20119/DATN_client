import {
  actionAdminGetAllDataFromUser,
  actionAdminRestoreUser,
  actionAdminSoftDeleteUser,
} from './admin.action';
import { setAdminState, forceRefetchUsersData } from './admin.slice';

type AdminActionTypeInitial = {
  'admin/setAdminState': Parameters<typeof setAdminState>[0];
  'admin/forceRefetchUsersData': Parameters<typeof forceRefetchUsersData>[0];
  'ADMIN/GET-ALL-DATA-FROM-USER': Parameters<
    typeof actionAdminGetAllDataFromUser
  >[0];
  'ADMIN/SOFT-DELETE-USER': Parameters<typeof actionAdminSoftDeleteUser>[0];
  'ADMIN/RESTORE-USER': Parameters<typeof actionAdminRestoreUser>[0];
};

type AdminActionTypeBase<T extends keyof AdminActionTypeInitial> = {
  type: T;
  payload: AdminActionTypeInitial[T];
};

export type AdminActionType = {
  [K in keyof AdminActionTypeInitial]: AdminActionTypeBase<K>;
}[keyof AdminActionTypeInitial];
