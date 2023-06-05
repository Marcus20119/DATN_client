import './TableBase.scss';

type ITableBase = {
  type?: 'manage' | 'info' | 'PLC' | 'user';
  children: React.ReactNode;
};

const TableBase: React.FC<ITableBase> = ({ type = 'manage', children }) => {
  return (
    <table className={`h-[1px] w-full mb-2 table-${type}`}>{children}</table>
  );
};

export { TableBase };
