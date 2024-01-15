import axios from "axios";
import { useEffect, useState } from "react";
import { useChart } from "../../visualization/hooks/useChart";
import { useAppSelector } from "../../../contexts/file/hooks";

export const useLogisticRegression=()=>{
    const [normalization, setNormalization] = useState("MinMaxScaler");
  const [trainTestSplit, setTrainTestSplit] = useState(40);
  const [maxIter, setMaxIter] = useState(3);
  const [penalty, setPenalty] = useState("none");
  const { supervisedML } = useChart();
  const [evaluationResults, setEvaluationResults] = useState(null);
  const [targetVariable, setTargetVariable] = useState<string>("Select a Target");
  const address = import.meta.env.VITE_BACKEND_REQ_ADDRESS;
  const file_url = useAppSelector((state) => state.file.url);
  const optionsPlot=useAppSelector((state)=>state.file.optionsPlot);
  const [loader, setLoader] = useState<boolean>(false);

  const handleRunLogisticRegression = async () => {
    try {
      setLoader(true);
      const response = await axios.post(
        `${address}/api/logistic_regression/start/`,
        {
          file_url: file_url,
          target: targetVariable,
          normalization: normalization,
          train_test_split: trainTestSplit,
          max_iter: maxIter,
          penalty: penalty,
        }
      );
      console.log("Backend response received:", JSON.parse(response.data));
      setEvaluationResults(JSON.parse(response.data));
      setLoader(false);
    } catch (error) {
      console.error("Error during backend request:");
    }
  };

  return {normalization,setNormalization,trainTestSplit,setTrainTestSplit,maxIter,setMaxIter,penalty,setPenalty,evaluationResults,targetVariable,setTargetVariable,loader,handleRunLogisticRegression,optionsPlot,supervisedML}
}