const Filter = (props) => {
    return (
        <div>
            <span>filter shown with </span>
            <input value={props.filterText} onChange={props.handleFilterTextChange}/>
        </div>
    );
};

export default Filter