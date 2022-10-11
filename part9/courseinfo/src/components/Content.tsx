interface PartType {
    name: string,
    exerciseCount: number
}

interface ContentType {
    parts: Array<PartType>
}

const Content = (props: ContentType) => {
	return (
		<div>
			{ props.parts.map((part, index) => (
				<p key={index}>{part.name} {part.exerciseCount}</p>
			)) }
		</div>
	);
};

export default Content;