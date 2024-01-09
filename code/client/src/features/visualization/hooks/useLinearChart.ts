import { useEffect, useState } from "react";
import { getColumnValues } from "../../sheets/utils/column-extractor";
import { useAppSelector } from "../../../contexts/auth/hooks";

export const useLinearChart = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [dependantIndex, setDependentIndex] = useState(0);
  const [independantIndex, setIndependantIndex] = useState(0);
  const [dependant, setDependant] = useState<string[]>([]);
  const [independant, setIndependant] = useState<string[]>([]);
  const jsonData = useAppSelector((state) => state.file.data)
  const optionsPlot = jsonData[0];
  const options = [
    { value: 'Horizontal Bar Chart', label: 'Horizontal Bar Chart' },
    { value: 'Vertical Bar Chart', label: 'Vertical Bar Chart' },
    { value: 'Scatter Plot', label: 'Scatter Plot' },
  ];

  useEffect(() => {
    handleDependant(dependantIndex);
    handleIndependant(independantIndex);
  }, [])

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };


  const handleDependant = (dependantIndex: number) => {
    setDependentIndex(dependantIndex);
    setDependant(getColumnValues(jsonData, dependantIndex));
  }

  const handleIndependant = (independantIndex: number) => {
    setIndependantIndex(independantIndex);
    setIndependant(getColumnValues(jsonData, independantIndex));
  }
  const chartData = {
    labels: independant,
    datasets: [
      {
        label: optionsPlot[dependantIndex] + " vs " + optionsPlot[independantIndex],
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