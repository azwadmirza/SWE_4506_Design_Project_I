import axios from "axios";
import { useAppSelector } from "../../../contexts/file/hooks";
import { useEffect, useState } from "react";
import { round, sqrt } from "mathjs";
import { useChart } from "../../visualization/hooks/useChart";

export const useKNN=(type:"classification"|"regression")=>{
  const [normalization, setNormalization] = useState("MinMaxScaler");
  const [trainTestSplit, setTrainTestSplit] = useState(20);
  const [minkowskiMetric, setMinkowskiMetric] = useState(2);
  const [algorithm, setAlgorithm] = useState("auto");
  const [distanceMetric, setDistanceMetric] = useState("euclidean");
  const [weights, setWeights] = useState("uniform");
  const optionsPlot = useAppSelector((state) => state.file.optionsPlot);
  const { supervisedML } = useChart();
  const [n_neighbours, setNNeighbours] = useState(5);
  const [errorMessage, setErrorMessage] = useState('');
  const [pca,setPca] = useState<boolean>(false);

  useEffect(()=>{
    if(distanceMetric==="euclidean"){
      setMinkowskiMetric(2)
    }
    else if(distanceMetric==="manhattan"){
      setMinkowskiMetric(1)
    }
  },[distanceMetric])

  useEffect(()=>{
    setNNeighbours(parseInt(String(round(sqrt(optionsPlot.length))))?parseInt(String(round(sqrt(optionsPlot.length)))):5);
  },[optionsPlot])
  
  const [evaluationResults, setEvaluationResults] = useState(null);
  const [targetVariable, setTargetVariable] = useState<string>("Select a Target");
  const address = import.meta.env.VITE_BACKEND_REQ_ADDRESS;
  const file_url = useAppSelector((state) => state.file.url);
  const [loader, setLoader] = useState<boolean>(false);

  
  const handleInference = async ()=>{
    console.log( `KNN`+ type +`Inference Time..`);
  }

  const handleRunKNN = async () => {
    try {
      if (targetVariable === 'Select a Target') {
        setErrorMessage('Please select a target variable');
        return;
      }
      setErrorMessage('');
      setLoader(true);
      const response = await axios.post(`${address}/api/knn/${type}/`, {
        file_url: file_url,
        target: targetVariable,
        normalization: normalization,
        train_test_split: trainTestSplit,
        p: minkowskiMetric,
        algorithm: algorithm,
        distance_metric: distanceMetric,
        weights: weights,
        n_neighbours: n_neighbours?n_neighbours:5,
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

  return {handleInference,pca,handleSwitchChange,normalization,supervisedML,setNormalization,trainTestSplit,setTrainTestSplit,minkowskiMetric,setMinkowskiMetric,algorithm,setAlgorithm,distanceMetric,setDistanceMetric,weights,setWeights,n_neighbours,setNNeighbours,evaluationResults,targetVariable,setTargetVariable,loader,handleRunKNN,errorMessage, optionsPlot}
}