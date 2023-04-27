import { useDispatch } from 'react-redux';
import { handleShowBaseConfirmModal } from '~/store/base/base.slice';
import { ManageUserTabType, UserDataType } from '~/store/rootType';
import {
  ActivateButton,
  DeactivateButton,
  DeleteButton,
  EditButton,
  RestoreButton,
} from '../components/Table/ActionButton';

interface IManageUserActionModule {
  role: 'ADMIN' | 'MANAGER';
  currentTab: ManageUserTabType;
  userData: UserDataType;
}

const ManageUserActionModule: React.FC<IManageUserActionModule> = ({
  role,
  currentTab,
  userData,
}) => {
  const dispatch = useDispatch();
  const handleSoftDelete = (id: number) => {
    dispatch(
      handleShowBaseConfirmModal({
        title: 'XÁC NHẬN !',
        description: 'Bạn có chắc chắn muốn xóa người dùng này ?',
        confirmButtonLabel: 'Xóa',
        confirmAction: { type: `${role}/SOFT-DELETE-USER`, payload: id },
      })
    );
  };
  const handleRestore = (id: number) => {
    dispatch(
      handleShowBaseConfirmModal({
        title: 'XÁC NHẬN !',
        description: 'Bạn có chắc chắn muốn khôi phục người dùng này ?',
        confirmButtonLabel: 'Khôi phục',
        confirmAction: { type: `${role}/RESTORE-USER`, payload: id },
      })
    );
  };
  const handleActivate = (id: number) => {
    dispatch(
      handleShowBaseConfirmModal({
        title: 'XÁC NHẬN !',
        description: 'Bạn có chắc chắn muốn activate người dùng này ?',
        confirmButtonLabel: 'Activate',
        confirmAction: { type: `${role}/ACTIVATE-USER`, payload: id },
      })
    );
  };
  const handleDeactivate = (id: number) => {
    dispatch(
      handleShowBaseConfirmModal({
        title: 'XÁC NHẬN !',
        description: 'Bạn có chắc chắn muốn deactivate người dùng này ?',
        confirmButtonLabel: 'Deactivate',
        confirmAction: { type: `${role}/DEACTIVATE-USER`, payload: id },
      })
    );
  };
  const handleHardDelete = (id: number) => {
    dispatch(
      handleShowBaseConfirmModal({
        title: 'XÁC NHẬN !',
        description: 'Bạn có chắc chắn muốn xóa vĩnh viễn người dùng này ?',
        confirmButtonLabel: 'Xóa',
        confirmAction: { type: `${role}/HARD-DELETE-USER`, payload: id },
      })
    );
  };

  return (
    <div className="flex items-center justify-center gap-3 w-full">
      {currentTab === 'Activated User' && (
        <>
          <EditButton
            path={`/${role.toLowerCase()}/edit-user/${userData.id}`}
          />
          <DeleteButton onClick={() => handleSoftDelete(userData.id)} />
          <DeactivateButton onClick={() => handleDeactivate(userData.id)} />
        </>
      )}
      {currentTab === 'Deactivated User' && (
        <>
          <EditButton
            path={`/${role.toLowerCase()}/edit-user/${userData.id}`}
          />
          <DeleteButton onClick={() => handleSoftDelete(userData.id)} />
          <ActivateButton onClick={() => handleActivate(userData.id)} />
        </>
      )}
      {currentTab === 'Deleted User' && (
        <>
          <EditButton
            path={`/${role.toLowerCase()}/edit-user/${userData.id}`}
          />
          <DeleteButton onClick={() => handleHardDelete(userData.id)} />
          <RestoreButton onClick={() => handleRestore(userData.id)} />
        </>
      )}
    </div>
  );
};

export { ManageUserActionModule };
