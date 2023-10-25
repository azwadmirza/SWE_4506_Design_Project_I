import { Provider } from "react-redux";
import { store } from "../../../contexts/file/store";
import Data from "../components/data";

const Sheets = () => {
    return ( 
        <Provider store={store}>
            <Data/>
        </Provider>
     );
}

export default Sheets;