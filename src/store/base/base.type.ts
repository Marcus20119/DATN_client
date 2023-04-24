import { AdminActionType } from '../admin/admin.type';
import { AuthActionType } from '../auth/auth.type';
import { ManagerActionType } from '../manager/manager.type';

export type AllActionType =
  | AuthActionType
  | AdminActionType
  | ManagerActionType
  | {
      type: 'base/handleHideBaseModal';
      payload: string;
    };
