import {  useState } from "react";
import { useChart } from "../../visualization/hooks/useChart";
import { useAppSelector } from "../../../contexts/file/hooks";
import axios from "axios";

export const useLinearRegression=()=>{
    const [normalization, setNormalization] = useState("MinMaxScaler");
  const [trainTestSplit, setTrainTestSplit] = useState(40);
  const optionsPlot=useAppSelector((state)=>state.file.optionsPlot);
  const { supervisedML } = useChart();
  const [evaluationResults, setEvaluationResults] = useState(null);
  const [targetVariable, setTargetVariable] = useState<string>("Select a Target");
  const address = import.meta.env.VITE_BACKEND_REQ_ADDRESS;
  const file_url = useAppSelector((state) => state.file.url);
  const [loader, setLoader] = useState<boolean>(false);
  const [loaderOptimize, setLoaderOptimize] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [pca,setPca] = useState<boolean>(false);
  const [pcaFeatures, setPcaFeatures] = useState<number>(1);
  
  const handleInference = async ()=>{
    console.log("Linear Regression Inference Time..");
    try {
      if (targetVariable === 'Select a Target') {
        setErrorMessage('Please select a target variable');
        return;
      }
      setErrorMessage('');
      setLoaderOptimize(true);
      const response = await axios.post(`${address}/api/optimized_model_search/regression/linear/`, {
        file_url: file_url,
        target_column: targetVariable,
      });
      console.log(response.data);
      const train_test_split = response.data.best_train_test_split
      setTrainTestSplit(train_test_split*100);

    } catch (error) {
      console.error("Error during backend request:");
    }
    setLoaderOptimize(false);
  }

  const handleRunLinearRegression = async () => {
    try {
      if (targetVariable === 'Select a Target') {
        setErrorMessage('Please select a target variable');
        return;
      }
      setErrorMessage('');
      console.log(targetVariable);
      setLoader(true);
      const response = await axios.post(`${address}/api/linear_regression/start/`, {
        file_url: file_url,
        target: targetVariable,
        normalization: normalization,
        train_test_split: trainTestSplit,
        pca: pca,
        pca_features: pcaFeatures
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

  return {loaderOptimize,pcaFeatures,setPcaFeatures,handleInference,pca,handleSwitchChange,normalization,setNormalization,trainTestSplit,setTrainTestSplit,evaluationResults,targetVariable,setTargetVariable,loader,handleRunLinearRegression,optionsPlot,errorMessage,supervisedML}
}