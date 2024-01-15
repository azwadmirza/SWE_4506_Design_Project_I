import { useEffect, useState } from "react";
import { useChart } from "../../visualization/hooks/useChart";
import { useAppSelector } from "../../../contexts/file/hooks";
import axios from "axios";

export const useLinearRegression=()=>{
    const [normalization, setNormalization] = useState("MinMaxScaler");
  const [trainTestSplit, setTrainTestSplit] = useState(40);
  const [maxIter, setMaxIter] = useState(3);
  const [smoothing, setSmoothing] = useState<number>(1);
  const { optionsPlot,supervisedML } = useChart();
  const [evaluationResults, setEvaluationResults] = useState(null);
  const [targetVariable, setTargetVariable] = useState<string | null>();
  const address = import.meta.env.VITE_BACKEND_REQ_ADDRESS;
  const file_url = useAppSelector((state) => state.file.url);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    if (optionsPlot && optionsPlot.length > 0) {
      setTargetVariable(optionsPlot.filter((option)=>supervisedML.get(option)==="Regression")[optionsPlot.length - 1]);
    }
  }, [optionsPlot]);

  const handleRunLinearRegression = async () => {
    try {
      console.log(targetVariable);
      setLoader(true);
      const response = await axios.post(`${address}/api/linear_regression/start/`, {
        file_url: file_url,
        target: targetVariable,
        normalization: normalization,
        train_test_split: trainTestSplit,
        max_iter: maxIter,
        smoothing: smoothing,
      });
      console.log("Backend response received:", JSON.parse(response.data));
      setEvaluationResults(JSON.parse(response.data));
      setLoader(false);
    } catch (error) {
      console.error("Error during backend request:");
    }
  };

  return {normalization,setNormalization,trainTestSplit,setTrainTestSplit,maxIter,setMaxIter,smoothing,setSmoothing,evaluationResults,targetVariable,setTargetVariable,loader,handleRunLinearRegression,optionsPlot,supervisedML}
}