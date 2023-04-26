import { useSelector } from 'react-redux';
import { TableBase, TableLoading } from '~/components/Table';
import { ManageUserActionModule } from '~/modules';
import { User } from '~/helpers';
import { IRootState } from '~/store/rootReducer';
import { ManageUserTabType } from '~/store/rootType';

interface IAdminManageUserTable {
  currentPage: number;
  currentTab: ManageUserTabType;
}

const AdminManageUserTable: React.FC<IAdminManageUserTable> = ({
  currentPage,
  currentTab,
}) => {
  const { usersData, loadingGetUsersData } = useSelector(
    (state: IRootState) => state.admin
  );

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
                {userData.phone_number || '-'}
              </td>
              <td>{userData.project_key}</td>
              <td>{User.gender(userData.gender)}</td>
              <td>{User.roleId(userData.role_id)}</td>
              <td>{User.day(userData.created_at)}</td>
              <td>
                <ManageUserActionModule
                  role="ADMIN"
                  currentTab={currentTab}
                  userData={userData}
                />
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
