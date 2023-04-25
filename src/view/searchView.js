import { FaSearch } from "react-icons/fa";
import "../styles/searchView.css";

export default function SearchView(props) {
    
  function onFormSubmit(event) {
    event.preventDefault();
  }

  return (
    <form onSubmit={onFormSubmit}>
      <div className="search-bar">
        <div className="search-icon">
          <FaSearch />
        </div>
        <input type="text" placeholder="Search with titles" name="searchInput" />
      </div>
    </form>
  );
}