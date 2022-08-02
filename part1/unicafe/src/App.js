import {useState} from 'react'

const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>{text}</button>
    );
};

const StatisticsLine = ({text, value}) => {
    return (
        <p>{text} {value}{text === 'positive' ? '%' : ''}</p>
    );
};

const Statistics = (props) => {
    const {good, neutral, bad, all} = props;

    if (all === 0) {
        return (
            <div>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </div>
        );
    }

    return (
        <div>
            <h1>statistics</h1>
            <StatisticsLine text="good" value={good}/>
            <StatisticsLine text="neutral" value={neutral}/>
            <StatisticsLine text="bad" value={bad}/>
            <StatisticsLine text="all" value={all}/>
            <StatisticsLine text="average" value={(good - bad) / all}/>
            <StatisticsLine text="positive" value={good / all * 100}/>
        </div>
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
            <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
        </div>
    );
};

export default App