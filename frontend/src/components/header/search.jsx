import { useState } from "react";
import Btn from "../btn";
import InputComp from "../InputComp";

import styles from "./search.module.css";
function Search() {
  const [search, setSearch] = useState("");

  const searchRute = () => {
    navigate(`/app/search/?search=${search}`);
  };
  const presskey = (e) => {
    if (e.key === "Enter") {
      searchRute();
    }
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className={styles.search}>
      <InputComp
        type="search"
        placeholder="Buscar Ruta"
        handlerChange={handleInputChange}
        name="search"
        controlClass={styles.inputSearch}
        value={search}
        presskey={presskey}
      ></InputComp>
      <Btn click={searchRute} text="Buscar" />
    </div>
  );
}

export default Search;
