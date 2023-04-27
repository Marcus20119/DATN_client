import { ReadData } from '~/helpers';
import { UserDataType } from '~/store/rootType';

interface IEditUserHeadingModule {
  thisUserData: UserDataType;
}

const EditUserHeadingModule: React.FC<IEditUserHeadingModule> = ({
  thisUserData,
}) => {
  return (
    <div className="flex gap-5 ml-auto">
      <div>
        <span className="font-bold text-main-blue-80 mr-2">Id: </span>
        <span>{thisUserData.id}</span>
      </div>
      <span>-</span>
      <div>
        <span className="font-bold text-main-blue-80 mr-2">Ngày tạo: </span>
        <span>{ReadData.day(thisUserData.created_at)}</span>
      </div>
      <span>-</span>
      <div>
        <span className="font-bold text-main-blue-80 mr-2">
          Ngày chỉnh sửa cuối cùng:{' '}
        </span>
        <span>{ReadData.day(thisUserData.updated_at)}</span>
      </div>
    </div>
  );
};

export default EditUserHeadingModule;
