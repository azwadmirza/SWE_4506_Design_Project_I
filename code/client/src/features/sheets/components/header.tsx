import { useDropDown } from "../hooks/useDropDown";
import FileInput from "../../../partials/fileInput";
import { useAppSelector } from "../../../contexts/file/hooks";
import { indexedDBConfig } from "../../../config/indexeddb";
import saveToBackend from "../../../utils/saveFileToBackend";
import { useAppDispatch } from "../../../contexts/auth/hooks";
import { setFile, setURL } from "../../../contexts/file/slice";
import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { folder, save, saveOutline } from "ionicons/icons";

type HeaderProps = {
  filename: string;
  data: any[] | null;
};

const Header = ({ filename, data }: HeaderProps) => {
  const file_id = useAppSelector((state) => state.file.file_id);
  const url = useAppSelector((state) => state.file.url);
  const dispatch = useAppDispatch();
  const {
    showFileDropdown,
    toggleDropdown,
    showFileUpload,
    setShowFileUpload,
  } = useDropDown();

  const handleSave = async () => {
    if (file_id) {
      if (url) {
        const backendRes = await saveToBackend(
          data,
          file_id,
          filename,
          import.meta.env.VITE_BACKEND_REQ_ADDRESS
        );
        await indexedDBConfig.updateFileURL(
          data,
          url,
          backendRes.data.file_url
        );
        dispatch(setURL(backendRes.data.file_url));
        dispatch(setFile(filename));
        console.log("File Saved");
      }
    }
  };

  return (
    <div className="header fixed-top d-flex mx-auto w-100">
      <div className="header-filename">
        <Link to="/data" className="px-2 navbar-brand">
          {filename}
        </Link>
      </div>
      <FileInput
        showFileInput={showFileUpload}
        setShowFileInput={setShowFileUpload}
      />
      <button
        className="header-buttons"
        onClick={() => {
          setShowFileUpload(!showFileUpload);
        }}
      >
        <IonIcon icon={folder} style={{marginRight:"2px"}}></IonIcon>
        <span className="header-buttons-text">Upload</span>
      </button>
      <button
        className="header-buttons"
        onClick={() => {
          handleSave();
        }}
      >
        <IonIcon icon={save}  style={{marginRight:"2px"}} />
        <span className="header-buttons-text">Save</span>
      </button>
    </div>
  );
};

export default Header;
