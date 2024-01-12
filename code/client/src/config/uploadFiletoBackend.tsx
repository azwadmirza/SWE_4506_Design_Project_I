import axios from "axios";

async function uploadToBackend(
    file: any,
    address: string,
  ) {
    const storedUserId = localStorage.getItem('user_id');
    const user_id = storedUserId ? JSON.parse(storedUserId) : null;
    const fileData = new FormData();
    fileData.append("file",file);
    fileData.append("user_id", user_id)
    console.log(address)
    return axios.post(`http://127.0.0.1:8000/api/file/upload/`, fileData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  export default uploadToBackend;
