import { useState } from "react"
import { renderGrid } from "../utils/grid-renderer";

export const useSheets=(fileID:string|undefined)=>{
    const [currentCell,setCurrentCell]=useState<string>("");
    const [viewValue,setViewValue]=useState<string>("");
    const [gridRows]=useState<JSX.Element[]>(renderGrid(setCurrentCell,setViewValue));
    

    


    return {currentCell,gridRows,viewValue,setViewValue}
}