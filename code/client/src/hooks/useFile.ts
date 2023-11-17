import { useState } from "react";
import { useAppDispatch } from "../contexts/file/hooks";
import { setData, setFile, setHTML } from "../contexts/file/slice";
import { parseCSV } from "../features/sheets/utils/csvParser";
import { parseTSV } from "../features/sheets/utils/tsvParser";
import { fileAdapter } from "../features/sheets/utils/adapter";
import { parseXLSX } from "../features/sheets/utils/xlsxParser";
import { parseJSON } from "../features/sheets/utils/jsonParser";
import axios from "axios";
import { parseTxt } from "../features/sheets/utils/txtParser";
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
    } else if (type === "text/tsv") {
      const parsedTSV = await parseTSV(file);
      return parsedTSV;
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

  async function getVisualizationData(file: any, delimiter: string) {
    return axios.post("http://127.0.0.1:5000/get_visualization", {
      url: file.secure_url,
      delimiter: delimiter,
    });
  }

  async function performImputation(file: any, address: string) {
    const tempData = new FormData();
    tempData.append("file", file);
    const imputationRes = await axios.post(
      `${address}/api/imputation/imputation/`,
      tempData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (imputationRes.data.imputedData) {
      return imputationRes.data.imputedData;
    } else {
      throw new Error("Imputation Failed");
    }
  }

  async function performNormalization(file: any, address: string) {
    const tempData = new FormData();
    tempData.append("parsedJSON", JSON.stringify(file));
    const normalizationRes = await axios.post(
      `${address}/api/norm/min-max/`,
      tempData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (normalizationRes.data.scaledData) {
      return normalizationRes.data.scaledData;
    } else {
      throw new Error("Normalization Failed");
    }
  }

  async function performOneHotEncoding(file: any, address: string) {
    const tempData = new FormData();
    tempData.append("parsedJSON", JSON.stringify(file));
    const oneHotEncodingRes = await axios.post(
      `${address}/api/one_hot_encoding/one_hot_encoding/`,
      tempData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (oneHotEncodingRes.data.encodedData) {
      return oneHotEncodingRes.data.encodedData;
    } else {
      throw new Error("One Hot Encoding Failed");
    }
  }

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

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "datanalytica");

      const parsedFile = await parseFile(file);

      dispatch(setFile(file.name));
      dispatch(setData(parsedFile !== null ? parsedFile : []));

      const cloudinaryResponse = await uploadToCloudinary(formData);
      const data = cloudinaryResponse.data;

      if (data.secure_url) {
        setSelectedFile(file.name);
        setErrorMsg("");
        console.log("File uploaded to Cloudinary. URL:", data.secure_url);
        const visualizationResponse = await getVisualizationData(
          data,
          delimiter
        );
        dispatch(setHTML(visualizationResponse.data.cloudinary_link));

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

          const imputedData = await performImputation(file, address);

          const scaledData = await performNormalization(imputedData, address);

          await performOneHotEncoding(scaledData, address);

          // console.log("Backend processes completed successfully");
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
