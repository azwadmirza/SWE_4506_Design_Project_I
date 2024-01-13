import { useEffect, useState } from "react";
import { getColumnValues } from "../../sheets/utils/column-extractor";

export const useLinearChart = (data:any[]) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [dependantIndex, setDependentIndex] = useState(0);
  const [independantIndex, setIndependantIndex] = useState(0);
  const [dependant, setDependant] = useState<string[]>([]);
  const [independant, setIndependant] = useState<string[]>([]);
  const [optionsPlot,setOptionsPlot]=useState<string[]>([]);

  useEffect(()=>{
    if(data && data.length>0){
      setOptionsPlot(data[0]);
      handleDependant(dependantIndex);
      handleIndependant(independantIndex);
    }
  },[data])

  const options = [
    { value: 'Horizontal Bar Chart', label: 'Horizontal Bar Chart' },
    { value: 'Vertical Bar Chart', label: 'Vertical Bar Chart' },
    { value: 'Scatter Plot', label: 'Scatter Plot' },
  ];

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };


  const handleDependant = (dependantIndex: number) => {
    setDependentIndex(dependantIndex);
    if(data){
      setDependant(getColumnValues(data, dependantIndex));
    }
  }

  const handleIndependant = (independantIndex: number) => {
    setIndependantIndex(independantIndex);
    if(data){
      setIndependant(getColumnValues(data, independantIndex));
    }
  }
  const chartData = {
    labels: independant,
    datasets: [
      {
        label:optionsPlot.length>0?optionsPlot[dependantIndex] + " vs " + optionsPlot[independantIndex]:"",
        data: dependant,
        borderColor: "black",
        borderWidth: 2,
        backgroundColor: [
          "rgba(253, 166, 74, 0.6)",
        ]
      }
    ]
  }

  return { chartData, options, handleSelect, selectedValue, optionsPlot, dependantIndex, handleDependant, independantIndex, handleIndependant }
}