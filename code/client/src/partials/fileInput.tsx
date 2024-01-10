import { IonIcon } from "@ionic/react";
import { newspaperOutline } from "ionicons/icons";
import { Modal } from "react-bootstrap";
import { useFile } from "../hooks/useFile";
import Loader from "./loader";


type FileInputProps = {
    showFileInput: boolean,
    setShowFileInput: React.Dispatch<React.SetStateAction<boolean>>
}


const FileInput = ({ showFileInput, setShowFileInput }: FileInputProps) => {

    const { loading,file,setFileInformation, delimiter, setDelimiter, errorMsg, FileInputSubmit } = useFile();
    if(!loading){
        return (
            <Modal show={showFileInput} onHide={() => setShowFileInput(false)} className="w-100 d-flex"
                centered>
                <Modal.Header closeButton style={{color:"whitesmoke",backgroundColor:"orange"}}>
                    <Modal.Title>
                        Open File
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="error-message">
                        <p style={{color:"red"}}>{errorMsg}</p>
                    </div>
                    <div className="input-group flex">
                        <input type="file" name="file"
                            accept=".csv, .tsv, .txt, .xlsx, .json"
                            id="fileUpload" className="form-control" onChange={(e) => {
                                if (e.target.files !== null) {
                                    setFileInformation(e.target.files[0])
                                }
                            }} />
                    </div>
                    {file && file.type==="text/plain" && (<div className="inputbox">
                        <IonIcon icon={newspaperOutline} />
                        <input type="text" required id="delimiter" name="delimiter" value={delimiter} onChange={(e) => setDelimiter(e.target.value)} />
                        <label htmlFor="delimiter">Delimiter</label>
                    </div>)}
                </Modal.Body>
                <Modal.Footer className="d-flex">
                    <button className="custom-button w-25" onClick={() => {
                        FileInputSubmit(setShowFileInput)
                    }
                    }>Upload</button>
                    <button className="custom-button w-25" onClick={() => setShowFileInput(false)}>Cancel</button>
                </Modal.Footer>
            </Modal>
        )
    }
    else{
        return (
            <Modal show={showFileInput} className="w-100 d-flex"
            size="lg"
                centered>
                <Modal.Header style={{color:"whitesmoke",backgroundColor:"orange"}}>
                    <Modal.Title>
                        Open File
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Loader/>
                </Modal.Body>
            </Modal>
        )
    }

    
}

export default FileInput;