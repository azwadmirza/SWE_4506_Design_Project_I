import HorizontalBarPlot from "./horizontal-bar";
import ScatterPlot from "./scatter";
import VerticalBarPlot from "./vertical-bar";
const PlotType = ({selectedValue,handleSelect,options,chartData}:IPlotType) => {
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
      {selectedValue === "Horizontal Bar Chart" && (
        <HorizontalBarPlot chartData={chartData}/>
      )}
      {selectedValue === "Vertical Bar Chart" && (
        <VerticalBarPlot chartData={chartData}/>
      )}
      {selectedValue === "Scatter Plot" && (
        <ScatterPlot chartData={chartData}/>
      )}
      </div> 
      );
}
 
export default PlotType;