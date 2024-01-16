import { Pagination } from "react-bootstrap";
import "../assets/css/pagination.css";

interface PaginationComponentProps {
  currentPage: number;
  handleFirstPageClick: () => void;
  handlePrevPageClick: () => void;
  handlePageChange: (pageNumber: number) => void;
  handleLastPageClick: () => void;
  handleNextPageClick: () => void;
  totalPages: number;
}

const PaginationComponent = ({
  currentPage,
  totalPages,
  handleNextPageClick,
  handleFirstPageClick,
  handlePageChange,
  handlePrevPageClick,
  handleLastPageClick,
}: PaginationComponentProps) => {

  const generateRange = (start: number, end: number) => {
    const range = [];
    for (let i = max(1,start); i <= min(end,totalPages); i++) {
      range.push(i);
    }
    return range;
  };

  const min=(a:number,b:number)=>{
    return (a<b)?a:b;
  }

  const max=(a:number,b:number)=>{
    return (a>b)?a:b;
  }

  return (
    <div className="d-flex justify-content-center mt-3 pagination">
      <Pagination>
        <Pagination.First
          onClick={handleFirstPageClick}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={handlePrevPageClick}
          disabled={currentPage === 1}
        />
        {generateRange(currentPage-1, currentPage+1).map((num) => (
            <Pagination.Item
              key={num}
              active={currentPage === num}
              onClick={() => handlePageChange(num)}
              onTouchStart={()=>handlePageChange(num)}
            >
              {num}
            </Pagination.Item>
          ))}
        <Pagination.Next
          onClick={handleNextPageClick}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={handleLastPageClick}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
