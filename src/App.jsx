import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemNumber, setNewItemNumber] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3002/persons").then((response) => {
      setItems(response.data);
    });
  }, []);

  const deleteItem = (id) => {
    setItems(items.filter((i) => i.id !== id));
    console.log(id);
    axios.delete(`http://localhost:3002/persons/${id}`).then(() => {
      setItems(persons);
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
      });
  };

  const handleNewNameChange = (event) => {
    setNewItemName(event.target.value);
  };

  const handleNewNumberChange = (event) => {
    setNewItemNumber(event.target.value);
  };

  return (
    <div>
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
