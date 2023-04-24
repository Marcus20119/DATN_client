import { useDispatch, useSelector } from 'react-redux';
import { TableBase, TableLoading } from '~/components/Table';
import {
  DeleteButton,
  EditButton,
  RestoreButton,
} from '~/components/Table/ActionButton';
import { User } from '~/helpers';
import { ManageUserTabType } from '~/store/rootType';
import { IRootState } from '~/store/rootReducer';
import { handleShowBaseConfirmModal } from '~/store/base/base.slice';

interface IAdminManageUserTable {
  currentPage: number;
  currentTab: ManageUserTabType;
}

const AdminManageUserTable: React.FC<IAdminManageUserTable> = ({
  currentPage,
  currentTab,
}) => {
  const dispatch = useDispatch();
  const { usersData, loadingGetUsersData } = useSelector(
    (state: IRootState) => state.admin
  );

  const handleSoftDelete = (id: number) => {
    dispatch(
      handleShowBaseConfirmModal({
        title: 'XÁC NHẬN !',
        description: 'Bạn có chắc chắn muốn xóa người dùng này ?',
        confirmButtonLabel: 'Xóa',
        confirmAction: { type: 'ADMIN/SOFT-DELETE-USER', payload: id },
      })
    );
  };
  const handleRestore = (id: number) => {
    dispatch(
      handleShowBaseConfirmModal({
        title: 'XÁC NHẬN !',
        description: 'Bạn có chắc chắn muốn khôi phục người dùng này ?',
        confirmButtonLabel: 'Khôi phục',
        confirmAction: { type: 'ADMIN/RESTORE-USER', payload: id },
      })
    );
  };
  return (
    <TableBase>
      <thead>
        <tr>
          <th className="w-[48px]">#</th>
          <th className="w-[48px]">ID</th>
          <th className="w-[132px] text-left">Tên người dùng</th>
          <th className="w-[350px] text-left">Email</th>
          <th className="w-[96px] text-left">SĐT</th>
          <th className="w-[64px]">Dự án</th>
          <th className="w-[96px]">Giới tính</th>
          <th className="w-[112px]">Quyền hạng</th>
          <th className="w-[96px]">Ngày tạo</th>
          <th className="">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {!loadingGetUsersData &&
          !!usersData &&
          usersData.length > 0 &&
          usersData.map((userData, index) => (
            <tr key={userData.id}>
              <td>{10 * (currentPage - 1) + index + 1}</td>
              <td>{userData.id}</td>
              <td className="text-left">
                <span className="line-clamp-1">{userData.user_name}</span>
              </td>
              <td className="text-left" title={userData.email}>
                <span className="line-clamp-1 break-all">{userData.email}</span>
              </td>
              <td className="text-left" title={userData.phone_number || ''}>
                {userData.phone_number || '0777421072'}
              </td>
              <td>{userData.project_key}</td>
              <td>{User.gender(userData.gender)}</td>
              <td>{User.roleId(userData.role_id)}</td>
              <td>{User.day(userData.created_at)}</td>
              <td>
                <div className="flex items-center justify-center gap-3 w-full">
                  {currentTab === 'Activated User' && (
                    <>
                      <EditButton userData={userData} />
                      <DeleteButton
                        onClick={() => handleSoftDelete(userData.id)}
                      />
                    </>
                  )}
                  {currentTab === 'Deactivated User' && (
                    <>
                      <EditButton userData={userData} />
                      <DeleteButton
                        onClick={() => handleSoftDelete(userData.id)}
                      />
                    </>
                  )}
                  {currentTab === 'Deleted User' && (
                    <>
                      <RestoreButton
                        onClick={() => handleRestore(userData.id)}
                      />
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        <TableLoading
          data={usersData}
          loading={loadingGetUsersData}
          currentPage={currentPage}
          nCol={9}
        />
      </tbody>
    </TableBase>
  );
};

export default AdminManageUserTable;