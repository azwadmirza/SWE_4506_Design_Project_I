import axios from "axios";
import { useAppSelector } from "../../../contexts/file/hooks";
import { useEffect, useState } from "react";
import { round, sqrt } from "mathjs";
import { useChart } from "../../visualization/hooks/useChart";

export const useKNN = (type: "classification" | "regression") => {
  const [normalization, setNormalization] = useState("MinMaxScaler");
  const [trainTestSplit, setTrainTestSplit] = useState(20);
  const [minkowskiMetric, setMinkowskiMetric] = useState(2);
  const [algorithm, setAlgorithm] = useState("auto");
  const [distanceMetric, setDistanceMetric] = useState("euclidean");
  const [weights, setWeights] = useState("uniform");
  const optionsPlot = useAppSelector((state) => state.file.optionsPlot);
  const { supervisedML } = useChart();
  const [n_neighbours, setNNeighbours] = useState(5);
  const [errorMessage, setErrorMessage] = useState("");
  const [pca, setPca] = useState<boolean>(false);
  const [pcaFeatures, setPcaFeatures] = useState<number>(1);

  useEffect(() => {
    if (distanceMetric === "euclidean") {
      setMinkowskiMetric(2);
    } else if (distanceMetric === "manhattan") {
      setMinkowskiMetric(1);
    }
  }, [distanceMetric]);

  useEffect(() => {
    setNNeighbours(
      parseInt(String(round(sqrt(optionsPlot.length))))
        ? parseInt(String(round(sqrt(optionsPlot.length))))
        : 5
    );
  }, [optionsPlot]);

  const [evaluationResults, setEvaluationResults] = useState(null);
  const [targetVariable, setTargetVariable] =
    useState<string>("Select a Target");
  const address = import.meta.env.VITE_BACKEND_REQ_ADDRESS;
  const file_url = useAppSelector((state) => state.file.url);
  const [loader, setLoader] = useState<boolean>(false);
  const [loaderOptimize, setLoaderOptimize] = useState<boolean>(false);

  const handleInference = async () => {
    console.log("KNN " + type + " Inference Time..");
    try {
      if (targetVariable === "Select a Target") {
        setErrorMessage("Please select a target variable");
        return;
      }
      setErrorMessage("");
      setLoaderOptimize(true);
      const response = await axios.post(
        `${address}/api/optimized_model_search/${type}/knn/`,
        {
          file_url: file_url,
          target_column: targetVariable,
        }
      );
      console.log(response.data);
      const train_test_split = response.data.best_train_test_split;
      const hyperparametersObject = JSON.parse(
        response.data.best_hyperparameters
      );
      if (type == "classification") {
        setNNeighbours(hyperparametersObject.kneighborsclassifier__n_neighbors);
        setMinkowskiMetric(hyperparametersObject.kneighborsclassifier__p);
        setDistanceMetric(hyperparametersObject.kneighborsclassifier__metric);
        setWeights(hyperparametersObject.kneighborsclassifier__weights);
      }else{
        setNNeighbours(hyperparametersObject.kneighborsregressor__n_neighbors);
        setMinkowskiMetric(hyperparametersObject.kneighborsregressor__p);
        setDistanceMetric(hyperparametersObject.kneighborsregressor__metric);
        setWeights(hyperparametersObject.kneighborsregressor__weights);
      }
      console.log("I am Here")
      setTrainTestSplit(train_test_split * 100);
    } catch (error) {
      console.error("Error during backend request:");
    }
    setLoaderOptimize(false);
  };

  const handleRunKNN = async () => {
    try {
      if (targetVariable === "Select a Target") {
        setErrorMessage("Please select a target variable");
        return;
      }
      setErrorMessage("");
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
        n_neighbours: n_neighbours ? n_neighbours : 5,
        pca: pca,
        pca_features: pcaFeatures,
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

  return {
    loaderOptimize,
    pcaFeatures,
    setPcaFeatures,
    handleInference,
    pca,
    handleSwitchChange,
    normalization,
    supervisedML,
    setNormalization,
    trainTestSplit,
    setTrainTestSplit,
    minkowskiMetric,
    setMinkowskiMetric,
    algorithm,
    setAlgorithm,
    distanceMetric,
    setDistanceMetric,
    weights,
    setWeights,
    n_neighbours,
    setNNeighbours,
    evaluationResults,
    targetVariable,
    setTargetVariable,
    loader,
    handleRunKNN,
    errorMessage,
    optionsPlot,
  };
};
