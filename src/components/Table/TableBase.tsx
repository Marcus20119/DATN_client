import { useDispatch, useSelector } from 'react-redux';
// import { setUsersTab } from '~/store/admin/admin.slice';
// import { UserTabType } from '~/store/admin/admin.type';
import { IRootState } from '~/store/rootReducer';
import { DeleteButton, EditButton } from './ActionButton';

import './TableBase.scss';

type ITableBase = {
  // page: number;
  children: React.ReactNode;
};

// const tableTabs: UserTabType[] = ['Active User', 'Deleted User'];

const TableBase: React.FC<ITableBase> = ({ children }) => {
  const dispatch = useDispatch();
  // const { usersData, loadingUsersData, usersTab } = useSelector(
  //   (state: IRootState) => state.admin
  // );
  return <table className="h-[1px] w-full mb-2">{children}</table>;
};

export { TableBase };
