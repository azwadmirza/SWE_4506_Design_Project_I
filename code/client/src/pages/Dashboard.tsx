import { useState } from 'react';
import '../assets/css/dashboard.css';
import { useAppDispatch } from '../contexts/auth/hooks';
import { setFile, setFileId, setURL } from '../contexts/file/slice';
import axios from 'axios';
function Dashboard() {

    const recentlyOpenedFiles = [
      { id: 1, name: 'Document 1', preview: 'src/assets/static/csv.jpg' },
      { id: 2, name: 'Document 2', preview: 'src/assets/static/csv.jpg' },
      { id: 3, name: 'Document 3', preview: 'src/assets/static/csv.jpg' },
    ];

    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState<boolean>(false);
    const [file, setFileInformation] = useState<File | null>(null);
    const [delimiter, setDelimiter] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleFileChange = async (event) => {
      console.log(event.target.files[0])
      const file = event.target.files[0]
      const storedUserId = localStorage.getItem('user_id');
      const user_id = storedUserId ? JSON.parse(storedUserId) : null;
      const fileData = new FormData();
      fileData.append("file", file);
      // fileData.append("parsedCSV", JSON.stringify(parsedFile));
      fileData.append("user_id", user_id)
      const backendRes = await axios.post(`http://127.0.0.1:8000/api/file/upload/`, fileData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = backendRes.data
      console.log(data.file_url)

      localStorage.setItem('url', data.file_url)
      localStorage.setItem('file_id', data.file_id)
      localStorage.setItem('file', data.file_name)
      // dispatch(setURL(data.file_url))
      // dispatch(setFileId(data.file_id))
      // dispatch(setFile(data.file_name))
    }
  return (
    <div className="dashboard">
      <h2>Recently Opened Files</h2>

      {/* File Previews */}
      {recentlyOpenedFiles.map((file) => (
        <div key={file.id} className="file-preview">
          <img src={file.preview} alt="File Preview" />
          <p>{file.name}</p>
        </div>
      ))}

      {/* Upload Section */}
      <div className="upload-section">
        <h2>Upload New File</h2>

        <div className="upload-btn-wrapper">
            <label className='btn'>Upload
              <input type="file" onChange={handleFileChange}/>
            </label> 
        </div>
      </div>
    </div>
  )
}

export default Dashboard