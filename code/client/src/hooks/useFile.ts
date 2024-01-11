import { useState } from "react";
import { useAppDispatch } from "../contexts/file/hooks";
import { setData, setDelimiter, setFile, setLoading, setType, setURL } from "../contexts/file/slice";
import { parseCSV } from "../features/sheets/utils/csvParser";
import { fileAdapter } from "../features/sheets/utils/adapter";
import { parseXLSX } from "../features/sheets/utils/xlsxParser";
import { parseJSON } from "../features/sheets/utils/jsonParser";
import axios from "axios";
import { parseTxt } from "../features/sheets/utils/txtParser";
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

  async function uploadToCloudinary(formData: FormData) {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    return axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  }

  async function uploadToBackend(
    file: any,
    parsedFile: any[] | null,
    address: string
  ) {
    const fileData = new FormData();
    fileData.append("file_name", file.name);
    fileData.append("cloudinary_url", file.secure_url);
    fileData.append("parsedCSV", JSON.stringify(parsedFile));

    return axios.post(`${address}/api/file/upload/`, fileData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  const FileInputSubmit = async (
    setShow: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoadingLocal(true);

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
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "datanalytica");
      dispatch(setLoading(true));
      const parsedFile = await parseFile(file);
      dispatch(setFile(file.name));
      dispatch(setData(parsedFile !== null ? parsedFile : []));

      const cloudinaryResponse = await uploadToCloudinary(formData);
      const data = cloudinaryResponse.data;

      if (data.secure_url) {
        setSelectedFile(file.name);
        setErrorMsg("");
        dispatch(setURL(data.secure_url));

        const backendResponse = await uploadToBackend(
          data,
          parsedFile,
          address
        );
        const dataRes = backendResponse.data;
        setShow(false);
        if (dataRes.file_url) {
          setSelectedFile(file.name);
          setErrorMsg("");
        } else {
          setErrorMsg(data.error);
          setSelectedFile(null);
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
