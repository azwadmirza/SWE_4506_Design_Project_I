import { useEffect, useState } from "react"
import { renderGrid } from "../utils/grid-renderer";
import { useAppSelector } from "../../../contexts/file/hooks";

export const useSheets=()=>{
    const [currentCell,setCurrentCell]=useState<string>("");
    const [viewValue,setViewValue]=useState<string>("");
    const [gridRows,setGridRows]=useState<JSX.Element[]>([]);
    const [loading,setLoading]=useState<boolean>(false);
    const data = useAppSelector((state) => state.file.data);

    const render=async()=>{
        setGridRows(await renderGrid(data,setCurrentCell,setViewValue,setLoading));
    }

    useEffect(()=>{
        setLoading(true);
       render();
    },[data])
    


    return {currentCell,gridRows,viewValue,setViewValue,loading}
}