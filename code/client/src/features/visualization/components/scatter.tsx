import { Scatter } from "react-chartjs-2";
import { isNumeric } from "../hooks/useChart";

interface IScatterPlotProps{
    chartData: {
        labels: string[];
        datasets: {
            label: string;
            data: string[];
            borderColor: string;
            borderWidth: number;
            backgroundColor: string[];
        }[];
    }
}
const ScatterPlot = ({chartData}:IScatterPlotProps) => {
  const isValidData = chartData.datasets.every((dataset) =>
    dataset.data.filter((value:any) => isNumeric(value)).length>0
  );
  const isValidLabel = chartData.labels.filter((label) => isNumeric(label)).length>0;
  if(isValidData && isValidLabel){
    return ( 
      <>
      <Scatter
      data={chartData}
      options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top"
            },
            title: {
              display: true,
              text: "Scatter Plot"
            }
          }
        }}/>
      </>
   );
  }
  else{
    return (
      <div className="class-chart">
        <p style={{color:"red"}}>Invalid Data For Scatter Plot: Requires Numeric Values for Both Dependent and Independent Variables</p>
      </div>
    )
  }
}
 
export default ScatterPlot;