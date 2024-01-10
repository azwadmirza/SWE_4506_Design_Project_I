import { useEffect, useState } from "react";
import { renderGrid } from "../utils/grid-renderer";
import { useAppSelector,useAppDispatch } from "../../../contexts/file/hooks";
import React from "react";
import { updateData } from "../../../contexts/file/slice";


export const useSheets = () => {
  const dispatch=useAppDispatch();
  const jsonData = useAppSelector((state)=> state.file.data)
  const [currentCell, setCurrentCell] = useState<string>("");
  const [viewValue, setViewValue] = useState<string>("");
  const [gridRows, setGridRows] = useState<JSX.Element[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [saveTrigger, setSaveTrigger] = useState<boolean>(false);
  const data = useAppSelector((state) => state.file.data);

  const updateGrid = (updatedGridRows: JSX.Element[]) => {
    setGridRows(updatedGridRows);
  };

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
    dispatch(updateData({ key: Key, value: Value }))
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
