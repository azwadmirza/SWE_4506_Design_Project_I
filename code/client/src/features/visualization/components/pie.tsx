import { Pie } from "react-chartjs-2";

interface IPieProps{
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
const PieChartPlot = ({chartData}:IPieProps) => {
    return ( 
        <div className="class-chart">
            <Pie
        data={chartData}
        options={{
            responsive: true,
            maintainAspectRatio: true,
            
          }}/>
        </div>
     );
}
 
export default PieChartPlot;