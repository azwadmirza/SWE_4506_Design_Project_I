import axios from "axios";

async function saveToBackend(
    file_content: any,
    file_name: string,
    address: string,
  ) {
    const storedUserId = localStorage.getItem('user_id');
    const user_id = storedUserId ? JSON.parse(storedUserId) : null;
    const fileData = new FormData();
    fileData.append("file_content",file_content);
    fileData.append("file_name",file_name);
    fileData.append("user_id", user_id)
    return axios.post(`${address}/api/file/save/`, fileData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  export default saveToBackend;
