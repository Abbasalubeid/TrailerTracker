import { FaSearch } from "react-icons/fa";
import "../styles/searchBar.css";

export default function SearchBar(props) {
    
  function onFormSubmit(event) {
    event.preventDefault();
    props.userSearched(event.target.value);
  }

  function dontSubmitACB(event){
    event.preventDefault();
  }

  return (
    <form 
    onChange={onFormSubmit}
    onSubmit={dontSubmitACB}>
      <div className="search-bar">
        <div className="search-icon">
          <FaSearch />
        </div>
        <input type="text" placeholder="Search with titles" name="searchInput" />
      </div>
    </form>
  );
}