import DoghnutChartPlot from "./doghnut-chart";
import PieChartPlot from "./pie";

const ClassPlotType = ({selectedValue,handleSelect,options,chartData}:IPlotClassType) => {
    return ( 
    <div style={{marginBottom:"10px"}}>
        <label htmlFor="dropdown">Select an option: </label>
        <select id="dropdown" value={selectedValue} onChange={handleSelect} style={{marginLeft:"5px"}}>
          <option value="">Select...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <h2 style={{ textAlign: "center" }}>{selectedValue}</h2>
        {selectedValue==="Pie Chart" && (
          <PieChartPlot chartData={chartData}/>
        )}
        {selectedValue==="Doughnut Chart" && (
          <DoghnutChartPlot chartData={chartData}/>
        )}
      </div> 
      );
}
 
export default ClassPlotType;