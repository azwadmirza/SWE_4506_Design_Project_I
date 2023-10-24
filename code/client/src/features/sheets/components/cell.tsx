import { useState } from 'react';

type CellProps = {
  Key:string;
  Value:string;
  type:string;
  setterCell:React.Dispatch<React.SetStateAction<string>>;
  setViewValue:React.Dispatch<React.SetStateAction<string>>;
}

const Cell = ({Key,Value,type,setterCell,setViewValue}:CellProps) => {
  const [value, setValue] = useState(Value);

  const handleChange = (update_value:string) => {
    setValue(update_value);
    setViewValue(update_value);
  };

  return(
    <input type="text" style={{backgroundColor:type!=="cell"?"var(--customOrange)":"",fontWeight:type!=="cell"?"bold":""}} value={value} disabled={Key==="Index\\Columns"?true:false} onClick={()=>{setterCell(Key);setViewValue(Value)}} onChange={(e)=>handleChange(e.target.value)}/>
  )
}

export default Cell;