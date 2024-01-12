import axios from "axios";

async function saveToBackend(
    file_content: any,
    file_id: any,
    filename: string,
    address: string,
  ) {
    const storedUserId = localStorage.getItem('user_id');
    const user_id = storedUserId ? JSON.parse(storedUserId) : null;
    const fileData = new FormData();
    fileData.append("file_content",file_content);
    fileData.append("file_id",file_id);
    fileData.append("file_name",filename);
    fileData.append("user_id", user_id)
    return axios.post(`${address}/api/file/save/`, fileData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  export default saveToBackend;
