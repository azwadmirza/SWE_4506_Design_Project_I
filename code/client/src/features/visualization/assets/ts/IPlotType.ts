interface IPlotType{
    selectedValue: string,
    handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    options: Array<{value:string,label:string}>,
    chartData:{
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