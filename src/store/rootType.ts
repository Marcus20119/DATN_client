export type UserDataType = {
  id: number;
  user_name: string;
  email: string;
  role_id: number;
  gender: number;
  is_activated: boolean;
  is_deleted: boolean;
  project_id: number;
  project_key: string;
  avatar: string;
  phone_number: string;
  created_at: Date | null;
  updated_at: Date | null;
};

export type ManageUserTabType =
  | 'Activated User'
  | 'Deactivated User'
  | 'Deleted User';

export type GetAllDataFromUserType = {
  query: {
    orderField: keyof UserDataType;
    orderType: 'DESC' | 'ASC';
    page: number;
  };
  type: ManageUserTabType;
};
