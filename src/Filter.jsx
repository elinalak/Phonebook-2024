import React from "react";

const Filter = ({ handleFilterChange, filtered, filterPerson }) => {
  return (
    <>
      <form onSubmit={filterPerson}>
        filter shown with <input type="search" onChange={handleFilterChange} />{" "}
        press enter
      </form>
      <p> {filtered}</p>
    </>
  );
};

export default Filter;
