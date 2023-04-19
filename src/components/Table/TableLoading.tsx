interface ITableLoading {
  loading: boolean;
  data: any[];
  page: number;
  nCol: number;
}

const TableLoading: React.FC<ITableLoading> = ({
  data,
  loading,
  nCol,
  page,
}) => {
  return (
    <>
      {!loading &&
        !!data &&
        data.length < 10 &&
        Array(10 - data.length)
          .fill('')
          .map((item, index) => (
            <tr key={`empty-${index}`}>
              <td>{10 * (page - 1) + data.length + index + 1}</td>
              {Array(nCol)
                .fill('')
                .map((cell, cellIndex) => (
                  <td key={`empty-${index}-${cellIndex}`}></td>
                ))}
            </tr>
          ))}
      {(loading || !data) &&
        Array(10)
          .fill('')
          .map((item, index) => (
            <tr key={`empty-${index}`}>
              <td>{10 * (page - 1) + index + 1}</td>
              {Array(nCol)
                .fill('')
                .map((cell, cellIndex) => (
                  <td key={`emptyLoading-${index}-${cellIndex}`}></td>
                ))}
            </tr>
          ))}
    </>
  );
};

export { TableLoading };
