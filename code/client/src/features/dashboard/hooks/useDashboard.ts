import axios from "axios";
import { useEffect, useState } from "react";
import { indexedDBConfig } from "../../../config/indexeddb";

export const useDashboard = () => {
    const [files, setFiles] = useState([]);
    const [search,setSearch]=useState("");
    const [filteredFiles,setFilteredFiles]=useState([]);
    const [loading,setLoading]=useState(true);

    const fetchFiles = async () => {
        await indexedDBConfig.openDatabase();
        await indexedDBConfig.getAllFiles().then((res:any)=>{
            setFiles(res);
            setFilteredFiles(res);
            setLoading(false);
        })
    };

    useEffect(() => {
        fetchFiles();
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