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

export const initialUserData: UserDataType = {
  id: 0,
  user_name: '',
  email: '',
  role_id: -1,
  gender: -1,
  is_activated: false,
  is_deleted: false,
  project_id: 0,
  project_key: '',
  avatar: '',
  phone_number: '',
  created_at: null,
  updated_at: null,
};

export type StaffDataType = {
  id: number;
  full_name: string;
  email: string;
  gender: number;
  is_deleted: boolean;
  avatar: string;
  phone_number: string;
  exp: string;
  hometown: string;
  degree: string;
  major: string;
  languages: string[];
  address: string;
  work_unit: string;
  day_of_birth: string;
  created_at: Date | null;
  updated_at: Date | null;
};

export const initialStaffData: StaffDataType = {
  id: 0,
  full_name: '',
  email: '',
  gender: -1,
  is_deleted: false,
  avatar: '',
  phone_number: '',
  exp: '',
  hometown: '',
  degree: '',
  major: '',
  address: '',
  languages: [],
  work_unit: '',
  day_of_birth: '',
  created_at: null,
  updated_at: null,
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
