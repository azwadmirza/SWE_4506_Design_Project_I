import { useState } from "react";
import { useChart } from "../../visualization/hooks/useChart";
import { useAppSelector } from "../../../contexts/file/hooks";
import axios from "axios";

export const useXGBoost=(type:"regression"|"classification")=>{
    const [normalization, setNormalization] = useState("MinMaxScaler");
  const [trainTestSplit, setTrainTestSplit] = useState(40);
  const [maxDepth, setMaxDepth] = useState(6);
  const [subsampleRatio, setSampleRatio] = useState(0.5);
  const [regAlpha, setRegAlpha] = useState(0);
  const [regLambda, setRegLambda] = useState(0);
  const [loader,setLoader]=useState(false);
  const [loaderOptimize, setLoaderOptimize] = useState<boolean>(false);
  const [booster, setBooster] = useState("dart");
  const [treeMethod, setTreeMethod] = useState("hist");
  const [growPolicy, setGrowPolicy] = useState("depthwise");
  const optionsPlot=useAppSelector((state)=>state.file.optionsPlot);
  const { supervisedML } = useChart();
  const [evaluationResults, setEvaluationResults] = useState<any>();
  const [targetVariable, setTargetVariable] = useState<string>("Select a Target");
  const [objective, setObjective] = useState(type==="regression"?"reg:squarederror":"binary:logistic");
  const address = import.meta.env.VITE_BACKEND_REQ_ADDRESS;
  const file_url = useAppSelector((state) => state.file.url);
  const [errorMessage, setErrorMessage] = useState('');
  const [pca,setPca] = useState<boolean>(false);
  const [pcaFeatures, setPcaFeatures] = useState<number>(1);

  const handleInference = async ()=>{
    console.log("XGBoost " + type +" Inference Time..");
    try {
      if (targetVariable === 'Select a Target') {
        setErrorMessage('Please select a target variable');
        return;
      }
      setErrorMessage('');
      setLoaderOptimize(true);
      const response = await axios.post(`${address}/api/optimized_model_search/${type}/xgboost/`, {
        file_url: file_url,
        target_column: targetVariable,
      });
      console.log(response.data);
      const train_test_split = response.data.best_train_test_split
      const hyperparametersObject = JSON.parse(response.data.best_hyperparameters);
      let optimalDepth;
      let optimalBooster;
      let optimalTree;
      let optimalGrow;
      let optimalAlpha;
      let optimalLamda;
      let optimalSubSample;
      let optimalObjective;
      
      if (type == "classification") {
        optimalDepth = hyperparametersObject.xgbclassifier__max_depth;
        optimalBooster = hyperparametersObject.xgbclassifier__booster;
        optimalTree = hyperparametersObject.xgbclassifier__tree_method;
        optimalGrow = hyperparametersObject.xgbclassifier__grow_policy;
        optimalAlpha = hyperparametersObject.xgbclassifier__reg_alpha;
        optimalLamda = hyperparametersObject.xgbclassifier__reg_lambda;
        optimalSubSample = hyperparametersObject.xgbclassifier__subsample;
        optimalObjective = hyperparametersObject.xgbclassifier__objective;
      }else{
        optimalDepth = hyperparametersObject.xgbregressor__max_depth;
        optimalBooster = hyperparametersObject.xgbregressor__booster;
        optimalTree = hyperparametersObject.xgbregressor__tree_method;
        optimalGrow = hyperparametersObject.xgbregressor__grow_policy;
        optimalAlpha = hyperparametersObject.xgbregressor__reg_alpha;
        optimalLamda = hyperparametersObject.xgbregressor__reg_lambda;
        optimalSubSample = hyperparametersObject.xgbregressor__subsample;
        optimalObjective = hyperparametersObject.xgbregressor__objective;
      }
      setTrainTestSplit(train_test_split * 100);

    } catch (error) {
      console.error("Error during backend request:");
    }
    setLoaderOptimize(false);
  }

  const handleRunXGBoost = async () => {
    try {
      if (targetVariable === 'Select a Target') {
        setErrorMessage('Please select a target variable');
        return;
      }
      setErrorMessage('');
      setLoader(true);
      const response = await axios.post(`${address}/api/xgboost/${type}/`, {
        file_url: file_url,
        target: targetVariable,
        normalization: normalization,
        train_test_split: trainTestSplit,
        max_depth: maxDepth,
        booster: booster,
        tree_method: treeMethod,
        grow_policy: growPolicy,
        reg_alpha: regAlpha,
        reg_lambda: regLambda,
        subsample_ratio: subsampleRatio,
        objective: objective,
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

  return {loaderOptimize,pcaFeatures,setPcaFeatures,handleInference,pca,handleSwitchChange,objective,setObjective, supervisedML,handleRunXGBoost,setTargetVariable, setNormalization, setTrainTestSplit, setMaxDepth, setSampleRatio, setRegAlpha, setRegLambda, setBooster, setTreeMethod, setGrowPolicy, evaluationResults,normalization, trainTestSplit, maxDepth, subsampleRatio, regAlpha, regLambda, booster, treeMethod, growPolicy,targetVariable,errorMessage,optionsPlot,loader}
}