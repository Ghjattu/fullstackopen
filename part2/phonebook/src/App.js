import {useEffect, useState} from 'react';
import axios from "axios";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import Filter from "./components/Filter";

const checkPersonEqual = (persons, newPerson) => {
    for (let i = 0; i < persons.length; i++) {
        if (persons[i].number === newPerson.number) {
            return true;
        }
    }
    return false;
};

const filter = (persons, filterText) => {
    const filterPerson = [];
    filterText = filterText.toLowerCase();
    for (let i = 0; i < persons.length; i++) {
        if (persons[i].name.toLowerCase().indexOf(filterText) !== -1 ||
            persons[i].number.toLowerCase().indexOf(filterText) !== -1) {
            filterPerson.push(persons[i]);
        }
    }
    return filterPerson;
}

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/persons')
            .then(response => setPersons(response.data));
    });

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value);
    };

    const handleFilterTextChange = (e) => {
        setFilterText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPerson = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        };
        if (checkPersonEqual(persons, newPerson)) {
            alert(`${newNumber} is already added to phonebook`);
        } else {
            setPersons(persons.concat(newPerson));
        }
        setNewName('');
        setNewNumber('');
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filterText={filterText} handleFilterTextChange={handleFilterTextChange}/>

            <h3>Add a new</h3>
            <PersonForm newName={newName} newNumber={newNumber} handleSubmit={handleSubmit}
                        handleNameChange={handleNameChange}
                        handleNumberChange={handleNumberChange}/>

            <h3>Numbers</h3>
            <Person persons={filter(persons, filterText)}/>
        </div>
    );
};

export default App