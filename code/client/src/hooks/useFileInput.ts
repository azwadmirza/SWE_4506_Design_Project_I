import React, { useState, useEffect } from "react";
import axios from "axios";
import { parseCSV } from "../features/sheets/utils/csvParser";
import { parseXLSX } from "../features/sheets/utils/xlsxParser";
import { parseJSON } from "../features/sheets/utils/jsonParser";
import { useAppDispatch } from "../contexts/file/hooks";
import { setData, setFile } from "../contexts/file/slice";
import { fileAdapter } from "../features/sheets/utils/adapter";


export const useFileInput = () => {
  const dispatch=useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const allowedFormats = [
    "text/csv",
    "text/plain",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/json",
  ];

  const handleUploadClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const parseFile = async (file: File) => {
    const type = file.type;
    if (type==="text/csv") {
      const parsedCSV = await parseCSV(file);
      return parsedCSV;
    }
    else if(type=== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
      const parsedXLSX = await fileAdapter(file,parseXLSX);
      return parsedXLSX;
    }
    else if(type==="application/json"){
      const parsedJSON = await fileAdapter(file,parseJSON);
      return parsedJSON;
    }
    else {
      return null;
    }
  }

  const handleFileInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      
      console.log("File selected:", file.name);
      const type = file.type;
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const address = import.meta.env.VITE_BACKEND_REQ_ADDRESS;
      if (allowedFormats.includes(type)) {
        try {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "datanalytica");
          const parsedFile = await parseFile(file);
          dispatch(setFile(file));
          dispatch(setData(parsedFile!==null?parsedFile:[]));

          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          const data = response.data;
          if (data.secure_url) {
            setSelectedFile(file.name);
            setErrorMsg("");
            console.log("File uploaded to Cloudinary. URL:", data.secure_url);
            const fileData = new FormData();
            try {
              fileData.append("file_name", file.name);
              fileData.append("cloudinary_url", data.secure_url);
              fileData.append("parsedCSV",JSON.stringify(parsedFile));

              const response = await axios.post(
                `${address}/api/file/upload/`,
                fileData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
              const dataRes = response.data;
              if (dataRes.file_url) {
                setSelectedFile(file.name);
                setErrorMsg("");
                console.log(
                  "File uploaded to Cloudinary and Saved to Mongo. File URL:",
                  dataRes.file_url
                );
              } else {
                setErrorMsg(data.error);
                setSelectedFile(null);
                console.error("File upload error:", data.error);
              }
            } catch (error) {
              setErrorMsg("File Backend Request error");
              setSelectedFile(null);
              console.error("File Backend Request error:", error);
            }
          } else {
            setErrorMsg("Cloudinary upload error");
            setSelectedFile(null);
            console.error("Cloudinary upload error:", data.error);
          }
        } catch (error) {
          setErrorMsg("File upload error");
          setSelectedFile(null);
          console.error("File upload error:", error);
        }
      } else {
        setErrorMsg("Invalid file format");
        setSelectedFile(null);
      }
    }
  };
  useEffect(() => {
    if (errorMsg === "" && selectedFile != null) {
      console.log("Selected file:", selectedFile);
    } else if (errorMsg != "" && errorMsg != null) {
      console.log("Error message:", errorMsg);
    }
  }, [selectedFile, errorMsg]);

  return { handleUploadClick, handleFileInputChange };
};
