import queryString from 'query-string';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Section } from '~/components/Common';
import Paginate from '~/components/Paginate/Paginate';
import { TableBase, TableFilter, TableLoading } from '~/components/Table';
import TableTab from '~/components/Table/TableTab';
import { ReadData } from '~/helpers';
import { useNavigateQuery, useScrollOnTop } from '~/hooks';
import { actionClientGetAllDataFromError } from '~/store/client/client.action';
import { IRootState } from '~/store/rootReducer';
import { ErrorDataType, GetAllDataFromErrorType } from '~/store/rootType';
import { SearchParams } from '~/types';

interface IExportXLNT {}

const fieldsList: {
  id: number;
  name: string;
  type: keyof ErrorDataType;
}[] = [
  { id: 1, name: 'ID', type: 'id' },
  { id: 2, name: 'Lỗi', type: 'error_message' },
  { id: 3, name: 'Ngày tạo', type: 'created_at' },
];

const ExportXLNT: React.FC<IExportXLNT> = ({}) => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const params = queryString.parse(search) as SearchParams;
  const {
    errorsData,
    loadingGetErrorsData,
    tableTotalPage,
    toggleForceRefetchClientErrorsData,
  } = useSelector((state: IRootState) => state.client);
  const { userData } = useSelector((state: IRootState) => state.auth);
  console.log('errorsData:', errorsData);

  const [tableCurrentPage, setTableCurrentPage] = useState<number>(
    Number.parseInt(params.page)
  );

  // Set lại state khi thay đổi query
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      setTableCurrentPage(Number.parseInt(params.page));
    }
    didMountRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const [orderField, setOrderField] =
    useState<GetAllDataFromErrorType['query']['orderField']>('id');
  const [orderType, setOrderType] =
    useState<GetAllDataFromErrorType['query']['orderType']>('DESC');

  useEffect(() => {
    dispatch(
      actionClientGetAllDataFromError({
        query: { orderField, orderType, page: tableCurrentPage },
        project_id: userData.project_id,
      })
    );
  }, [
    dispatch,
    orderField,
    orderType,
    tableCurrentPage,
    toggleForceRefetchClientErrorsData,
    userData.project_id,
  ]);

  // Thay đổi query
  useNavigateQuery({
    newPath: `/client/export?page=${tableCurrentPage}`,
    rerenderConditions: [tableCurrentPage],
  });

  return (
    <Section sectionTitle="DỮ LIỆU LỖI" isLoading={loadingGetErrorsData}>
      <div className="w-full mb-4">
        <div className="flex justify-end items-center w-full mb-4">
          <TableFilter
            setOrderField={setOrderField}
            setOrderType={setOrderType}
            fieldsList={fieldsList}
            initialType="DESC"
          />
        </div>
        <div className="relative w-full z-10">
          <TableBase>
            <thead>
              <tr>
                <th className="w-[48px]">#</th>
                <th className="w-[48px]">ID</th>
                <th className="text-left">Lỗi</th>
                <th className="w-[250px]">Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {!loadingGetErrorsData &&
                !!errorsData &&
                errorsData.length > 0 &&
                errorsData.map((errorData, index) => (
                  <tr key={errorData.id}>
                    <td>{10 * (tableCurrentPage - 1) + index + 1}</td>
                    <td>{errorData.id}</td>
                    <td className="text-left">
                      <span className="line-clamp-1">
                        {errorData.error_message}
                      </span>
                    </td>
                    <td>{ReadData.time(errorData.created_at)}</td>
                  </tr>
                ))}
              <TableLoading
                data={errorsData}
                loading={loadingGetErrorsData}
                currentPage={tableCurrentPage}
                nCol={3}
              />
            </tbody>
          </TableBase>
        </div>
        <Paginate
          currentPage={tableCurrentPage}
          setCurrentPage={setTableCurrentPage}
          totalPage={tableTotalPage}
        />
      </div>
    </Section>
  );
};

export { ExportXLNT };
