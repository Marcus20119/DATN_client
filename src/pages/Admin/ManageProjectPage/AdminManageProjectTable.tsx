import { useDispatch, useSelector } from 'react-redux';
import { TableBase, TableLoading } from '~/components/Table';
import {
  DeleteButton,
  EditButton,
  RestoreButton,
} from '~/components/Table/ActionButton';
import { ViewButton } from '~/components/Table/ActionButton/ViewButton';
import { ReadData } from '~/helpers';
import { IRootState } from '~/store/rootReducer';
import { ManageProjectTabType } from '~/store/rootType';

interface IAdminManageProjectTable {
  currentPage: number;
  currentTab: ManageProjectTabType;
}

const AdminManageProjectTable: React.FC<IAdminManageProjectTable> = ({
  currentPage,
  currentTab,
}) => {
  const dispatch = useDispatch();
  const { projectsData, loadingGetProjectsData } = useSelector(
    (state: IRootState) => state.admin
  );

  // const handleSoftDelete = (id: number) => {
  //   dispatch(
  //     handleShowBaseConfirmModal({
  //       title: 'XÁC NHẬN !',
  //       description: 'Bạn có chắc chắn muốn xóa nhân viên này ?',
  //       confirmButtonLabel: 'Xóa',
  //       confirmAction: { type: 'ADMIN/SOFT-DELETE-STAFF', payload: id },
  //     })
  //   );
  // };
  // const handleRestore = (id: number) => {
  //   dispatch(
  //     handleShowBaseConfirmModal({
  //       title: 'XÁC NHẬN !',
  //       description: 'Bạn có chắc chắn muốn khôi phục nhân viên này ?',
  //       confirmButtonLabel: 'Khôi phục',
  //       confirmAction: { type: 'ADMIN/RESTORE-STAFF', payload: id },
  //     })
  //   );
  // };
  return (
    <TableBase>
      <thead>
        <tr>
          <th className="w-[48px]">#</th>
          <th className="w-[48px]">ID</th>
          <th className="w-[350px] text-left">Tên dự án</th>
          <th className="w-[168px]">Mã dự án</th>
          <th className="w-[168px]">Số người dùng</th>
          <th className="w-[168px]">Số nhân viên</th>
          <th className="w-[96px]">Ngày tạo</th>
          <th className="">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {!loadingGetProjectsData &&
          !!projectsData &&
          projectsData.length > 0 &&
          projectsData.map((projectData, index) => (
            <tr key={projectData.id}>
              <td>{10 * (currentPage - 1) + index + 1}</td>
              <td>{projectData.id}</td>
              <td className="text-left">
                <span className="line-clamp-1">{projectData.name}</span>
              </td>
              <td>{projectData.project_key}</td>
              <td>{projectData.user_count}</td>
              <td>{projectData.staff_count}</td>
              <td>{ReadData.day(projectData.created_at)}</td>
              <td>
                <div className="flex items-center justify-center gap-3 w-full">
                  {currentTab === 'Active Project' && (
                    <>
                      <ViewButton
                        path={`/client/staff-info/${projectData.id}`}
                      />
                      <EditButton
                        path={`/admin/edit-staff/${projectData.id}`}
                      />
                      <DeleteButton
                        onClick={() => {
                          // handleSoftDelete(projectData.id);
                        }}
                      />
                    </>
                  )}

                  {currentTab === 'Finished Project' && (
                    <>
                      <EditButton path={``} />
                      <DeleteButton onClick={() => {}} />
                      <RestoreButton
                        onClick={() => {
                          // handleRestore(projectData.id);
                        }}
                      />
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        <TableLoading
          data={projectsData}
          loading={loadingGetProjectsData}
          currentPage={currentPage}
          nCol={7}
        />
      </tbody>
    </TableBase>
  );
};

export default AdminManageProjectTable;
