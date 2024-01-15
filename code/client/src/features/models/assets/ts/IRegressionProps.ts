export interface IRegressionProps {
    modelData: {
      'MAE Test': number;
      'MAE Train': number;
      'MSE Test': number;
      'MSE Train': number;
      'Predictions Whole': number[];
      'R2 Accuracy Test': number;
      'R2 Accuracy Train': number;
      'RMSE Test': number;
      'RMSE Train': number;
    } | null;
    target: string|null|undefined; 
  };