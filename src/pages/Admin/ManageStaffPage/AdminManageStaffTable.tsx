import { useSelector } from 'react-redux';
import { TableBase, TableLoading } from '~/components/Table';
import {
  DeleteButton,
  EditButton,
  RestoreButton,
} from '~/components/Table/ActionButton';
import { ViewButton } from '~/components/Table/ActionButton/ViewButton';
import { ReadData } from '~/helpers';
import { ManageStaffTabType } from '~/store/admin/admin.type';
import { IRootState } from '~/store/rootReducer';

interface IAdminManageStaffTable {
  currentPage: number;
  currentTab: ManageStaffTabType;
}

const AdminManageStaffTable: React.FC<IAdminManageStaffTable> = ({
  currentPage,
  currentTab,
}) => {
  const { staffsData, loadingGetStaffsData } = useSelector(
    (state: IRootState) => state.admin
  );

  return (
    <TableBase>
      <thead>
        <tr>
          <th className="w-[48px]">#</th>
          <th className="w-[48px]">ID</th>
          <th className="w-[280px] text-left">Tên nhân viên</th>
          <th className="w-[350px] text-left">Email</th>
          <th className="w-[96px] text-left">SĐT</th>
          <th className="w-[96px]">Giới tính</th>
          <th className="w-[96px]">Ngày tạo</th>
          <th className="">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {!loadingGetStaffsData &&
          !!staffsData &&
          staffsData.length > 0 &&
          staffsData.map((staffData, index) => (
            <tr key={staffData.id}>
              <td>{10 * (currentPage - 1) + index + 1}</td>
              <td>{staffData.id}</td>
              <td className="text-left">
                <span className="line-clamp-1">{staffData.full_name}</span>
              </td>
              <td className="text-left" title={staffData.email}>
                <span className="line-clamp-1 break-all">
                  {staffData.email}
                </span>
              </td>
              <td className="text-left" title={staffData.phone_number || ''}>
                {staffData.phone_number || '-'}
              </td>
              <td>{ReadData.gender(staffData.gender)}</td>
              <td>{ReadData.day(staffData.created_at)}</td>
              <td>
                <div className="flex items-center justify-center gap-3 w-full">
                  {currentTab === 'Active Staff' && (
                    <>
                      <ViewButton path={`/client/staff-info/${staffData.id}`} />
                      <EditButton path={``} />
                      <DeleteButton onClick={() => {}} />
                    </>
                  )}

                  {currentTab === 'Deleted Staff' && (
                    <>
                      <EditButton path={``} />
                      <DeleteButton onClick={() => {}} />
                      <RestoreButton onClick={() => {}} />
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        <TableLoading
          data={staffsData}
          loading={loadingGetStaffsData}
          currentPage={currentPage}
          nCol={7}
        />
      </tbody>
    </TableBase>
  );
};

export default AdminManageStaffTable;
