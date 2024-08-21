import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import "./App.css";

const App = () => {
  const [selectedItem, setSelectedItem] = useState(-1);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    if (selectedItem < filteredData.length) {
      if (event.key === "ArrowUp" && selectedItem > 0) {
        setSelectedItem((prevState) => prevState - 1);
      } else if (
        e.key === "ArrowDown" &&
        selectedItem < filteredData.length - 1
      ) {
        setSelectedItem((prevState) => prevState + 1);
      }
    } else {
      setSelectedItem(1);
    }
  };

  return (
    <div className="rootContainer">
      <h1 className="header">
        The<span>Awesome</span>
        Search Bar
      </h1>
      <SearchBar />
    </div>
  );
};

export default App;
