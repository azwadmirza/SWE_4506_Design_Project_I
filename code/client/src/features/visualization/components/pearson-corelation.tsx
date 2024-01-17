import Plot from 'react-plotly.js';

interface ICorrelationHeatmap {
  heatmapData: any;
}

const CorrelationHeatmap = ({ heatmapData }: ICorrelationHeatmap) => {
  return (
    <div className="d-flex flex-column mt-5">
      <h3 className="mb-2">Pearson Correlation Heatmap</h3>
      <div className="mx-auto justify-content-center" style={{width:"100%"}}>
      <Plot data={[heatmapData]} layout={{yaxis: { automargin: true,tickfont:{size:16} },xaxis:{automargin:true,tickfont:{size:16} },width:800,height:500}}/>
      </div>
    </div>
  );
};

export default CorrelationHeatmap;
