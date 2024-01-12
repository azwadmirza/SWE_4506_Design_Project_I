import { IonIcon } from "@ionic/react";
import { searchCircle } from "ionicons/icons";

interface ISearchBar{
  searchTerm:string,
  handleSearchTerm:(term:string)=>void
}

const SearchBar = ({searchTerm,handleSearchTerm}:ISearchBar) => {
  return (
    <div className="inputbox searchbar w-75 mx-auto search-bar">
      <IonIcon icon={searchCircle}></IonIcon>
      <input
        type="search"
        className="me-2"
        placeholder="Search For A File"
        aria-label="Search"
        value={searchTerm}
        onChange={(e) => handleSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
