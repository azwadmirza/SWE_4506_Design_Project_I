import { useEffect, useState } from "react";
import { getColumnValues } from "../../sheets/utils/column-extractor";

export const useClassChart = (data:any[]) => {
  const [selectedCharter, setSelectedCharter] = useState('');
  const [classIndex, setClassIndex] = useState(0);
  const [labels, setLabels] = useState<string[]>([]);
  const [color,setColor]=useState<string[]>([]);
  const [classDistribution, setClass] = useState<number[]>([]);
  const [charterOptionsPlot,setCharterOptionsPlot]=useState<string[]>([]);
  useEffect(()=>{
    if(data.length>0){
      setCharterOptionsPlot(data[0]);
      handleClass(classIndex);
    }
  },[data])

  const charterOptions = [
    { value: 'Doughnut Chart', label: 'Doughnut Chart' },
    { value: 'Pie Chart', label: 'Pie Chart' },
  ];

  const handleCharterSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCharter(event.target.value);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleClass = (classIndex: number) => {
    setClassIndex(classIndex);
    if(data==null){
      return;
    }
    const fetchedData = getColumnValues(data, classIndex);
    const frequencyMap: Record<string, number> = {};
    fetchedData.forEach((element) => {
      if (frequencyMap[element]) {
        frequencyMap[element]++;
      } else {
        frequencyMap[element] = 1;
      }
    });
    setLabels(Object.keys(frequencyMap));
    setClass(Object.values(frequencyMap));
    setColor(Object.keys(frequencyMap).map((_) => getRandomColor()));
  }


  const classChartData = {
    labels: labels,
    datasets: [
      {
        label: "Class Distribution For " + String(charterOptionsPlot.length>0?charterOptionsPlot[classIndex]:""),
        data: classDistribution,
        backgroundColor: color,
        hoverBackgroundColor: color,
      }
    ]
  }

  return {classChartData, charterOptions, handleCharterSelect, selectedCharter, charterOptionsPlot, classIndex, handleClass }
}