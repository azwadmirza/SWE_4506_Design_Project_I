import { Bar } from "react-chartjs-2";
import { isNumeric } from "../hooks/useChart";

interface IBarPlotProps{
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

const VerticalBarPlot = ({chartData}:IBarPlotProps) => {
  const isValidData = chartData.datasets.every((dataset) =>
    dataset.data.filter((value:any) => isNumeric(value)).length>0
  );
  if(isValidData){
    return ( 
      <>
      <Bar
      data={chartData}
      options={{
        indexAxis:  "x",
        responsive: true,
        plugins: {
          legend: {
            position: "top"
          },
          title: {
            display: true,
            text: "Vertical Bar Plot"
          }
        }
      }}/>
      </>
   );
  }
  else{
    return (
      <div className="class-chart">
        <p style={{color:"red"}}>Invalid Data For Vertical Bar Plot: Requires Numeric Values for Dependent Variable</p>
      </div>
    )
  }
}
 
export default VerticalBarPlot;