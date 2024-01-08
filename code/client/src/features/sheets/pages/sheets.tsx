import { Provider } from "react-redux";
import { store } from "../../../contexts/file/store";
// import Data from "../components/data";
import Tabs from "../components/tabs";
import NavbarUser from "../../../partials/navbarUser";

const Sheets = () => {
    return ( 
        <Provider store={store}>
            <NavbarUser/>
            <Tabs/>
            {/* <Data/> */}
        </Provider>
     );
}

export default Sheets;