interface CoursePartBase {
	name: string;
	exerciseCount: number;
	type: string;
}

interface CoursePartBaseTwo extends CoursePartBase {
	description: string
}

interface CourseNormalPart extends CoursePartBaseTwo {
	type: 'normal';
}

interface CourseProjectPart extends CoursePartBase {
	type: 'groupProject';
	groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBaseTwo {
	type: 'submission';
	exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBaseTwo {
	type: 'special';
	requirements: Array<string>
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;
