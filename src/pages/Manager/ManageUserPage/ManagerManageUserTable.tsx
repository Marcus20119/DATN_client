import { useSelector } from 'react-redux';
import { TableBase, TableLoading } from '~/components/Table';
import { ManageUserActionModule } from '~/modules';
import { ReadData } from '~/helpers';
import { IRootState } from '~/store/rootReducer';
import { ManageUserTabType } from '~/store/rootType';

interface IManagerManageUserTable {
  currentPage: number;
  currentTab: ManageUserTabType;
}

const ManagerManageUserTable: React.FC<IManagerManageUserTable> = ({
  currentPage,
  currentTab,
}) => {
  const { usersData, loadingGetUsersData } = useSelector(
    (state: IRootState) => state.manager
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
              <td>{ReadData.gender(userData.gender)}</td>
              <td>{ReadData.roleId(userData.role_id)}</td>
              <td>{ReadData.day(userData.created_at)}</td>
              <td>
                <ManageUserActionModule
                  role="MANAGER"
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
          nCol={8}
        />
      </tbody>
    </TableBase>
  );
};

export default ManagerManageUserTable;
