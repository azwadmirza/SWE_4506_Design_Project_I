import { useEffect, useState } from "react";
import { useChart } from "../../visualization/hooks/useChart";
import { useAppSelector } from "../../../contexts/file/hooks";
import axios from "axios";

export const useXGBoost=()=>{
    const [normalization, setNormalization] = useState("MinMaxScaler");
  const [trainTestSplit, setTrainTestSplit] = useState(40);
  const [maxDepth, setMaxDepth] = useState(6);
  const [subsampleRatio, setSampleRatio] = useState(0.5);
  const [regAlpha, setRegAlpha] = useState(0);
  const [regLambda, setRegLambda] = useState(0);
  const [booster, setBooster] = useState("dart");
  const [treeMethod, setTreeMethod] = useState("hist");
  const [growPolicy, setGrowPolicy] = useState("depthwise");
  const { optionsPlot,optionsMap } = useChart();
  const [evaluationResults, setEvaluationResults] = useState(null);
  const [targetVariable, setTargetVariable] = useState<string | null>();
  const address = import.meta.env.VITE_BACKEND_REQ_ADDRESS;
  const file_url = useAppSelector((state) => state.file.url);

  useEffect(() => {
    if (optionsPlot && optionsPlot.length > 0) {
      setTargetVariable(optionsPlot[optionsPlot.length - 1]);
    }
  }, [optionsPlot]);

  

  const handleRunXGBoost = async () => {
    try {
      const response = await axios.post(`${address}/api/xgboost/start/`, {
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
        subsample_ratio: subsampleRatio
      });
      console.log("Backend response received:", JSON.parse(response.data));
      setEvaluationResults(JSON.parse(response.data));
    } catch (error) {
      console.error("Error during backend request:");
    }
  };

  return {handleRunXGBoost,setTargetVariable, setNormalization, setTrainTestSplit, setMaxDepth, setSampleRatio, setRegAlpha, setRegLambda, setBooster, setTreeMethod, setGrowPolicy, evaluationResults,normalization, trainTestSplit, maxDepth, subsampleRatio, regAlpha, regLambda, booster, treeMethod, growPolicy,targetVariable,optionsPlot,optionsMap}
}