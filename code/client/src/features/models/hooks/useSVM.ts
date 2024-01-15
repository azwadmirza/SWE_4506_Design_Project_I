import axios from "axios";
import { useAppSelector } from "../../../contexts/file/hooks";
import { useState } from "react";
import { useChart } from "../../visualization/hooks/useChart";

export const useSVM=(type:"classification"|"regression")=>{
    const [normalization, setNormalization] = useState("MinMaxScaler");
    const [trainTestSplit, setTrainTestSplit] = useState(40);
    const [degree, setDegree] = useState(3);
    const [maxIter, setMaxIter] = useState(20);
    const [kernel, setKernel] = useState("linear");
    const { supervisedML } = useChart();
    const optionsPlot = useAppSelector((state) => state.file.optionsPlot);
  
  const [evaluationResults, setEvaluationResults] = useState(null);
  const [targetVariable, setTargetVariable] = useState<string>("Select a Target");
  const address = import.meta.env.VITE_BACKEND_REQ_ADDRESS;
  const file_url = useAppSelector((state) => state.file.url);
  const [loader, setLoader] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [pca,setPca] = useState<boolean>(true);
  const [pcaFeatures, setPcaFeatures] = useState<number>(1);

  
  const handleInference = async ()=>{
    console.log( `SVM`+ type +`Inference Time..`);
  }
  const handleRunSVM = async () => {
    try {
      if (targetVariable === 'Select a Target') {
        setErrorMessage('Please select a target variable');
        return;
      }
      setErrorMessage('');
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

  
  const handleSwitchChange = (checked: boolean) => {
    setPca(!checked);
  };

  return {pcaFeatures,setPcaFeatures,handleInference,pca,handleSwitchChange,normalization,supervisedML,setNormalization,trainTestSplit,setTrainTestSplit,degree,setDegree,maxIter,setMaxIter,kernel,setKernel,evaluationResults,targetVariable,setTargetVariable,loader,errorMessage,handleRunSVM,optionsPlot}
}