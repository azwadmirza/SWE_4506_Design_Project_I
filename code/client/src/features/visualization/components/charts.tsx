import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PlotType from "./plot-type";
import AxisSelector from "./axis-selector";
import ClassPlotType from "./plot-type-class";
import AxisSelectorClass from "./axis-selector-class";
import Loader from "../../../partials/loader";
import "../assets/css/visualizer.css";
import { useChart } from "../hooks/useChart";
import CorrelationHeatmap from "./pearson-corelation";
import StatTable from "./stat-table";
Chart.register(CategoryScale);

function Charts() {
  const {
    columns,
    statistics,
    heatmapData,
    loading,
    chartData,
    options,
    handleSelect,
    selectedValue,
    optionsPlot,
    dependantIndex,
    handleDependant,
    independantIndex,
    handleIndependant,
    classChartData,
    charterOptions,
    handleCharterSelect,
    selectedCharter,
    charterOptionsPlot,
    classIndex,
    handleClass,
  } = useChart();
  if (!loading) {
    return (
      <div className="chart-container">
        <h3>Linear Visualizer</h3>
        <AxisSelector
          dependantSelect={dependantIndex}
          independantSelect={independantIndex}
          handleDependantSelect={handleDependant}
          handleIndependantSelect={handleIndependant}
          options={optionsPlot}
        />
        <PlotType
          selectedValue={selectedValue}
          handleSelect={handleSelect}
          options={options}
          chartData={chartData}
        />
        <CorrelationHeatmap heatmapData={heatmapData}/>
        <StatTable columns={columns} data={statistics}/>
        <h3>Class Distribution</h3>
        <AxisSelectorClass
          classSelect={classIndex}
          handleClassSelect={handleClass}
          options={charterOptionsPlot}
        />
        <ClassPlotType
          selectedValue={selectedCharter}
          handleSelect={handleCharterSelect}
          options={charterOptions}
          chartData={classChartData}
        />
        
      </div>
    );
  } else {
    return <Loader />;
  }
}
export default Charts;
