import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

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
import ManageUserTable from './ManageUserTable';

interface IManageUserPage {}

const ManageUserPage: React.FC<IManageUserPage> = () => {
  useProtectAdmin();
  const dispatch = useDispatch();
  const { search } = useLocation();
  console.log('search:', search);
  console.log(new URLSearchParams(search));
  const { tableManageUserCurrentTab, loadingGetUsersData, tableTotalPage } =
    useSelector((state: IRootState) => state.admin);

  const [orderField, setOrderField] =
    useState<AllDataFromUsersType['query']['orderField']>('id');
  const [orderType, setOrderType] =
    useState<AllDataFromUsersType['query']['orderType']>('DESC');
  const [page, setPage] = useState<number>(1);

  const tableTabs: ManageUserTabType[] = [
    'Activated User',
    'Deactivated User',
    'Deleted User',
  ];

  useEffect(() => {
    dispatch(
      actionGetAllDataFromUsers({
        query: { orderField: 'id', orderType: 'ASC', page: 1 },
        type: 'Activated User',
      })
    );
  }, []);
  return (
    <Container>
      <div className="w-full mt-8">
        <Heading as="h1" text="QUẢN LÝ NGƯỜI DÙNG" />
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
              tableCurrentTab={tableManageUserCurrentTab}
              handleSetTab={(tab: ManageUserTabType) =>
                dispatch(
                  setAdminState({
                    state: 'tableManageUserCurrentTab',
                    value: tab,
                  })
                )
              }
              disabled={loadingGetUsersData}
            />
            <ManageUserTable />
          </div>
          <Paginate
            currentPage={page}
            setCurrentPage={setPage}
            totalPage={tableTotalPage}
          />
        </div>
      </div>
    </Container>
  );
};

export default ManageUserPage;
