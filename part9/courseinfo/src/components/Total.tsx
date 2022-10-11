interface TotalType {
    sum: number
}

const Total = (props: TotalType) => {
	return (
		<div>
			Number of exercises: {props.sum}
		</div>
	);
};

export default Total;