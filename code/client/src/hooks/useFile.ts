import { useState } from "react";
import { useAppDispatch } from "../contexts/file/hooks";
import { setData, setFile } from "../contexts/file/slice";
import { parseCSV } from "../features/sheets/utils/csvParser";
import { fileAdapter } from "../features/sheets/utils/adapter";
import { parseXLSX } from "../features/sheets/utils/xlsxParser";
import { parseJSON } from "../features/sheets/utils/jsonParser";
import { parseTxt } from "../features/sheets/utils/txtParser";
import uploadToBackend from "../utils/uploadFiletoBackend";


export const useFile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFileInformation] = useState<File | null>(null);
  const [delimiter, setDelimiter] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  
  

  const allowedFormats = [
    "text/csv",
    "text/plain",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/json",
  ];

  

  const parseFile = async (file: File) => {
    const type = file.type;
    if (type === "text/csv") {
      const parsedCSV = await parseCSV(file);
      return parsedCSV;
    } else if (type === "text/plain") {
      const parsedTxt = await parseTxt(file, delimiter);
      return parsedTxt;
    } else if (
      type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      const parsedXLSX = await fileAdapter(file, parseXLSX);
      return parsedXLSX;
    } else if (type === "application/json") {
      const parsedJSON = await fileAdapter(file, parseJSON);
      return parsedJSON;
    } else {
      return null;
    }
  };

  // async function uploadToCloudinary(formData: FormData) {
  //   const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  //   return axios.post(
  //     `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
  //     formData,
  //     {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     }
  //   );
  // }



  const FileInputSubmit = async (
    setShow: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
  
      if (!file) {
        setLoading(false);
        return;
      }
  
      const type = file.type;
      const address = import.meta.env.VITE_BACKEND_REQ_ADDRESS;
  
      if (!allowedFormats.includes(type)) {
        setErrorMsg("Invalid file format");
        setSelectedFile(null);
        setLoading(false);
        return;
      }
  
      if (file.type === "text/plain" && delimiter === "") {
        setErrorMsg("Please enter a delimiter for txt files");
        setLoading(false);
        return;
      }
  
      console.log("File selected:", file.name);
  
      const parsedFile = await parseFile(file);
  
      dispatch(setFile(file.name));
      dispatch(setData(parsedFile !== null ? parsedFile : []));
  
      const backendResponse = await uploadToBackend(
        file,
        // parsedFile,
        address,
      );
  
      const dataRes = backendResponse.data;
      setShow(false);
  
      if (dataRes.success) {
        setSelectedFile(file.name);
        setErrorMsg("");
      } else {
        setErrorMsg(dataRes.error);
        setSelectedFile(null);
      }
    } catch (error) {
      setErrorMsg("File upload error");
      setSelectedFile(null);
      console.error("File upload error:", error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };
  

  return {
    loading,
    file,
    setFileInformation,
    delimiter,
    setDelimiter,
    selectedFile,
    errorMsg,
    FileInputSubmit,
  };
};
