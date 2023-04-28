import { FaSearch } from "react-icons/fa";
import "../styles/searchBar.css";

export default function SearchBar(props) {
    
  function onFormChange(event) {
    event.preventDefault();
    props.userSearched(event.target.value);
  }

  function onFormSubmit(event){
    event.preventDefault();
    props.userSearched(event.target.searchInput.value);
  }

  return (
    <form 
    onChange={onFormChange}
    onSubmit={onFormSubmit}>
      <div className="search-bar">
        <div className="search-icon">
          <FaSearch />
        </div>
        <input type="text" placeholder="Search with titles" name="searchInput" />
      </div>
    </form>
  );
}