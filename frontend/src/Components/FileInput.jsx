import React, {useState} from 'react'

function FileInput() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  const handleFileInput = (event)=>{
    const type = event.target.files[0].type
    if(type === "text/csv" || type === "text/plain" || type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
      const file = event.target.files[0]
      setSelectedFile(file)
      setErrorMsg(" ")
    }else{
      setErrorMsg("Invalid file format")
      setSelectedFile(null)
    }
  }
  return (
    <div>
      <input type="file" onChange={handleFileInput}/>
      {selectedFile && (<p>File name: {selectedFile.name}</p>)}
      {errorMsg && (<p>{errorMsg}</p>)}
    </div>
  )
}

export default FileInput