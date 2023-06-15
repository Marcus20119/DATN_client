import queryString from 'query-string';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Container, Section } from '~/components/Common';
import Paginate from '~/components/Paginate/Paginate';
import { TableFilter } from '~/components/Table';
import TableTab from '~/components/Table/TableTab';
import { useNavigateQuery, useScrollOnTop } from '~/hooks';
import { actionAdminGetAllDataFromUser } from '~/store/admin/admin.action';
import { IRootState } from '~/store/rootReducer';
import {
  GetAllDataFromUserType,
  ManageUserTabType,
  UserDataType,
} from '~/store/rootType';
import { SearchParams } from '~/types';
import AdminManageUserTable from './AdminManageUserTable';

interface IAdminManageUserPage {}

const tableTabs: ManageUserTabType[] = [
  'Activated User',
  'Deactivated User',
  'Deleted User',
];
const fieldsList: {
  id: number;
  name: string;
  type: keyof UserDataType;
}[] = [
  { id: 1, name: 'ID', type: 'id' },
  { id: 2, name: 'Tên người dùng', type: 'user_name' },
  { id: 3, name: 'Email', type: 'email' },
  { id: 4, name: 'Dự án', type: 'project_key' },
  { id: 5, name: 'SĐT', type: 'phone_number' },
  { id: 6, name: 'Giới tính', type: 'gender' },
  { id: 7, name: 'Quyền hạng', type: 'role_id' },
  { id: 8, name: 'Ngày tạo', type: 'created_at' },
];

const AdminManageUserPage: React.FC<IAdminManageUserPage> = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const params = queryString.parse(search) as SearchParams;
  const {
    loadingGetUsersData,
    tableTotalPage,
    toggleForceRefetchAdminUsersData,
  } = useSelector((state: IRootState) => state.admin);

  const [tableCurrentTab, setTableCurrentTab] = useState<ManageUserTabType>(
    params.tab as ManageUserTabType
  );
  const [tableCurrentPage, setTableCurrentPage] = useState<number>(
    Number.parseInt(params.page)
  );
  useScrollOnTop([tableCurrentPage]);

  // Set lại state khi thay đổi query
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      setTableCurrentTab(params.tab as ManageUserTabType);
      setTableCurrentPage(Number.parseInt(params.page));
    }
    didMountRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const [orderField, setOrderField] =
    useState<GetAllDataFromUserType['query']['orderField']>('id');
  const [orderType, setOrderType] =
    useState<GetAllDataFromUserType['query']['orderType']>('ASC');

  // Fetch dữ liệu với dữ liệu từ query
  useEffect(() => {
    dispatch(
      actionAdminGetAllDataFromUser({
        query: { orderField, orderType, page: tableCurrentPage },
        type: tableCurrentTab,
      })
    );
  }, [
    dispatch,
    orderField,
    orderType,
    tableCurrentPage,
    tableCurrentTab,
    toggleForceRefetchAdminUsersData,
  ]);

  // Thay đổi query
  useNavigateQuery({
    newPath: `/admin/user/manage?tab=${tableCurrentTab}&page=${tableCurrentPage}`,
    rerenderConditions: [tableCurrentPage, tableCurrentTab],
  });

  return (
    <Container>
      <Section
        sectionTitle="QUẢN LÝ NGƯỜI DÙNG"
        isLoading={loadingGetUsersData}
        navigatePath="/admin/user/add-new"
        navigateLabel="Thêm người dùng"
      >
        <div className="w-full mb-4">
          <div className="flex justify-end items-center w-full mb-4">
            <TableFilter
              setOrderField={setOrderField}
              setOrderType={setOrderType}
              fieldsList={fieldsList}
            />
          </div>
          <div className="relative w-full z-10">
            <TableTab
              tableTabs={tableTabs}
              tableCurrentTab={tableCurrentTab}
              handleSetTab={(tab: ManageUserTabType) => {
                setTableCurrentTab(tab);
                setTableCurrentPage(1);
              }}
              disabled={loadingGetUsersData}
            />
            <AdminManageUserTable
              currentTab={tableCurrentTab}
              currentPage={tableCurrentPage}
            />
          </div>
          <Paginate
            currentPage={tableCurrentPage}
            setCurrentPage={setTableCurrentPage}
            totalPage={tableTotalPage}
          />
        </div>
      </Section>
    </Container>
  );
};

export default AdminManageUserPage;
