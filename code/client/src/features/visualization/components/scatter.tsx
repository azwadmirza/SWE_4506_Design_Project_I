import { Scatter } from "react-chartjs-2";

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
    dataset.data.every((value) => !isNaN(parseFloat(value)))
  );
  const isValidLabel = chartData.labels.every((label) => !isNaN(parseFloat(label)));
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