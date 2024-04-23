import React from "react";
import "bootstrap/dist/css/bootstrap.css";

const PersonForm = ({
  addName,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:{" "}
          <input value={newNumber} type="tel" onChange={handleNumberChange} />
        </div>
        <div className="btn-success">
          <button type="button" className="btn btn-success">
            Add
          </button>
          <button type="button" className="btn btn-danger">
            Delete
          </button>
        </div>
      </form>
    </>
  );
};
export default PersonForm;
