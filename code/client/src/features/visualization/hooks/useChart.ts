import { useEffect, useState } from "react"
import { useLinearChart } from "./useLinearChart";
import { useClassChart } from "./useClassChart";
import { useAppSelector } from "../../../contexts/file/hooks";
import { indexedDBConfig } from "../../../config/indexeddb";

export const useChart = () => {
    const [loading, setLoading] = useState(true);
    const delimiter = useAppSelector((state) => state.file.delimiter);
    const [data, setData] = useState<any[] | null>([]);
    const type = useAppSelector((state) => state.file.type);
    const url = useAppSelector((state) => state.file.url);
    const getFile = async () => {
        setLoading(false);
        try {
            if (url) {
                console.log(url)
                const open = await indexedDBConfig.openDatabase();
                if (open) {
                    const fetchedData = await indexedDBConfig.getFileByURL('byUrl', url, type, delimiter);
                    setData(fetchedData);
                    setLoading(false);
                }
                else {
                    throw Error("Database not opened");
                }
            }
        } catch (error) {
            setData([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        getFile();
    }, []);

    const { chartData, options, handleSelect, selectedValue, optionsPlot, dependantIndex, handleDependant, independantIndex, handleIndependant } = useLinearChart(data?data:[]);
    const { classChartData, charterOptions, handleCharterSelect, selectedCharter, charterOptionsPlot, classIndex, handleClass } = useClassChart(data?data:[]);

    return { chartData, options, handleSelect, selectedValue, optionsPlot, dependantIndex, handleDependant, independantIndex, handleIndependant, classChartData, charterOptions, handleCharterSelect, selectedCharter, charterOptionsPlot, classIndex, handleClass, loading }

}