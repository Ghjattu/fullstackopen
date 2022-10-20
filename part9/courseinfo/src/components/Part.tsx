import { CoursePart } from '../types';

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

interface Part {
	part: CoursePart
}

const Part = ({ part }: Part) => {
	switch (part.type) {
	case 'normal':
		return (
			<div>
				<p><b>{ part.name } { part.exerciseCount }</b></p>
				<p><i>{ part.description }</i></p>
			</div>
		);
	case 'groupProject':
		return (
			<div>
				<p><b>{ part.name } { part.exerciseCount }</b></p>
				<p>projects exercises: {part.groupProjectCount}</p>
			</div>
		);
	case 'submission':
		return (
			<div>
				<p><b>{ part.name } { part.exerciseCount }</b></p>
				<p><i>{ part.description }</i></p>
				<p>submit to: {part.exerciseSubmissionLink}</p>
			</div>
		);
	case 'special':
		return (
			<div>
				<p><b>{ part.name } { part.exerciseCount }</b></p>
				<p><i>{ part.description }</i></p>
				<p>required skills: {part.requirements.join(',')}</p>
			</div>
		);
	default:
		return assertNever(part);
	}
};

export default Part;