import { useState } from "react";
import { useAppDispatch } from "../contexts/file/hooks";
import { setData, setDelimiter, setFile, setLoading, setType, setURL } from "../contexts/file/slice";
import { parseCSV } from "../features/sheets/utils/csvParser";
import { fileAdapter } from "../features/sheets/utils/adapter";
import { parseXLSX } from "../features/sheets/utils/xlsxParser";
import { parseJSON } from "../features/sheets/utils/jsonParser";
import { parseTxt } from "../features/sheets/utils/txtParser";
import uploadToBackend from "../utils/uploadFiletoBackend";


export const useFile = () => {
  const [loading, setLoadingLocal] = useState<boolean>(false);
  const [file, setFileInformation] = useState<File | null>(null);
  const [delimiter, setDelimiterLocal] = useState<string>("");
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
    dispatch(setDelimiter(delimiter));
    const type = file.type;
    dispatch(setType(type));
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



  const FileInputSubmit = async (
    setShow: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
  
      if (!file) {
        setLoadingLocal(false);
        return;
      }
  
      const type = file.type;
      const address = import.meta.env.VITE_BACKEND_REQ_ADDRESS;
  
      if (!allowedFormats.includes(type)) {
        setErrorMsg("Invalid file format");
        setSelectedFile(null);
        setLoadingLocal(false);
        return;
      }
  
      if (file.type === "text/plain" && delimiter === "") {
        setErrorMsg("Please enter a delimiter for txt files");
        setLoadingLocal(false);
        return;
      }
  
      console.log("File selected:", file.name);
  
      const parsedFile = await parseFile(file);
  
      dispatch(setFile(file.name));
      dispatch(setData(parsedFile !== null ? parsedFile : []));
  
      const backendResponse = await uploadToBackend(
        file,
        address,
      )

      console.log(backendResponse);
  
      const dataRes = backendResponse.data;
      dispatch(setURL(dataRes.file_url));
      setShow(false);
  
      if (!dataRes.success) {
        setErrorMsg(dataRes.error);
        setSelectedFile(null);
      } else {
        setErrorMsg("");
      }
    } catch (error) {
      setErrorMsg("File upload error");
      setSelectedFile(null);
      console.error("File upload error:", error);
    } finally {
      setLoadingLocal(false);
    }
  };
  

  return {
    loading,
    file,
    setFileInformation,
    delimiter,
    setDelimiterLocal,
    selectedFile,
    errorMsg,
    FileInputSubmit,
  };
};
