import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
import {  useLinearChart } from "../hooks/useLinearChart";
import PlotType from "./plot-type";
import AxisSelector from "./axis-selector";
import { useClassChart } from '../hooks/useClassChart';
import ClassPlotType from './plot-type-class';
import AxisSelectorClass from './axis-selector-class';
import Loader from '../../../partials/loader';
import '../assets/css/visualizer.css';
Chart.register(CategoryScale);

function Charts() {
  const {chartData, options, handleSelect, selectedValue,optionsPlot,dependantIndex, handleDependant,independantIndex, handleIndependant}=useLinearChart();
  const {loading,classChartData, charterOptions, handleCharterSelect, selectedCharter,charterOptionsPlot,classIndex, handleClass}=useClassChart();
  return (
    <div className="chart-container">
      <h3>Linear Visualizer</h3>
      <AxisSelector dependantSelect={dependantIndex} independantSelect={independantIndex} handleDependantSelect={handleDependant} handleIndependantSelect={handleIndependant} options={optionsPlot}/>
      <PlotType selectedValue={selectedValue} handleSelect={handleSelect} options={options} chartData={chartData}/>
      <h3>Class Distribution</h3>
      {loading && (<Loader/>)}
      {!loading && (
      <>
      <AxisSelectorClass classSelect={classIndex} handleClassSelect={handleClass} options={charterOptionsPlot}/>
      <ClassPlotType selectedValue={selectedCharter} handleSelect={handleCharterSelect} options={charterOptions} chartData={classChartData}/></>
      )}
    </div>
  );
}
export default Charts;