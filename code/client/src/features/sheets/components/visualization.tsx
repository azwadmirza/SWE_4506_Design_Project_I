import { useAppSelector } from "../../../contexts/file/hooks";
import parse from 'html-react-parser';

const Visualization = () => {
    
    const rawHTML=useAppSelector((state) => state.file.html)!==null?useAppSelector((state) => state.file.html):"";
    const html=rawHTML===null?"":rawHTML;
    return (parse(html));
}

export default Visualization;