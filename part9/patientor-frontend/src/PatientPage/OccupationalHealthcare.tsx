import { OccupationalHealthcareEntry } from "../types";
import React from "react";
import { useStateValue } from "../state";

const OccupationalHealthcare = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
	const [{ diagnoses }] = useStateValue();

	const findName = (code: string) => {
		const obj = Object.values(diagnoses).find(diagnose => diagnose.code === code);
		if (obj === undefined)
			return null;
		return obj.name;
	};

	return (
		<div>
			<span>{entry.date}</span>
			<p><i>{entry.description}</i></p>
			<p>employer name: {entry.employerName}</p>
			<ul>
				{entry.diagnosisCodes?.map((code, index) => (
					<li key={index}>
						{code} {findName(code)}
					</li>
				))}
			</ul>
			<p>diagnose by {entry.specialist}</p>
		</div>
	);
};

export default OccupationalHealthcare;