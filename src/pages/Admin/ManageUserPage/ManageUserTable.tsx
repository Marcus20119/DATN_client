import { useDispatch, useSelector } from 'react-redux';
import { TableBase, TableLoading } from '~/components/Table';
import { DeleteButton, EditButton } from '~/components/Table/ActionButton';
import { User } from '~/helpers';
import { IRootState } from '~/store/rootReducer';

interface IManageUserTable {}

const ManageUserTable: React.FC<IManageUserTable> = ({}) => {
  const page = 1;
  const usersTab = 'Active User';
  const dispatch = useDispatch();
  const { usersData, loadingGetUsersData } = useSelector(
    (state: IRootState) => state.admin
  );
  return (
    <TableBase>
      <thead>
        <tr>
          <th className="w-[48px]">#</th>
          <th className="w-[48px]">id</th>
          <th className="w-[136px] text-left">Tên người dùng</th>
          <th className="w-[400px] text-left">Email</th>
          <th className="w-[136px] text-left">SĐT</th>
          <th className="w-[136px]">Giới tính</th>
          <th className="w-[136px]">Quyền hạng</th>
          <th className="w-[136px]">Ngày tạo</th>
          <th className="">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {!loadingGetUsersData &&
          !!usersData &&
          usersData.length > 0 &&
          usersData.map((userData, index) => (
            <tr key={userData.id}>
              <td>{10 * (page - 1) + index + 1}</td>
              <td>{userData.id}</td>
              <td className="text-left">{userData.user_name}</td>
              <td className="text-left" title={userData.email}>
                <span className="line-clamp-1 break-all">{userData.email}</span>
              </td>
              <td className="text-left" title={userData.phone_number || ''}>
                {userData.phone_number}
              </td>
              <td>{User.gender(userData.gender)}</td>
              <td>{User.roleId(userData.role_id)}</td>
              <td>{User.day(userData.created_at)}</td>
              <td>
                <div className="flex items-center justify-center gap-3 w-full">
                  {usersTab === 'Active User' && (
                    <>
                      <EditButton userData={userData} />
                      <DeleteButton userData={userData} />
                    </>
                  )}
                  {/* {usersTab === 'Deleted User' && (
                    <>
                      <RestoreButton userData={userData} />
                      <DeleteButton userData={userData} />
                    </>
                  )} */}
                </div>
              </td>
            </tr>
          ))}
        <TableLoading
          data={usersData}
          loading={loadingGetUsersData}
          page={page}
          nCol={8}
        />
      </tbody>
    </TableBase>
  );
};

export default ManageUserTable;
