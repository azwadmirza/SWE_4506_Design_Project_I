import React, { useRef } from 'react';
import '../assets/css/dashboard.css'

function Dashboard() {
    const fileInputRef = useRef(null);

    const recentlyOpenedFiles = [
      { id: 1, name: 'Document 1', preview: 'src/assets/static/csv.jpg' },
      { id: 2, name: 'Document 2', preview: 'src/assets/static/csv.jpg' },
      { id: 3, name: 'Document 3', preview: 'src/assets/static/csv.jpg' },
    ];
  
    const openFileInput = () => {
      fileInputRef.current.click();
    };
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      // Handle the uploaded file as needed
      console.log('File uploaded:', file.name);
    };

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
          <button className="btn" onClick={openFileInput}>
            Choose a file
          </button>
          <input
            ref={fileInputRef}
            type="file"
            name="myfile"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard