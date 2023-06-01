import { ReadData } from '~/helpers';
import { ProjectDataType, StaffDataType, UserDataType } from '~/store/rootType';

interface IEditHeadingModule {
  data: UserDataType | ProjectDataType | StaffDataType;
}

const EditHeadingModule: React.FC<IEditHeadingModule> = ({ data }) => {
  return (
    <div className="flex gap-5 ml-auto">
      <div>
        <span className="font-bold text-main-blue-80 mr-2">Id: </span>
        <span>{data.id}</span>
      </div>
      <span>-</span>
      <div>
        <span className="font-bold text-main-blue-80 mr-2">Ngày tạo: </span>
        <span>{ReadData.day(data.created_at)}</span>
      </div>
      <span>-</span>
      <div>
        <span className="font-bold text-main-blue-80 mr-2">
          Ngày chỉnh sửa cuối cùng:{' '}
        </span>
        <span>{ReadData.day(data.updated_at)}</span>
      </div>
    </div>
  );
};

export { EditHeadingModule };
