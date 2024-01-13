import {useState} from 'react';

export const usePagination=(arrayComponents:any[]|undefined,itemsPerPage:number)=>{
  const totalPages = arrayComponents!==undefined?Math.ceil(arrayComponents.length / itemsPerPage):0;
  const [currentPage, setCurrentPage] = useState(1); 
  const handlePageChange = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };

  const handleFirstPageClick = () => {
    setCurrentPage(1);
  };

  const handlePrevPageClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPageClick = () => {
    if (currentPage < Math.ceil((arrayComponents?arrayComponents.length:0) / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleLastPageClick = () => {
    setCurrentPage(Math.ceil((arrayComponents?arrayComponents.length:0) / itemsPerPage));
  };


  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil((arrayComponents?arrayComponents.length:0) / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedarrayComponents = arrayComponents!==undefined?arrayComponents.slice(startIndex, endIndex):[];
  return {displayedarrayComponents,currentPage,totalPages,handlePageChange,handleFirstPageClick,handleLastPageClick,handleNextPageClick,handlePrevPageClick};
}