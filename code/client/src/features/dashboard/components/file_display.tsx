import { useEffect, useState } from "react";
import "../assets/css/dashboard.css";
import { useAppDispatch, } from "../../../contexts/file/hooks";
// import { setFile, setFileId, setURL } from "../../../contexts/file/slice";
import axios from "axios";

const FileDisplay = () => {
  const dispatch = useAppDispatch();
  const user_id = localStorage.getItem("user_id");
  const [files, setFiles] = useState([]); // State to hold the fetched files
  useEffect(() => {
    const fetchData = async () => {
      try {
        const backendRes = await axios.get(
          `http://127.0.0.1:8000/api/file/getall/${user_id}`
        );

        const data = backendRes.data;

        // Set the fetched files to the state
        setFiles(data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [user_id, dispatch]);

  const handleFileOpen = (file: any) => {
    // Add logic to handle file opening
    console.log("Open file:", file);
  };

  return (
    <div className="dashboard">
    <h2>All Files</h2>

    {files.map((file: any) => (
      <div
        key={file.id}
        className="file-card"
        onClick={() => handleFileOpen(file)}
      >
        <img src={file.preview} alt="File Preview" />
        <p>{file.name}</p>
      </div>
    ))}
  </div>
  );
};

export default FileDisplay;
