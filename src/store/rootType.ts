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

export type ManageStaffTabType = 'Active Staff' | 'Deleted Staff';

export type GetAllDataFromStaffType = {
  query: {
    orderField: keyof StaffDataType;
    orderType: 'DESC' | 'ASC';
    page: number;
  };
  type: ManageStaffTabType;
};

export type ProjectDataType = {
  id: number;
  name: string;
  project_key: string;
  staff_count: number;
  user_count: number;
  staff_ids: number[];
  user_ids: number[];
  staffs_data?: Pick<StaffDataType, 'id' | 'full_name'>[];
  users_data?: Pick<UserDataType, 'id' | 'user_name' | 'role_id'>[];
  status: number;
  created_at: Date | null;
  updated_at: Date | null;
};

export const initialProjectData: ProjectDataType = {
  id: 0,
  name: '',
  project_key: '',
  staff_count: 0,
  user_count: 0,
  staff_ids: [],
  user_ids: [],
  status: 0,
  created_at: null,
  updated_at: null,
};

export type ManageProjectTabType = 'Active Project' | 'Finished Project';

export type GetAllDataFromProjectType = {
  query: {
    orderField: keyof ProjectDataType;
    orderType: 'DESC' | 'ASC';
    page: number;
  };
  type: ManageProjectTabType;
};
