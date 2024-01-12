
import { Provider } from "react-redux";
import { store } from "../contexts/file/store";

// import NavbarUser from "../partials/navbarUser";
import FileUpload from "../features/dashboard/components/file_upload";
import FileDisplay from "../features/dashboard/components/file_display"

function Dashboard() {
 
  return (
    <Provider store={store}>
      {/* <NavbarUser /> */}
      <FileDisplay/>
      <FileUpload />
    </Provider>
  );
}

export default Dashboard;
