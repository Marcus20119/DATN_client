import queryString from 'query-string';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Container, Section } from '~/components/Common';
import Paginate from '~/components/Paginate/Paginate';
import { TableFilter } from '~/components/Table';
import TableTab from '~/components/Table/TableTab';
import { useNavigateQuery, useScrollOnTop } from '~/hooks';
import { actionAdminGetAllDataFromProject } from '~/store/admin/admin.action';
import { IRootState } from '~/store/rootReducer';
import {
  GetAllDataFromProjectType,
  ManageProjectTabType,
  ProjectDataType,
} from '~/store/rootType';
import { SearchParams } from '~/types';
import AdminManageProjectTable from './AdminManageProjectTable';

interface IAdminManageProjectPage {}

const tableTabs: ManageProjectTabType[] = [
  'Active Project',
  'Finished Project',
];
const fieldsList: {
  id: number;
  name: string;
  type: keyof ProjectDataType;
}[] = [
  { id: 1, name: 'ID', type: 'id' },
  { id: 2, name: 'Tên dự án', type: 'name' },
  { id: 3, name: 'Mã dự án', type: 'project_key' },
  { id: 4, name: 'Số người dùng', type: 'user_count' },
  { id: 5, name: 'Số nhân viên', type: 'staff_count' },
  { id: 6, name: 'Ngày tạo', type: 'created_at' },
];

const AdminManageProjectPage: React.FC<IAdminManageProjectPage> = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const params = queryString.parse(search) as SearchParams;
  const {
    loadingGetProjectsData,
    tableTotalPage,
    toggleForceRefetchAdminProjectsData,
  } = useSelector((state: IRootState) => state.admin);

  const [tableCurrentTab, setTableCurrentTab] = useState<ManageProjectTabType>(
    params.tab as ManageProjectTabType
  );
  const [tableCurrentPage, setTableCurrentPage] = useState<number>(
    Number.parseInt(params.page)
  );
  useScrollOnTop([tableCurrentPage]);

  // Set lại state khi thay đổi query
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      setTableCurrentTab(params.tab as ManageProjectTabType);
      setTableCurrentPage(Number.parseInt(params.page));
    }
    didMountRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const [orderField, setOrderField] =
    useState<GetAllDataFromProjectType['query']['orderField']>('id');
  const [orderType, setOrderType] =
    useState<GetAllDataFromProjectType['query']['orderType']>('ASC');

  // Fetch dữ liệu với dữ liệu từ query
  useEffect(() => {
    dispatch(
      actionAdminGetAllDataFromProject({
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
    toggleForceRefetchAdminProjectsData,
  ]);

  // Thay đổi query
  useNavigateQuery({
    newPath: `/admin/project/manage?tab=${tableCurrentTab}&page=${tableCurrentPage}`,
    rerenderConditions: [tableCurrentPage, tableCurrentTab],
  });

  return (
    <Container>
      <Section
        sectionTitle="QUẢN LÝ DỰ ÁN"
        isLoading={loadingGetProjectsData}
        navigateLabel="Thêm dự án"
        navigatePath="/admin/project/add-new"
        protectedMobile
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
              handleSetTab={(tab: ManageProjectTabType) => {
                setTableCurrentTab(tab);
                setTableCurrentPage(1);
              }}
              disabled={loadingGetProjectsData}
            />
            <AdminManageProjectTable
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

export default AdminManageProjectPage;
