import { Doughnut } from "react-chartjs-2";

interface IDoughnutProps{
    chartData: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            backgroundColor: string[];
            hoverBackgroundColor: string[];
        }[];
    }
}
const DoghnutChartPlot = ({chartData}:IDoughnutProps) => {
    return ( 
        <div className="class-chart">
            <Doughnut
        data={chartData}
        options={{
            responsive: true,
            maintainAspectRatio: true,
            
          }}/>
        </div>
     );
}
 
export default DoghnutChartPlot;