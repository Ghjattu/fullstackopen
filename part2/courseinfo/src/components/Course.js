const Header = (props) => {
    return (
        <h1>{props.name}</h1>
    );
};

const Part = ({name, exercises}) => {
    return (
        <p>
            {name} {exercises}
        </p>
    );
};

const Content = (props) => {
    return (
        <div>
            {props.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
            <Total parts={props.parts}/>
        </div>
    );
};

const Total = (props) => {
    const total = props.parts.reduce((preValue, curValue) => preValue + curValue.exercises, 0);
    return (
        <p>
            total of {total} exercises
        </p>
    );
};

const Course = (props) => {
    return (
        <div>
            <Header name={props.course.name}/>
            <Content parts={props.course.parts}/>
        </div>
    );
};

export default Course