import { useState, useEffect } from "react";
import Header from "./Header";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNumber] = useState("");
  const [filtered, setFiltered] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3002/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);
  console.log("render", persons.length, "persons");

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
      // date: new Date().toISOString(),
      // important: Math.random() < 0.5,
    };

    axios
      .post("http://localhost:3002/persons", personObject)
      .then((response) => {
        console.log("post", response);
        setPersons(persons.concat(response.data));
        setNewName("");
        setNumber("");
      });

    // axios.put("http://localhost:3002/persons", personObject);
    // console.log("put", response);
    // return request.then((response) => response.data);

    // eslint-disable-next-line
    persons.map(function (person, index) {
      if (person.name === newName) {
        alert(`${person.name} is already added to phonebook`);
        setPersons(persons.concat(""));
        return <li key={index}>{person}</li>;
      }
    });
  };

  const handleNameChange = (event) => {
    console.log(event.target.value, `target name`);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value, `target number`);
    setNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFiltered(event.target.value, `target filter`);
  };

  const filterPerson = (event) => {
    console.log(filtered, `filtered`);
    event.preventDefault();

    let result = "no";
    // eslint-disable-next-line
    persons.map(function (person) {
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
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Header text="Numbers" />
      <Persons persons={persons} />
    </div>
  );
};

export default App;
