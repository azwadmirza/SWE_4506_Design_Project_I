import axios from "axios";
import { useAppSelector } from "../../../contexts/file/hooks";
import { useEffect, useState } from "react";
import { useChart } from "../../visualization/hooks/useChart";

export const useSVM=(type:"classification"|"regression")=>{
    const [normalization, setNormalization] = useState("MinMaxScaler");
    const [trainTestSplit, setTrainTestSplit] = useState(40);
    const [degree, setDegree] = useState(3);
    const [maxIter, setMaxIter] = useState(20);
    const [kernel, setKernel] = useState("linear");
    const { optionsPlot,supervisedML } = useChart();

    useEffect(() => {
      if (optionsPlot && optionsPlot.length > 0) {
        if(type==="classification"){
          setTargetVariable(optionsPlot.filter((option)=>supervisedML.get(option)==="Classification")[optionsPlot.length - 1]);
        }
        else{
          setTargetVariable(optionsPlot.filter((option)=>supervisedML.get(option)==="Regression")[optionsPlot.length - 1]);
        }
      }
      }, [optionsPlot]);
  
  const [evaluationResults, setEvaluationResults] = useState(null);
  const [targetVariable, setTargetVariable] = useState<string | null>();
  const address = import.meta.env.VITE_BACKEND_REQ_ADDRESS;
  const file_url = useAppSelector((state) => state.file.url);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    if (optionsPlot && optionsPlot.length > 0) {
      setTargetVariable(optionsPlot[optionsPlot.length - 1]);
    }
  }, [optionsPlot]);

  const handleRunSVM = async () => {
    try {
      setLoader(true);
      const response = await axios.post(`${address}/api/svm/${type}/`, {
        file_url: file_url,
        target: targetVariable,
        normalization: normalization,
        train_test_split: trainTestSplit,
        max_iter: maxIter,
        kernel: kernel,
        degree: degree,
      });
      console.log("Backend response received:", JSON.parse(response.data));
      setEvaluationResults(JSON.parse(response.data));
      setLoader(false);
    } catch (error) {
      console.error("Error during backend request:");
    }
  };
  return {normalization,supervisedML,setNormalization,trainTestSplit,setTrainTestSplit,degree,setDegree,maxIter,setMaxIter,kernel,setKernel,evaluationResults,targetVariable,setTargetVariable,loader,handleRunSVM,optionsPlot}
}