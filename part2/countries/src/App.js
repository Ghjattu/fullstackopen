import React, {useEffect, useState} from "react";
import axios from "axios";

const filter = (countries, searchName) => {
    if (searchName === '')
        return [];

    const results = [];
    searchName = searchName.toLowerCase();
    countries.forEach(country => {
        if (country.name.common.toLowerCase().indexOf(searchName) !== -1) {
            results.push(country);
        }
    })
    return results;
};

const showData = (countries, searchName) => {
    const results = filter(countries, searchName);

    if (results.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (results.length > 1) {
        return results.map(res => <p key={res.name.official}>{res.name.common}</p>);
    } else if (results.length === 1) {
        return (
            <div>
                <h1>{results[0].name.common}</h1>
                <p>region: {results[0].region}</p>
                <p>area: {results[0].area}</p>
                <img src={results[0].flags.png} alt="flag"/>
            </div>
        );
    } else {
        return <div></div>;
    }
};

const App = () => {
    const [countries, setCountries] = useState([]);
    const [searchName, setSearchName] = useState('');

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(res => setCountries(res.data));
    }, []);

    const handleChange = (e) => {
        setSearchName(e.target.value);
    };

    return (
        <div>
            <div>
                <span>find countries </span>
                <input type="text" value={searchName} onChange={handleChange}/>
            </div>
            <div>
                {showData(countries, searchName)}
            </div>
        </div>
    );
};

export default App