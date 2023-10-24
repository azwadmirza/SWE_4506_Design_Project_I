import axios from "axios";
import {useAppSelector } from "../../../contexts/file/hooks";


const VisualizationHeader = () => {
    const html:string|null=useAppSelector((state)=>state.file.html)
    const onButtonClick = () => {
        fetch(html?html:"").then((response) => {
            response.blob().then((blob) => {
                const fileURL =
                    window.URL.createObjectURL(blob);
                window.location.href=fileURL;
            });
        });
    };

    return ( 
        <div className="d-flex">
            <div className="d-flex w-25" style={{marginLeft:"40%",marginTop:"100px"}}>
            <button className="custom-button full-width" onClick={onButtonClick}>Download Visualization Report</button>
            </div>
        </div>
     );
}
 
export default VisualizationHeader;