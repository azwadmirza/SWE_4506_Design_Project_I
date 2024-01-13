// import React from "react";
// import { Bar, Doughnut } from "react-chartjs-2";

const DecisionTreeResults = ({ evaluationResults }) => {
//   const renderAccuracyChart = () => {
//     if (!evaluationResults) return null;

//     const accuracyData = {
//       labels: ["Test Accuracy", "Train Accuracy"],
//       datasets: [
//         {
//           label: "Accuracy",
//           data: [evaluationResults["Accuracy Test"] * 100, evaluationResults["Accuracy Train"] * 100],
//           backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
//           borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
//           borderWidth: 1,
//         },
//       ],
//     };

//     const options = {
//       scales: {
//         y: {
//           beginAtZero: true,
//           max: 100,
//         },
//       },
//     };

//     return <Bar data={accuracyData} options={options} />;
//   };

//   const renderConfusionMatrixChart = (dataKey) => {
//     if (!evaluationResults) return null;
  
//     const numClasses = evaluationResults[dataKey].length;
//     const classLabels = Array.from({ length: numClasses }, (_, index) => `Class ${index}`);
  
//     const confusionMatrixData = {
//       labels: classLabels,
//       datasets: evaluationResults[dataKey].map((row, index) => ({
//         label: `${dataKey} Class ${index}`,
//         data: row,
//         backgroundColor: getRandomColor(), // You can use a function to generate random colors
//         borderColor: getRandomColor(),
//         borderWidth: 1,
//         fill: 'origin',
//         type: 'line',
//       })),
//     };
  
//     const options = {
//       scales: {
//         x: {
//           stacked: true,
//         },
//         y: {
//           stacked: true,
//         },
//       },
//     };
  
//     return <Bar data={confusionMatrixData} options={options} />;
//   };
  return (
    <div>
        <h2>Decision Tree Accuracy</h2>
    </div>
//     <div>
//       <h2>Decision Tree Accuracy</h2>
//       {renderAccuracyChart()}

//       <h2>Decision Tree Confusion Matrix - Test</h2>
//       {renderConfusionMatrixChart("Confusion Matrix Test")}

//       <h2>Decision Tree Confusion Matrix - Train</h2>
//       {renderConfusionMatrixChart("Confusion Matrix Train")}
//     </div>
  )
};

export default DecisionTreeResults;
