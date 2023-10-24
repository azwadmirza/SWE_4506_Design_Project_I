import { useState } from "react";
import { useFileInput } from "../../../hooks/useFileInput";

export const useDropDown=()=>{
    const [showFileDropdown, setShowFileDropdown] = useState(false);
    const [showEditDropdown, setShowEditDropdown] = useState(false);
    const [showViewDropdown, setShowViewDropdown] = useState(false);
    const { handleUploadClick, handleFileInputChange } = useFileInput();

    const toggleDropdown = (menuName: string) => {
        setShowFileDropdown(false);
        setShowEditDropdown(false);
        setShowViewDropdown(false);

        switch (menuName) {
        case "file":
            setShowFileDropdown(!showFileDropdown);
            break;
        case "edit":
            setShowEditDropdown(!showEditDropdown);
            break;
        case "view":
            setShowViewDropdown(!showViewDropdown);
            break;
        default:
            break;
        }
    };

    return {
        showFileDropdown,
        showEditDropdown,
        showViewDropdown,
        toggleDropdown,
        handleUploadClick,
        handleFileInputChange,
        };
}