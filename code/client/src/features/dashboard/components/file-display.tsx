import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../contexts/auth/hooks";
import { setFile, setFileId, setURL } from "../../../contexts/file/slice";

interface IFileDisplayProps {
  file_id: string;
  url:string;
  filename: string;
  updatedAt: string;
}

const FileDisplayCard = ({ file_id,url,filename, updatedAt }: IFileDisplayProps) => {
  const navigate=useNavigate();
  const dispatch=useAppDispatch();
  return (
    <Card className="dashboard-card justify-content-center" onClick={()=>{
      dispatch(setURL(url));
      dispatch(setFile(filename));
      dispatch(setFileId(file_id));
      navigate("/data");
    }}>
      <Card.Header className="dashboard-card-header">
        {file_id}
      </Card.Header>
      <Card.Body className="dashboard-card-text">
        <Card.Img className="dashboard-card-image" variant="top" src="/icon.png" />
            <Card.Title>{filename}</Card.Title>
            <Card.Text>
              <small>Uploaded: {updatedAt}</small>
            </Card.Text>
      </Card.Body>
      
    </Card>
  );
};

export default FileDisplayCard;
