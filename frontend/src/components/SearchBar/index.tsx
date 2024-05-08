import React from "react";
import styles from "./index.module.css";
import { MdSearch } from "react-icons/md";

function SearchBar() {
  return (
    <form className={styles.searchBar}>
      <input type="text" className={styles.searchInput} placeholder="Search" />
      <button type="submit" className={styles.searchButton}>
        <MdSearch className={styles.searchIcon} />
      </button>
    </form>
  );
}

export default SearchBar;
