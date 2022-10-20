import React from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { Entry, Patient } from "../types";
import Hospital from "./Hospital";
import HealthCheck from "./HealthCheck";
import OccupationalHealthcare from "./OccupationalHealthcare";

const style = {
	border: 1,
	borderColor: 'black',
	borderStyle: 'solid',
	padding: 3,
	borderRadius: 5,
	marginTop: 10,
	marginBottom: 10
};

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
	switch (entry.type) {
		case "Hospital":
			return <Hospital entry={entry}/>;
		case "HealthCheck":
			return <HealthCheck entry={entry}/>;
		case "OccupationalHealthcare":
			return <OccupationalHealthcare entry={entry}/>;
		default:
			return assertNever(entry);
	}
};

const PatientPage = ({ patients }: { patients: Patient[] }) => {
	const id = useParams<{id: string}>().id;
	const patient = patients.find(patient => patient.id === id);

	if (patient === undefined) {
		return (
			<div>
				<p>Not Found</p>
			</div>
		);
	}

	return (
		<div>
			<Typography variant="h5" style={ { margin: "0.5em 0" } }>
				{ patient.name }
			</Typography>
			<p>ssn: { patient.ssn }</p>
			<p>occupation: { patient.occupation }</p>
			<Typography variant="h6" style={ { margin: "1.5em 0 0.5em" } }>
				entries
			</Typography>
			{patient.entries.map((entry, index) => (
				<div key={index} style={style}>
					<EntryDetails entry={entry}/>
				</div>
			))}
		</div>
	);
};

export default PatientPage;