import React, { useState, useEffect } from "react";
import Header from "./Header";
import Filter from "./Filter";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemNumber, setNewItemNumber] = useState("");
  const [filtered, setFiltered] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3002/persons").then((response) => {
      setItems(response.data);
    });
  }, []);

  const deleteItem = (id) => {
    console.log(id);
    axios.delete(`http://localhost:3002/persons/${id}`).then(() => {
      setItems(items.filter((i) => i.id !== id));
    });
  };

  const addItem = () => {
    axios
      .post("http://localhost:3002/persons", {
        id: String(items.length + 1),
        name: newItemName,
        number: newItemNumber,
      })
      .then((response) => {
        setItems(items.concat(response.data));
        setNewItemName("");
        setNewItemNumber("");
        // eslint-disable-next-line
        items.map(function (person, index) {
          if (person.name === newItemName) {
            alert(`${person.name} is already added to phonebook`);
            setItems(items.concat(""));
            return <li key={index}>{person}</li>;
          }
        });
      });
  };

  const handleNewNameChange = (event) => {
    setNewItemName(event.target.value);
  };

  const handleNewNumberChange = (event) => {
    setNewItemNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFiltered(event.target.value, `target filter`);
  };

  const filterPerson = (event) => {
    console.log(filtered, `filtered`);
    event.preventDefault();

    let result = "no";
    // eslint-disable-next-line
    items.map(function (person) {
      if (person.name.startsWith(filtered) === true) {
        setFiltered(`${person.name} ${person.number}`);
        result = person.name;
        return <li key={person.id}>{person.number}</li>;
      }
    });

    return <ul> is {result}</ul>;
  };

  return (
    <div>
      <Header text="Phonebook" />
      <Filter
        handleFilterChange={handleFilterChange}
        filtered={filtered}
        filterPerson={filterPerson}
      />
      <Header text="Add a new" />
      <div>
        <input type="text" value={newItemName} onChange={handleNewNameChange} />
        <input
          type="tel"
          value={newItemNumber}
          onChange={handleNewNumberChange}
        />
        <button onClick={addItem} className="bt btn-success">
          Add Item
        </button>
      </div>

      {items.map((item) => {
        return (
          <div key={item.id}>
            {item.name} {item.number}
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
