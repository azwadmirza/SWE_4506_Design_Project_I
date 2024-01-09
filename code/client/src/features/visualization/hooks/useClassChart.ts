import { useEffect, useState } from "react";
import { getColumnValues } from "../../sheets/utils/column-extractor";
import { useAppSelector } from "../../../contexts/auth/hooks";

export const useClassChart = () => {
  const [selectedCharter, setSelectedCharter] = useState('');
  const [classIndex, setClassIndex] = useState(0);
  const [labels, setLabels] = useState<string[]>([]);
  const [color,setColor]=useState<string[]>([]);
  const [classDistribution, setClass] = useState<number[]>([]);
  const jsonData = useAppSelector((state) => state.file.data)
  const [loading,setLoading]=useState(false);
  const [charterOptionsPlot,setCharterOptionsPlot]=useState<string[]>(jsonData[0]);
  const charterOptions = [
    { value: 'Doughnut Chart', label: 'Doughnut Chart' },
    { value: 'Pie Chart', label: 'Pie Chart' },
  ];

  useEffect(()=>{
    handleClass(classIndex);
  },[])

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
    setLoading(true);
    setClassIndex(classIndex);
    const data = getColumnValues(jsonData, classIndex);
    const frequencyMap: Record<string, number> = {};
    data.forEach((element) => {
      if (frequencyMap[element]) {
        frequencyMap[element]++;
      } else {
        frequencyMap[element] = 1;
      }
    });
    setLabels(Object.keys(frequencyMap));
    setClass(Object.values(frequencyMap));
    setColor(Object.keys(frequencyMap).map((_) => getRandomColor()));
    setLoading(false);
  }


  const classChartData = {
    labels: labels,
    datasets: [
      {
        label: "Class Distribution For " + charterOptionsPlot[classIndex],
        data: classDistribution,
        backgroundColor: color,
        hoverBackgroundColor: color,
      }
    ]
  }

  return { loading,classChartData, charterOptions, handleCharterSelect, selectedCharter, charterOptionsPlot, classIndex, handleClass }
}