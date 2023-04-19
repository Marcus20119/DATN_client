import queryString from 'query-string';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { string } from 'yup';

import { Container } from '~/components/Common';
import { Heading } from '~/components/Heading';
import Paginate from '~/components/Paginate/Paginate';
import { TableFilter } from '~/components/Table';
import TableTab from '~/components/Table/TableTab';
import { useProtectAdmin } from '~/hooks';
import { actionGetAllDataFromUsers } from '~/store/admin/admin.action';
import { setAdminState } from '~/store/admin/admin.slice';
import {
  AllDataFromUsersType,
  ManageUserTabType,
} from '~/store/admin/admin.type';
import { IRootState } from '~/store/rootReducer';
import { SearchParams } from '~/types';
import ManageUserTable from './ManageUserTable';

interface IManageUserPage {}

const ManageUserPage: React.FC<IManageUserPage> = () => {
  useProtectAdmin();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { search } = useLocation();
  const params = queryString.parse(search) as SearchParams;
  const { loadingGetUsersData, tableTotalPage } = useSelector(
    (state: IRootState) => state.admin
  );

  const [tableTab, setTableTab] = useState<ManageUserTabType>(
    params.tab as ManageUserTabType
  );
  const [tablePage, setTablePage] = useState<number>(
    Number.parseInt(params.page)
  );
  const [orderField, setOrderField] =
    useState<AllDataFromUsersType['query']['orderField']>('id');
  const [orderType, setOrderType] =
    useState<AllDataFromUsersType['query']['orderType']>('DESC');

  const tableTabs: ManageUserTabType[] = [
    'Activated User',
    'Deactivated User',
    'Deleted User',
  ];
  const didMountRef = useRef(false);
  useEffect(() => {
    dispatch(
      actionGetAllDataFromUsers({
        query: { orderField, orderType, page: tablePage },
        type: tableTab,
      })
    );
  }, [dispatch, orderField, orderType, tablePage, tableTab]);

  useEffect(() => {
    if (didMountRef.current) {
      navigateTo(`/admin/manage-user?tab=${tableTab}&page=${tablePage}`);
    }
    didMountRef.current = true;
  }, [navigateTo, tablePage, tableTab]);

  return (
    <Container>
      <div className="w-full mt-8">
        <Heading as="h1" text="QUẢN LÝ NGƯỜI DÙNG" className="text-[32px]" />
        <div className="w-full mb-4">
          <div className="flex justify-end items-center w-full mb-4">
            <TableFilter
              setOrderField={setOrderField}
              setOrderType={setOrderType}
            />
          </div>
          <div className="relative w-full z-10">
            <TableTab
              tableTabs={tableTabs}
              tableCurrentTab={tableTab}
              handleSetTab={(tab: ManageUserTabType) => setTableTab(tab)}
              disabled={loadingGetUsersData}
            />
            <ManageUserTable />
          </div>
          <Paginate
            currentPage={tablePage}
            setCurrentPage={setTablePage}
            totalPage={tableTotalPage}
          />
        </div>
      </div>
    </Container>
  );
};

export default ManageUserPage;
