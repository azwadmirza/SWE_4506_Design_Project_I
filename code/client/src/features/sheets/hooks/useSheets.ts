import { useEffect, useState } from "react"
import { renderGrid } from "../utils/grid-renderer";

export const useSheets=(data:any[] )=>{
    const [currentCell,setCurrentCell]=useState<string>("");
    const [viewValue,setViewValue]=useState<string>("");
    const [gridRows,setGridRows]=useState<JSX.Element[]>([]);
    const [loading,setLoading]=useState<boolean>(false);

    useEffect(()=>{
       setGridRows(renderGrid(data,setCurrentCell,setViewValue));
    },[data])
    


    return {currentCell,gridRows,viewValue,setViewValue,loading}
}