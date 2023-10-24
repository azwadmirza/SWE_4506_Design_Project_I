interface IVisualizationHeader{
    setShowVisualization: React.Dispatch<React.SetStateAction<boolean>>;
}

const VisualizationHeader = ({setShowVisualization}:IVisualizationHeader) => {
    return ( 
        <div className="d-flex">
            <div className="d-flex w-25" style={{marginLeft:"40%",marginTop:"100px"}}>
            <button className="custom-button full-width" onClick={()=>setShowVisualization(false)}>Sheets</button>
            <button className="custom-button full-width" onClick={()=>setShowVisualization(true)}>Visualize</button>
            </div>
        </div>
     );
}
 
export default VisualizationHeader;