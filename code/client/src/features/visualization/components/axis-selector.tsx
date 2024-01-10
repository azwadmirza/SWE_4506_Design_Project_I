interface IAxisSelectorProps{
    dependantSelect: number,
    handleDependantSelect:(dependantIndex: number) => void,
    independantSelect: number,
    handleIndependantSelect: (independantIndex: number) => void,
    options: Array<string>
}

const AxisSelector = ({dependantSelect,handleDependantSelect,independantSelect,handleIndependantSelect,options}:IAxisSelectorProps) => {
    return ( 
        <div>
            <div>Independent Variable: 
            <select id="dropdown" value={independantSelect} onChange={(e)=>handleIndependantSelect(Number(e.target.value))} style={{marginLeft:"5px",marginRight:"10px",marginBottom:"10px"}}>
          {options?.map((option,index) => (
            <option key={index} value={index}>
              {option}
            </option>
          ))}
          </select> </div>
        
            <div>Dependent Variable:
            <select id="dropdown" value={dependantSelect} onChange={(e)=>handleDependantSelect(Number(e.target.value))} style={{marginLeft:"5px",marginRight:"5px",marginBottom:"10px"}}>
          {options?.map((option,index) => (
            <option key={index} value={index}>
              {option}
            </option>
          ))}
        </select></div>
        </div>
     );
}
 
export default AxisSelector;