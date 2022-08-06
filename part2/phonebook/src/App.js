import {useEffect, useState} from 'react';
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import service from "./utils";

const checkNameEqual = (persons, newPerson) => {
    for (let i = 0; i < persons.length; i++) {
        if (persons[i].name === newPerson.name) {
            return i;
        }
    }
    return -1;
};


const checkNumberEqual = (persons, newPerson) => {
    for (let i = 0; i < persons.length; i++) {
        if (persons[i].number === newPerson.number) {
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
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState('');

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
        };
        const idx = checkNameEqual(persons, newPerson);

        if (checkNumberEqual(persons, newPerson)) {
            alert(`${newNumber} is already added to phonebook`);
        } else if (idx !== -1) {
            const id = persons[idx].id;
            if (window.confirm(`${persons[idx].name} is already added to phonebook, replace the old number with a new one?`)) {
                service.update(id, newPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== id ? person : returnedPerson));
                        setMessage(`Updated ${returnedPerson.name}'s phone number.`);
                        setMessageType('success');
                        setTimeout(() => setMessage(null), 3000);
                    })
                    .catch(() => {
                        setPersons(persons.filter(person => person.id !== id));
                        setMessage(`the ${newPerson.name} was already deleted from server.`);
                        setMessageType('error');
                        setTimeout(() => setMessage(null), 3000);
                    });
            }
        } else {
            service.create(newPerson)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson));
                    setMessage(`Added ${returnedPerson.name}.`);
                    setMessageType('success');
                    setTimeout(() => setMessage(null), 3000);
                });
        }
        setNewName('');
        setNewNumber('');
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} className={messageType}/>
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