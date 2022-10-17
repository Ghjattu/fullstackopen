import React from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { Patient } from "../types";

const PatientItem = ({ patients }: { patients: Patient[] }) => {
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
		</div>
	);
};

export default PatientItem;