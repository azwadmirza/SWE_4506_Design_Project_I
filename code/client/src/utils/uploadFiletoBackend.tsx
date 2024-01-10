import axios from "axios";

async function uploadToBackend(
    file: any,
    // parsedFile: any[] | null,
    address: string,
  ) {
    const storedUserId = localStorage.getItem('user_id');
    const user_id = storedUserId ? JSON.parse(storedUserId) : null;
    const fileData = new FormData();
    fileData.append("file",file);
    // fileData.append("parsedCSV", JSON.stringify(parsedFile));
    fileData.append("user_id", user_id)
    return axios.post(`${address}/api/file/upload/`, fileData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  export default uploadToBackend;
