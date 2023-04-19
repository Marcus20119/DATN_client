import { UserDataType } from '../rootType';

export type ManageUserTabType =
  | 'Activated User'
  | 'Deactivated User'
  | 'Deleted User';

export type AllDataFromUsersType = {
  query: {
    orderField: keyof UserDataType;
    orderType: 'DESC' | 'ASC';
    page: number;
  };
  type: ManageUserTabType;
};
