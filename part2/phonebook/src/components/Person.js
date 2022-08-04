const Person = (props) => {
    return (
        <div>
            {
                props.persons.map((person, idx) =>
                    <p key={person.id}>
                        {person.name} {person.number}
                        <button onClick={() => props.onClick(idx)}>delete</button>
                    </p>
                )
            }
        </div>
    );
};

export default Person