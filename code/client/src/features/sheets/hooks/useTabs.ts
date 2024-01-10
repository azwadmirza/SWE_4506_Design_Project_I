import { SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../contexts/file/hooks";
import { parseFile } from "../../../utils/parse-file";
import axios from "axios";
import { setData } from "../../../contexts/file/slice";

export const useTabs = () => {
    const delimiter=useAppSelector((state)=>state.file.delimiter);
    const type=useAppSelector((state)=>state.file.type);
    const [toggle, setToggle] = useState(1);
    const url = useAppSelector((state) => state.file.url);
    const [loading,setLoading]=useState(false);
    const dispatch = useAppDispatch();
    function updateToggle(id: SetStateAction<number>) {
        setToggle(id);
    }

    const getFile=async()=>{
        setLoading(true);
        const file=await axios.get(url?url:"");
        const parsedFile = await parseFile(file.data,delimiter,type);
        console.log("parsedFile",parsedFile);
        dispatch(setData(parsedFile !== null ? parsedFile : []));
        setLoading(false);
    }

    useEffect(()=>{
        if(url){
            getFile();
        }
    },[url])

    return { updateToggle, toggle,loading }
}