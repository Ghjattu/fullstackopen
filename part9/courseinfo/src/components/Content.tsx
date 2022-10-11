import { CoursePart } from '../types';
import Part from './Part';

interface CourseParts {
	parts: Array<CoursePart>
}

const Content = (props: CourseParts) => {
	return (
		<div>
			{ props.parts.map((part, index) => (
				<Part key={index} part={part}/>
			)) }
		</div>
	);
};

export default Content;