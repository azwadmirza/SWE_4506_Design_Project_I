import { useEffect, useMemo, useState } from "react";
import { useLinearChart } from "./useLinearChart";
import { useClassChart } from "./useClassChart";
import { useAppSelector } from "../../../contexts/file/hooks";
import { indexedDBConfig } from "../../../config/indexeddb";
import axios from "axios";


export const isNumeric=(value: any): boolean=>{
  try{
    return value !== "" && !isNaN(Number(value));
  }
  catch(error){
    return false;
  }
}

export const useChart = () => {
  const [loading, setLoading] = useState(true);
  const delimiter = useAppSelector((state) => state.file.delimiter);
  const [data, setData] = useState<any[] | null>([]);
  const type = useAppSelector((state) => state.file.type);
  const url = useAppSelector((state) => state.file.url);
  const id = useAppSelector((state) => state.file.file_id);
  const file_name = useAppSelector((state) => state.file.file);
  const uploaded_at = useAppSelector((state) => state.file.uploaded_at);
  const [labels, setLabels] = useState<string[]>([]);
  const [statistics, setStatistics] = useState<any[]>([]);

  function filterNumericColumns(table: any[][]): any {
    const number_labels: any[] = [];
    const dataset: number[][] = [];
    const labels = table[0];
    for (let i = 0; i < labels.length; i++) {
      const label = labels[i];
      const columnValues = table.slice(1).map((row) => row[i]);
      const numericValues = columnValues
        .filter((value) => isNumeric(value))
        .map((value) => Number(value));
        if(numericValues.length>0){
          number_labels.push(label);
          dataset.push(numericValues as number[]);
      }
    }
    return { labels: number_labels, values: dataset };
  }

  const getFile = async () => {
    try {
      if (url) {
        const open = await indexedDBConfig.openDatabase();
        if (open) {
          const fetchedData: any[] | null = await indexedDBConfig.getFileByURL(
            "byUrl",
            url,
            id,
            file_name,
            uploaded_at
          );
          setData(fetchedData ? fetchedData : [[]]);
          const result = filterNumericColumns(fetchedData ? fetchedData : []);
          setLabels(result.labels);
          const matrix = calculatePearsonCorrelationMatrix(result.values);
          setCorrelationMatrix(matrix);
          await getStatistics();
          setLoading(false);
        } else {
          throw Error("Database not opened");
        }
      }
    } catch (error) {
      await getStatistics();
      setLoading(false);
    }
  };

  const columns = useMemo(
    () =>
      statistics.length > 0
        ? Object.keys(statistics[0]).map((field) => ({
            Header: field,
            accessor: field,
          }))
        : [],
    [statistics]
  );

  const getStatistics = async () => {
    if (url) {
      await axios
        .post(
          import.meta.env.VITE_BACKEND_REQ_ADDRESS + "/api/file/get-stat/",
          {
            url: url,
            filetype: type,
            delimiter: delimiter,
          }
        )
        .then((response) => {
          const dataArray = Object.entries(JSON.parse(response.data)).map(
            ([field, value]) => {
              const fieldValue = typeof value === 'object' ? { ...value } : value;
              return { field, ...fieldValue };
            }
          );
          setStatistics(dataArray);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getFile();
  }, []);

  const [correlationMatrix, setCorrelationMatrix] = useState<number[][]>([]);

  const calculatePearsonCorrelationMatrix = (
    datasets: number[][]
  ): number[][] => {
    const numDatasets = datasets.length;
    const matrix: number[][] = Array.from({ length: numDatasets }, () =>
      Array(numDatasets).fill(0)
    );

    for (let i = 0; i < numDatasets; i++) {
      for (let j = i; j < numDatasets; j++) {
        const correlation = calculatePearsonCorrelation(
          datasets[i],
          datasets[j]
        );
        matrix[i][j] = correlation;
        matrix[j][i] = correlation;
      }
    }

    return matrix;
  };

  const calculatePearsonCorrelation = (
    arr1: number[],
    arr2: number[]
  ): number => {
    if (arr1.length !== arr2.length) {
      throw new Error(
        "Arrays must have the same length for correlation calculation."
      );
    }

    const n = arr1.length;

    const sumX = arr1.reduce((acc, val) => acc + val, 0);
    const sumY = arr2.reduce((acc, val) => acc + val, 0);

    const sumXY = arr1.reduce((acc, val, index) => acc + val * arr2[index], 0);

    const sumXSquare = arr1.reduce((acc, val) => acc + val ** 2, 0);
    const sumYSquare = arr2.reduce((acc, val) => acc + val ** 2, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt(
      (n * sumXSquare - sumX ** 2) * (n * sumYSquare - sumY ** 2)
    );

    return numerator / denominator;
  };

  const heatmapData = {
    z: correlationMatrix,
    x: labels,
    y: labels,
    type: "heatmap",
    colorscale: "Viridis",
  };

  const {
    chartData,
    options,
    handleSelect,
    selectedValue,
    optionsPlot,
    optionsMap,
    dependantIndex,
    handleDependant,
    independantIndex,
    handleIndependant,
  } = useLinearChart(data ? data : [[]]);
  const {
    classChartData,
    charterOptions,
    handleCharterSelect,
    selectedCharter,
    charterOptionsPlot,
    classIndex,
    handleClass,
  } = useClassChart(data ? data : [[]]);

  return {
    columns,
    statistics,
    heatmapData,
    chartData,
    options,
    handleSelect,
    selectedValue,
    optionsPlot,
    dependantIndex,
    handleDependant,
    independantIndex,
    handleIndependant,
    classChartData,
    charterOptions,
    handleCharterSelect,
    selectedCharter,
    charterOptionsPlot,
    classIndex,
    handleClass,
    optionsMap,
    loading,
  };
};
