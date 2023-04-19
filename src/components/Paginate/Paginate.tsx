import ReactPaginate from 'react-paginate';
import './Paginate.scss';

type IPaginate = {
  setCurrentPage: (newPage: number) => void;
  totalPage: number;
  currentPage: number;
};

const Paginate: React.FC<IPaginate> = ({
  setCurrentPage,
  totalPage,
  currentPage,
}) => {
  const handlePageClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent> & { selected: number }
  ) => {
    setCurrentPage(event.selected + 1);
  };
  const prevElement = (
    <i className="bx bx-chevron-left inline-flex items-center justify-center mt-[1px] !text-lg"></i>
  );
  const nextElement = (
    <i className="bx bx-chevron-right inline-flex items-center justify-center mt-[1px] !text-lg"></i>
  );

  return (
    <div className="flex w-full justify-end items-center">
      <ReactPaginate
        breakLabel="..."
        nextLabel={nextElement}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={totalPage <= 99 ? totalPage : 99}
        previousLabel={prevElement}
        // initialPage={currentPage - 1}
        forcePage={currentPage - 1}
        disableInitialCallback={true}
        renderOnZeroPageCount={undefined}
        className="main-paginate"
      />
    </div>
  );
};

export default Paginate;
