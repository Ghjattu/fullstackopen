import {useState} from 'react'

const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>{text}</button>
    );
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const all = good + neutral + bad;

    const handleGoodClick = () => setGood(good + 1);
    const handleNeutralClick = () => setNeutral(neutral + 1);
    const handleBadClick = () => setBad(bad + 1);

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={handleGoodClick} text="good"/>
            <Button handleClick={handleNeutralClick} text="neutral"/>
            <Button handleClick={handleBadClick} text="bad"/>
            <h1>statistics</h1>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {good + neutral + bad}</p>
            <p>average {all > 0 ? (good - bad) / all : 0}</p>
            <p>positive {all > 0 ? good / all * 100 : 0}%</p>
        </div>
    )
};

export default App