import {useState} from 'react';
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
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterText, setFilterText] = useState('');

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