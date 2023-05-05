import { useDispatch, useSelector } from 'react-redux';
import { TableBase, TableLoading } from '~/components/Table';
import {
  DeleteButton,
  EditButton,
  RestoreButton,
} from '~/components/Table/ActionButton';
import { ViewButton } from '~/components/Table/ActionButton/ViewButton';
import { ReadData } from '~/helpers';
import { handleShowBaseConfirmModal } from '~/store/base/base.slice';
import { IRootState } from '~/store/rootReducer';
import { ManageStaffTabType } from '~/store/rootType';

interface IAdminManageStaffTable {
  currentPage: number;
  currentTab: ManageStaffTabType;
}

const AdminManageStaffTable: React.FC<IAdminManageStaffTable> = ({
  currentPage,
  currentTab,
}) => {
  const dispatch = useDispatch();
  const { staffsData, loadingGetStaffsData } = useSelector(
    (state: IRootState) => state.admin
  );

  const handleSoftDelete = (id: number) => {
    dispatch(
      handleShowBaseConfirmModal({
        title: 'XÁC NHẬN !',
        description: 'Bạn có chắc chắn muốn xóa nhân viên này ?',
        confirmButtonLabel: 'Xóa',
        confirmAction: { type: 'ADMIN/SOFT-DELETE-STAFF', payload: id },
      })
    );
  };
  const handleRestore = (id: number) => {
    dispatch(
      handleShowBaseConfirmModal({
        title: 'XÁC NHẬN !',
        description: 'Bạn có chắc chắn muốn khôi phục nhân viên này ?',
        confirmButtonLabel: 'Khôi phục',
        confirmAction: { type: 'ADMIN/RESTORE-STAFF', payload: id },
      })
    );
  };
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
                      <EditButton path={`/admin/edit-staff/${staffData.id}`} />
                      <DeleteButton
                        onClick={() => {
                          handleSoftDelete(staffData.id);
                        }}
                      />
                    </>
                  )}

                  {currentTab === 'Deleted Staff' && (
                    <>
                      <EditButton path={``} />
                      <DeleteButton onClick={() => {}} />
                      <RestoreButton
                        onClick={() => {
                          handleRestore(staffData.id);
                        }}
                      />
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
