import "../assets/css/dashboard.css";
import FileDisplayCard from "./file-display";

interface IFileDisplay{
  files:any[]|null
}

const FileDisplay = ({files}:IFileDisplay) => {
  return (
    <div className="row mx-auto">
    {files && files.map((file: any) => (
      <FileDisplayCard filename={file.file_name} updatedAt={new Date(file.uploaded_at).toLocaleDateString()+" "+new Date(file.uploaded_at).toLocaleTimeString()} file_id={file.id} url={file.cloudinary_url}/>
    ))}
  </div>
  );
};

export default FileDisplay;
