import { useEffect, useState, useMemo,  } from "react";
import { renderGrid } from "../utils/grid-renderer";
import { useAppSelector,useAppDispatch } from "../../../contexts/file/hooks";
import React from "react";
import { indexedDBConfig } from "../../../config/indexeddb";

export const useSheets = () => {
  const dispatch=useAppDispatch();
  const jsonData = useAppSelector((state)=> state.file.data)
  const [currentCell, setCurrentCell] = useState<string>("");
  const [viewValue, setViewValue] = useState<string>("");
  const [gridRows, setGridRows] = useState<JSX.Element[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [saveTrigger, setSaveTrigger] = useState<boolean>(false);
  const [data,setData]=useState<any[]|null>([]);
  const delimiter = useAppSelector((state) => state.file.delimiter);
  const type = useAppSelector((state) => state.file.type);
  const url = useAppSelector((state) => state.file.url);

  const updateGrid = (updatedGridRows: JSX.Element[]) => {
    setGridRows(updatedGridRows);
  };

  const getFile = useMemo(
    () => async () => {
      setLoading(true)
        try {
            if (url) {
                await indexedDBConfig.openDatabase();
                setData(await indexedDBConfig.getFileByURL('byUrl', url,type,delimiter));
                setLoading(false);
            }
        } catch (error) {
            setData([]);
            setLoading(false);
        }
    },
    [url, delimiter, type, dispatch]
);

useEffect(() => {
    getFile();
}, [url]);

  const onCellChange = async (Key: string, Value: string) => {
    const updatedGridRows = gridRows.map((row) => {
      return {
        ...row,
        props: {
          ...row.props,
          children: React.Children.map(row.props.children, (cell) =>
            cell.props.Key === Key
              ? React.cloneElement(cell, { Value })
              : cell
          ),
        },
      };
    });
    updateGrid(updatedGridRows);
    setSaveTrigger(true);
  };
  
  
  const save = () => {
    setSaveTrigger(false);
  };

  const render = async () => {
    const newGridRows = await renderGrid(
      data,
      setCurrentCell,
      setViewValue,
      setLoading,
      onCellChange
    );
    setGridRows(newGridRows);
  };

  useEffect(() => {
    if (saveTrigger) {
      save();
    }
  }, [saveTrigger,gridRows,jsonData]);

  useEffect(() => {

    setLoading(true);
    render();
  }, []);


  return {
    currentCell,
    gridRows,
    viewValue,
    setViewValue,
    loading,
    save,
    onCellChange,
    saveTrigger,
    setSaveTrigger,
    jsonData,
  };
};
