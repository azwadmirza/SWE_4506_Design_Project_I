export interface IClassificationProps {
    data: {
      "Accuracy Test": number;
      "Accuracy Train": number;
      "Confusion Matrix Test": number[][];
      "Classification Report Test": {
        [key: string]: {
          label: string;
          precision: number;
          recall: number;
          "f1-score": number;
          support: number;
        };
      };
      "Confusion Matrix Train": number[][];
      "Classification Report Train": {
        [key: string]: {
          precision: number;
          recall: number;
          "f1-score": number;
          support: number;
        };
      };
      auc_scores_test: {
        [key: string]: number;
      };
      auc_scores_train: {
        [key: string]: number;
      };
      fpr_test_per_class: {
        [key: string]: number[];
      };
      fpr_train_per_class: {
        [key: string]: number[];
      };
      tpr_test_per_class: {
        [key: string]: number[];
      };
      tpr_train_per_class: {
        [key: string]: number[];
      };
    } | null;
  }