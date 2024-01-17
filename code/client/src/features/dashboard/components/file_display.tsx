import "../assets/css/dashboard.css";
import { usePagination } from "../hooks/usePagination";
import FileDisplayCard from "./file-display";
import PaginationComponent from "./pagination";

interface IFileDisplay{
  files:any[]|null
}

const FileDisplay = ({files}:IFileDisplay) => {
  const {displayedarrayComponents,currentPage,totalPages,handlePageChange,handleNextPageClick,handlePrevPageClick,handleFirstPageClick,handleLastPageClick}=usePagination(files?files:undefined,8);
  return (
    <div className="row mx-auto">
    {displayedarrayComponents && displayedarrayComponents.map((file: any,index) => (
      <FileDisplayCard filename={file.file_name} updatedAt={file.uploaded_at} file_id={file.id} url={file.cloudinary_url} index={index}/>
    ))}
    <PaginationComponent currentPage={currentPage} totalPages={totalPages} handleFirstPageClick={handleFirstPageClick} handleLastPageClick={handleLastPageClick} handlePageChange={handlePageChange} handleNextPageClick={handleNextPageClick} handlePrevPageClick={handlePrevPageClick}/>
  </div>
  );
};

export default FileDisplay;
