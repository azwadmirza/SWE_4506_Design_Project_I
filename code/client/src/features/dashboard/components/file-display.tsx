import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface IFileDisplayProps {
  file_id: string;
  url:string;
  filename: string;
  updatedAt: string;
}

const FileDisplayCard = ({ file_id,url,filename, updatedAt }: IFileDisplayProps) => {
  const navigate=useNavigate();
  return (
    <Card className="dashboard-card justify-content-center" onClick={()=>{
      localStorage.setItem("file_id",file_id);
      localStorage.setItem("url",url);
      localStorage.setItem("file",filename);
      navigate("/data");
    }}>
      <Card.Body className="dashboard-card-text">
        <Card.Img className="dashboard-card-image" variant="top" src="/icon.png" />
            <Card.Title>{filename}</Card.Title>
            <Card.Text>
              <small>Uploaded: {updatedAt}</small>
            </Card.Text>
        <div className="content">
          <div className="image">
            <img src="/icon.png" height={"40%"} />
          </div>
          <div className="file-info">
            
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FileDisplayCard;
