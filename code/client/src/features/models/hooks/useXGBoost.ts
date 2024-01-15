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

  const handleRunXGBoost = async () => {
    try {
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
        objective: objective
      });
      console.log("Backend response received:", JSON.parse(response.data));
      setEvaluationResults(JSON.parse(response.data));
      setLoader(false);
    } catch (error) {
      console.error("Error during backend request:");
    }
  };

  return {objective, setObjective,supervisedML,handleRunXGBoost,setTargetVariable, setNormalization, setTrainTestSplit, setMaxDepth, setSampleRatio, setRegAlpha, setRegLambda, setBooster, setTreeMethod, setGrowPolicy, evaluationResults,normalization, trainTestSplit, maxDepth, subsampleRatio, regAlpha, regLambda, booster, treeMethod, growPolicy,targetVariable,optionsPlot,loader}
}