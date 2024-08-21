import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import searchData from "../searchData.json";
import CardContainer from "./CardContainer";
import "./SearchBar.css";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);
  const itemsRefs = useRef([]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleClose = () => {
    setSearchText("");
    setFilteredData([]);
  };

  const handleKeyboardNavigation = (event) => {
    console.log(event.key);
    if (selectedItem < filteredData.length) {
      if (event.key === "ArrowUp" && selectedItem > 0) {
        setSelectedItem((prevState) => prevState - 1);
      } else if (
        event.key === "ArrowDown" &&
        selectedItem < filteredData.length - 1
      ) {
        setSelectedItem((prevState) => prevState + 1);
      }
    } else {
      setSelectedItem(1);
    }
  };

  const handleFetchResults = () => {
    const results = [];
    results.push(
      ...searchData.filter((item) =>
        item.id.toLowerCase().includes(searchText.trim().toLowerCase())
      )
    );
    results.push(
      ...searchData.filter((item) =>
        item.name.toLowerCase().includes(searchText.trim().toLowerCase())
      )
    );
    results.push(
      ...searchData.filter((item) =>
        item.address.toLowerCase().includes(searchText.trim().toLowerCase())
      )
    );
    results.push(
      ...searchData.filter((item) =>
        item.pincode.toLowerCase().includes(searchText.trim().toLowerCase())
      )
    );
    results.push(
      ...searchData.filter((item) =>
        item.items.some(
          (el) => el.toLowerCase() === searchText.trim().toLowerCase()
        )
      )
    );
    console.log("Results", Array.from(new Set(results)));

    setFilteredData(Array.from(new Set(results)));
  };

  useEffect(() => {
    if (searchText !== "") {
      console.log("Search string", searchText);
      handleFetchResults();
    } else {
      setFilteredData([]);
    }
  }, [searchText]);

  return (
    <div className="searchContainer">
      <div className="searchBar">
        <AiOutlineSearch size={"2em"} />
        <input
          type="text"
          placeholder="Search users by ID, address, name, pincode, and items."
          autoComplete="off"
          onChange={handleSearchChange}
          onKeyDown={handleKeyboardNavigation}
          value={searchText}
          className="searchInput"
        />
        {searchText !== "" && (
          <AiOutlineClose size={"2em"} onClick={handleClose} />
        )}
      </div>
      <div className="resultsContainer">
        {filteredData?.map((item, index) => (
          <CardContainer
            data={item}
            key={item.id}
            searchText={searchText}
            currentPos={index}
            selectedItem={selectedItem}
            refHook={itemsRefs}
          />
        ))}
        {filteredData?.length === 0 && searchText !== "" && (
          <div className="noDataFound">
            <p>No User Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
