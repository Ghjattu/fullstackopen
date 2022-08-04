import {useEffect, useState} from 'react';
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import Filter from "./components/Filter";
import service from "./utils";

const checkKeyValue = (first, second) => {
    const firstKeyList = Object.getOwnPropertyNames(first);
    for (const key of firstKeyList) {
        if (first[key] === second[key]) {
            return true;
        }
    }
    return false;
};

const checkPersonEqual = (persons, newPerson) => {
    for (let i = 0; i < persons.length; i++) {
        if (checkKeyValue(persons[i], newPerson)) {
            return true;
        }
    }
    return false;
};

const filter = (persons, filterText) => {
    const filterPersons = [];
    filterText = filterText.toLowerCase();
    for (let i = 0; i < persons.length; i++) {
        if (persons[i].name.toLowerCase().indexOf(filterText) !== -1 ||
            persons[i].number.toLowerCase().indexOf(filterText) !== -1) {
            filterPersons.push(persons[i]);
        }
    }
    return filterPersons;
};

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        service.getAll()
            .then(initialPersons => setPersons(initialPersons));
    }, []);

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value);
    };

    const handleFilterTextChange = (e) => {
        setFilterText(e.target.value);
    };

    const handleDeleteClick = (idx) => {
        const filterPersons = filter(persons, filterText);
        const deleteId = filterPersons[idx].id;
        if (window.confirm(`Delete ${filterPersons[idx].name} ?`)) {
            service.deleteById(deleteId)
                .then(() => setPersons(persons.filter(person => person.id !== deleteId)));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPerson = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        };
        if (checkPersonEqual(persons, newPerson)) {
            alert(`${newNumber} or ${newName} is already added to phonebook`);
        } else {
            service.create(newPerson)
                .then(returnedPerson => setPersons(persons.concat(returnedPerson)));
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
            <Person persons={filter(persons, filterText)} onClick={(idx) => handleDeleteClick(idx)}/>
        </div>
    );
};

export default App