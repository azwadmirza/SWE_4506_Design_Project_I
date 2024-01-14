import { Provider } from "react-redux";
import NavbarUser from "../../../partials/navbarUser";
import FileDisplay from "../components/file_display";
import { store } from "../../../contexts/file/store";
import FileUploadHeader from "../components/file_upload";
import SearchBar from "../components/search-bar";
import { useDashboard } from "../hooks/useDashboard";
import Loader from "../../../partials/loader";

const Dashboard = () => {
    const {loading,filteredFiles,search,handleSearch}=useDashboard();
    if(!loading){
        return ( 
            <Provider store={store}>
            <div className="dashboard-container">
                <NavbarUser/>
                <section>
                    <div className="dashboard-content">
                    <FileUploadHeader/>
                    <div className="search-bar">
                    <SearchBar searchTerm={search} handleSearchTerm={handleSearch}/>
                    </div>
                    <FileDisplay files={filteredFiles}/>
                    </div>
                </section>
            </div>
            </Provider>
         );
    }
    else{
        return (<>
        <NavbarUser/>
        <Loader/>
        </>)
    }
}
 
export default Dashboard;

