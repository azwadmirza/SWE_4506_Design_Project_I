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

const HorizontalBarPlot = ({chartData}:IBarPlotProps) => {
  const isValidData = chartData.datasets.every((dataset) =>
    dataset.data.filter((value:any) => isNumeric(value)).length>0
  );
  if(isValidData){
    return ( 
      <>
      <Bar
      data={chartData}
      options={{
          indexAxis:  "y",
          responsive: true,
          plugins: {
            legend: {
              position: "top"
            },
            title: {
              display: true,
              text: "Horizontal Bar Plot"
            }
          }
        }}/>
      </>
   );
  }
  else{
    return (
      <div className="class-chart">
        <p style={{color:"red"}}>Invalid Data For Horizontal Bar Plot: Requires Numeric Values for Dependent Variable</p>
      </div>
    )
  }
}
 
export default HorizontalBarPlot;