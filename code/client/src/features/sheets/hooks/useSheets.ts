import { useEffect, useState } from "react";
import { renderGrid } from "../utils/grid-renderer";
import { useAppSelector } from "../../../contexts/file/hooks";
import { createJsonData } from "../utils/save-data";
import React from "react";

export const useSheets = () => {
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
    console.log(`Cell changed - Key: ${Key}, Value: ${Value}`);
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
    console.log("updated Grid that does update");
    console.log(updatedGridRows)
    setSaveTrigger(true);
  };
  

  const save = async () => {
    const jsonData = createJsonData(gridRows);
    console.log("jsonData that does update");
    console.log(jsonData);
    console.log("gridRows does update on Cell Change but not on using the File Save button")
    console.log(gridRows);
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
    console.log("rendering grid");
  };

  useEffect(() => {
    if (saveTrigger) {
      save();
    }
  }, [saveTrigger]);

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
  };
};
