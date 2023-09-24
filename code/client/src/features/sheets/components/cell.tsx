import { useState } from 'react';

type CellProps = {
  Key:string;
  type:string;
}

const Cell = ({Key,type}:CellProps) => {
  const [value, setValue] = useState(Key);

  const handleChange = (update_value:string) => {
    setValue(update_value);
  };

  return(
    <input type="text" style={{backgroundColor:type!=="cell"?"var(--customOrange)":"",fontWeight:type!=="cell"?"bold":""}} value={value} disabled={Key==="Index\\Columns"?true:false} onChange={(e)=>handleChange(e.target.value)}/>
  )
}

export default Cell;