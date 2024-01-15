import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../contexts/file/hooks";
import { useChart } from "../../visualization/hooks/useChart";

export const useDecisionTreeClassification = () => {
    const [normalization, setNormalization] = useState("MinMaxScaler");
  const [trainTestSplit, setTrainTestSplit] = useState(40);
  const [maxDepth, setMaxDepth] = useState(3);
  const [criterion, setCriterion] = useState("gini");
  const { optionsPlot,supervisedML } = useChart();
  const [evaluationResults, setEvaluationResults] = useState(null);
  const [targetVariable, setTargetVariable] = useState<string | null>();
  const address = import.meta.env.VITE_BACKEND_REQ_ADDRESS;
  const file_url = useAppSelector((state) => state.file.url);
  const [loader, setLoader] = useState<boolean>(false);
  const [error,setError]=useState<string>();

  useEffect(() => {
    if (optionsPlot && optionsPlot.length > 0) {
      const filteredOptions=optionsPlot.filter((option)=>supervisedML.get(option)==="Classification");
      if(filteredOptions.length>0){
        setTargetVariable(filteredOptions[filteredOptions.length - 1]);
      }
      else{
        setError("No classification variables found");
      }
    }
    else{
      setError("No variables found");
    }
  }, [optionsPlot]);

  const handleRunDecisionTree = async () => {
    try {
      setLoader(true);
      const response = await axios.post(`${address}/api/decision_tree/classification/`, {
        file_url: file_url,
        target: targetVariable,
        normalization: normalization,
        train_test_split: trainTestSplit,
        max_depth: maxDepth,
        criterion: criterion,
      });
      setEvaluationResults(JSON.parse(response.data));
      setLoader(false);
    } catch (error) {
      console.error("Error during backend request:");
    }
  };

  return {supervisedML,targetVariable,setTargetVariable,optionsPlot,normalization, setNormalization, trainTestSplit, setTrainTestSplit, maxDepth, setMaxDepth, criterion, setCriterion, evaluationResults, handleRunDecisionTree, loader}
}