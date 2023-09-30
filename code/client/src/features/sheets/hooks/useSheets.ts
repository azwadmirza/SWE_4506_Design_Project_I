import { useState } from "react"
import { renderGrid } from "../utils/grid-renderer";

export const useSheets=(fileID:string|undefined)=>{
    const [currentCell,setCurrentCell]=useState<string>("");
    const [viewValue,setViewValue]=useState<string>("");
    const [gridRows,setGridRows]=useState<JSX.Element[]>(renderGrid(setCurrentCell,setViewValue));
    const [loading,setLoading]=useState<boolean>(false);
    


    return {currentCell,gridRows,viewValue,setViewValue,loading}
}