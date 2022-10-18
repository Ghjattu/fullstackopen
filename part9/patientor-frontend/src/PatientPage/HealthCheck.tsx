import { HealthCheckEntry, HealthCheckRating } from "../types";
import React from "react";

const getRating = (rate: HealthCheckRating): string => {
	switch (rate) {
		case HealthCheckRating.Healthy:
			return "Healthy";
		case HealthCheckRating.LowRisk:
			return "LowRisk";
		case HealthCheckRating.HighRisk:
			return "HighRisk";
		case HealthCheckRating.CriticalRisk:
			return "CriticalRisk";
	}
};

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
	return (
		<div>
			<span>{entry.date}</span>
			<p><i>{entry.description}</i></p>
			<p>healthy rating: <b>{getRating(entry.healthCheckRating)}</b></p>
			<p>diagnose by {entry.specialist}</p>
		</div>
	);
};

export default HealthCheck;