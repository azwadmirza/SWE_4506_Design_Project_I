import axios from "axios";
import { useEffect, useState } from "react";

export const useDashboard = () => {
    const [files, setFiles] = useState([]);
    const [search,setSearch]=useState("");
    const [filteredFiles,setFilteredFiles]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND_REQ_ADDRESS + "/api/file/getall/" + localStorage.getItem("user_id")).then((res) => {
            setFiles(res.data);
            setFilteredFiles(res.data);
            setLoading(false);
        });
    }, [])

    const handleSearch=(e:string)=>{
        console.log(e);
        setSearch(e);
        if(e===""){
            setFilteredFiles(files);
        }
        else{
            console.log(e);
            console.log(files);
            setFilteredFiles(files.filter((file:any)=>file.file_name.toLowerCase().includes(e.toLowerCase())));
        }
    }

    return {loading,filteredFiles,search,handleSearch}
}