interface IAxisSelectorProps{
    classSelect: number,
    handleClassSelect:(classIndex: number) => void,
    options: Array<string>
}

const AxisSelectorClass = ({classSelect,handleClassSelect,options}:IAxisSelectorProps) => {
    return ( 
        <div>
            <div>Class: 
            <select id="dropdown" value={classSelect} onChange={(e)=>handleClassSelect(Number(e.target.value))} style={{marginLeft:"5px",marginRight:"10px",marginBottom:"10px"}}>
          {options?.map((option,index) => (
            <option key={index} value={index}>
              {option}
            </option>
          ))}
          </select> </div>
        </div>
     );
}
 
export default AxisSelectorClass;