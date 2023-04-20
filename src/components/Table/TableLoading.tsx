interface ITableLoading {
  loading: boolean;
  data: any[];
  currentPage: number;
  nCol: number;
}

const TableLoading: React.FC<ITableLoading> = ({
  data,
  loading,
  nCol,
  currentPage,
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
              <td>{10 * (currentPage - 1) + data.length + index + 1}</td>
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
              <td>{10 * (currentPage - 1) + index + 1}</td>
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
