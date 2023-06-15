import { useDispatch, useSelector } from 'react-redux';
import { TableBase, TableLoading } from '~/components/Table';
import {
  ActivateButton,
  DeleteButton,
  EditButton,
  RestoreButton,
} from '~/components/Table/ActionButton';
import { ViewButton } from '~/components/Table/ActionButton/ViewButton';
import { ReadData } from '~/helpers';
import { handleShowBaseConfirmModal } from '~/store/base/base.slice';
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

  const handleFinish = (id: number) => {
    dispatch(
      handleShowBaseConfirmModal({
        title: 'XÁC NHẬN !',
        description: 'Dự án này đã hoàn thành ?',
        confirmButtonLabel: 'Hoàn thành',
        confirmAction: { type: 'ADMIN/FINISH-PROJECT', payload: id },
      })
    );
  };
  const handleUnFinish = (id: number) => {
    dispatch(
      handleShowBaseConfirmModal({
        title: 'XÁC NHẬN !',
        description:
          'Bạn muốn đổi trạng thái của dự án này thành "Chưa hoàn thành" ?',
        confirmButtonLabel: 'Xác nhận',
        confirmAction: { type: 'ADMIN/UNFINISH-PROJECT', payload: id },
      })
    );
  };
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
                        path={`/client/project-info/${projectData.id}`}
                      />
                      <EditButton
                        path={`/admin/project/edit/${projectData.id}`}
                      />
                      <ActivateButton
                        onClick={() => handleFinish(projectData.id)}
                      />
                    </>
                  )}

                  {currentTab === 'Finished Project' && (
                    <>
                      <ViewButton
                        path={`/client/project-info/${projectData.id}`}
                      />
                      <EditButton
                        path={`/admin/project/edit/${projectData.id}`}
                      />
                      <RestoreButton
                        onClick={() => {
                          handleUnFinish(projectData.id);
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
