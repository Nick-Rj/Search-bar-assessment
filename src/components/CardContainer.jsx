import React, { useEffect } from "react";
import "./CardContainer.css";

const CardContainer = ({
  data,
  searchText,
  currentPos,
  selectedItem,
  refHook,
}) => {
  console.log("Data:", data, searchText);

  const targetItem = data?.items.find((el) => el === searchText);
  //   const targetItem = data?.items.find((el) =>
  //     el.toLowerCase().includes(searchText.toLowerCase())
  //   );
  console.log("Target Item", targetItem, currentPos, selectedItem);

  useEffect(() => {
    if (refHook.current[selectedItem]) {
      refHook.current[selectedItem].focus();
      refHook.current[selectedItem].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedItem]);

  return (
    <div
      className={
        selectedItem === currentPos ? "cardContainer active" : "cardContainer"
      }
      ref={(el) => (refHook.current[currentPos] = el)}
    >
      <h3>
        {searchText.toLowerCase() ===
          data.id.slice(0, searchText.length).toLowerCase() && (
          <span className="highlight">
            {data.id.slice(0, searchText.length)}
          </span>
        )}
        {searchText.toLowerCase() ===
        data.id.slice(0, searchText.length).toLowerCase()
          ? data.id.slice(searchText.length)
          : data.id}
      </h3>
      <em>
        {searchText.toLowerCase() ===
          data.name.slice(0, searchText.length).toLowerCase() && (
          <span className="highlight">
            {data.name.slice(0, searchText.length)}
          </span>
        )}
        {searchText.toLowerCase() ===
        data.name.slice(0, searchText.length).toLowerCase()
          ? data.name.slice(searchText.length)
          : data.name}
      </em>
      {targetItem && (
        <div>
          <hr />
          <ul>
            <li>
              <span>{`"${targetItem}" found in items`}</span>
            </li>
          </ul>
          <hr />
        </div>
      )}
      <p>
        {searchText.toLowerCase() ===
          data.address.slice(0, searchText.length).toLowerCase() && (
          <span className="highlight">
            {data.address.slice(0, searchText.length)}
          </span>
        )}
        {searchText.toLowerCase() ===
        data.address.slice(0, searchText.length).toLowerCase()
          ? data.address.slice(searchText.length)
          : data.address}
      </p>
    </div>
  );
};

export default CardContainer;
