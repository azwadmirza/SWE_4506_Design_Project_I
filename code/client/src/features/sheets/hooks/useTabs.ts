import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../contexts/file/hooks";
import { parseFile } from "../../../utils/parse-file";
import axios from "axios";
import { setData, setLoading } from "../../../contexts/file/slice";

export const useTabs = () => {
    const delimiter = useAppSelector((state) => state.file.delimiter);
    const type = useAppSelector((state) => state.file.type);
    const loading = useAppSelector((state) => state.file.loading);
    const [toggle, setToggle] = useState(1);
    const url = useAppSelector((state) => state.file.url);
    const dispatch = useAppDispatch();

    const getFile = useMemo(
        () => async () => {
            dispatch(setLoading(true));
            try {
                const file = await axios.get(url ? url : "");
                const parsedFile = await parseFile(file.data, delimiter, type);
                console.log("parsedFile", parsedFile);
                if(parsedFile){
                    dispatch(setData(parsedFile)); 
                }
            } catch (error) {
                console.error("Error fetching or parsing file:", error);
            } finally {
                dispatch(setLoading(false));
            }
        },
        [url, delimiter, type, dispatch]
    );

    useEffect(() => {
        if (url) {
            getFile();
        }
    }, [url, getFile]);

    return { updateToggle: setToggle, toggle, loading };
};
