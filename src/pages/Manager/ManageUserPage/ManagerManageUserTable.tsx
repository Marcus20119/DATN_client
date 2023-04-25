import { useDispatch, useSelector } from 'react-redux';
import { TableBase, TableLoading } from '~/components/Table';
import {
  ActivateButton,
  DeactivateButton,
  DeleteButton,
  EditButton,
  RestoreButton,
} from '~/components/Table/ActionButton';
import { User } from '~/helpers';
import { ManageUserTabType } from '~/store/rootType';
import { IRootState } from '~/store/rootReducer';
import { handleShowBaseConfirmModal } from '~/store/base/base.slice';

interface IManagerManageUserTable {
  currentPage: number;
  currentTab: ManageUserTabType;
}

const ManagerManageUserTable: React.FC<IManagerManageUserTable> = ({
  currentPage,
  currentTab,
}) => {
  const dispatch = useDispatch();
  const { usersData, loadingGetUsersData } = useSelector(
    (state: IRootState) => state.manager
  );

  const handleSoftDelete = (id: number) => {
    dispatch(
      handleShowBaseConfirmModal({
        title: 'XÁC NHẬN !',
        description: 'Bạn có chắc chắn muốn xóa người dùng này ?',
        confirmButtonLabel: 'Xóa',
        confirmAction: { type: 'MANAGER/SOFT-DELETE-USER', payload: id },
      })
    );
  };
  const handleRestore = (id: number) => {
    dispatch(
      handleShowBaseConfirmModal({
        title: 'XÁC NHẬN !',
        description: 'Bạn có chắc chắn muốn khôi phục người dùng này ?',
        confirmButtonLabel: 'Khôi phục',
        confirmAction: { type: 'MANAGER/RESTORE-USER', payload: id },
      })
    );
  };
  const handleActivate = (id: number) => {
    dispatch(
      handleShowBaseConfirmModal({
        title: 'XÁC NHẬN !',
        description: 'Bạn có chắc chắn muốn activate người dùng này ?',
        confirmButtonLabel: 'Activate',
        confirmAction: { type: 'MANAGER/ACTIVATE-USER', payload: id },
      })
    );
  };
  const handleDeactivate = (id: number) => {
    dispatch(
      handleShowBaseConfirmModal({
        title: 'XÁC NHẬN !',
        description: 'Bạn có chắc chắn muốn deactivate người dùng này ?',
        confirmButtonLabel: 'Deactivate',
        confirmAction: { type: 'MANAGER/DEACTIVATE-USER', payload: id },
      })
    );
  };
  const handleHardDelete = (id: number) => {
    dispatch(
      handleShowBaseConfirmModal({
        title: 'XÁC NHẬN !',
        description: 'Bạn có chắc chắn muốn xóa vĩnh viễn người dùng này ?',
        confirmButtonLabel: 'Xóa',
        confirmAction: { type: 'MANAGER/HARD-DELETE-USER', payload: id },
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
                      <DeactivateButton
                        onClick={() => handleDeactivate(userData.id)}
                      />
                    </>
                  )}
                  {currentTab === 'Deactivated User' && (
                    <>
                      <ActivateButton
                        onClick={() => handleActivate(userData.id)}
                      />
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
                      <DeleteButton
                        onClick={() => handleHardDelete(userData.id)}
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
          nCol={8}
        />
      </tbody>
    </TableBase>
  );
};

export default ManagerManageUserTable;
