import React, { useState, useEffect } from "react";
export const useFileInput = () => {

    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const allowedFormats = [
        "text/csv",
        "text/plain",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/json",
    ];



    const handleUploadClick = () => {
        const fileInput = document.getElementById("fileInput");
        if (fileInput) {
            fileInput.click();
        }
    };

    const handleFileInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const type = file.type;
            if (allowedFormats.includes(type)) {
                setSelectedFile(file.name);
                setErrorMsg("");
            } else {
                setErrorMsg("Invalid file format");
                setSelectedFile(null);
            }
        }
    };
    useEffect(() => {
        if (errorMsg === '' && selectedFile != null) {
            console.log('Selected file:', selectedFile);
        }
        else if (errorMsg != '' && errorMsg != null) {
            console.log('Error message:', errorMsg);
        }
    }, [selectedFile, errorMsg]);

    return { handleUploadClick, handleFileInputChange }
}