import { RocCurveChartProps } from "./rocGenerator";

export interface RawData {
  auc_scores: { [key: string]: number };
  fpr_per_class: { [key: string]: number[] };
  tpr_per_class: { [key: string]: number[] };
}

const extractRocCurveData = (rawData: RawData, labels: string[]): RocCurveChartProps['data'] => {
  const roc_curves: Array<Array<{ x: number; y: number }>> = [];

  labels.forEach((label) => {
    const fprArray = rawData.fpr_per_class[label] || [];
    const tprArray = rawData.tpr_per_class[label] || [];

    if (fprArray.length === tprArray.length) {
      const roc_curve = [
        { x: 0, y: 0 },
        ...fprArray.map((fpr: number, index: number) => ({
          x: fpr,
          y: tprArray[index],
        })),
        { x: 1, y: 1 },
      ];
      roc_curves.push(roc_curve);
    } else {
      console.error(`Mismatched lengths for ${label}`);
    }
  });

  return {
    auc_scores: rawData.auc_scores,
    roc_curves,
  };
};

export default extractRocCurveData;
