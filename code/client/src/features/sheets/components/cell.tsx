import { useState } from 'react';

type CellProps = {
  Key:string;
  type:string;
  setterCell:React.Dispatch<React.SetStateAction<string>>;
  setViewValue:React.Dispatch<React.SetStateAction<string>>;
}

const Cell = ({Key,type,setterCell,setViewValue}:CellProps) => {
  const [value, setValue] = useState(type==="cell"?"":Key);

  const handleChange = (update_value:string) => {
    setValue(update_value);
    setViewValue(update_value);
  };

  return(
    <input type="text" style={{backgroundColor:type!=="cell"?"var(--customOrange)":"",fontWeight:type!=="cell"?"bold":""}} value={value} disabled={Key==="Index\\Columns"?true:false} onClick={()=>{setterCell(Key);setViewValue("")}} onChange={(e)=>handleChange(e.target.value)}/>
  )
}

export default Cell;