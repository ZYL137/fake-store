import { useState } from "react";
import { useHistory } from "react-router-dom";
// import SearchIcon from "@mui/icons-material/Search";
import { SearchIcon } from "@heroicons/react/outline";
import styles from "../../sass/components/SearchBar.module.scss";

function SearchBar() {
  const history = useHistory();
  const [query, setQuery] = useState("");

  const searchInuptChangedHandler = (e) => {
    setQuery(e.target?.value);
  };

  const searchClickHandler = (e) => {
    if (query.trim().length < 1) {
      history.push(`/`);
    } else {
      history.push(`/search/${query}`);
    }
  };

  const searchEnterHandler = (e) => {
    if (e.which === 13 && query.trim().length < 1) {
      history.push(`/`);
    } else if (e.which === 13 && query.trim().length > 1) {
      history.push(`/search/${query}`);
    }
  };

  return (
    <div className={styles["search-bar"]}>
      <input
        className={styles["search-bar__input"]}
        type="text"
        name="search"
        placeholder="Search"
        value={query}
        aria-label="search"
        onChange={searchInuptChangedHandler}
        onKeyDown={searchEnterHandler}
      />
      <button
        aria-label="submit search"
        className={styles["search-bar__submit"]}
        onClick={searchClickHandler}
      >
        <SearchIcon className={styles["search-bar__submit-icon"]} />
      </button>
    </div>
  );
}

export default SearchBar;
