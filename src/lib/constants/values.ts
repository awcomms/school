type Grade = {
	value: string;
	label: string;
};
type Subject = {
	value: string;
	label: string;
};
type Term = {
	value: string;
	label: string;
};
type Year = {
	value: string;
	label: string;
};

// create a list of grades and their labels
export const grades: Grade[] = [
	{ value: 'n1', label: 'Nursery 1' },
	{ value: 'n2', label: 'Nursery 2' },
	{ value: 'g1', label: 'Grade 1' },
	{ value: 'g2', label: 'Grade 2' },
	{ value: 'g3', label: 'Grade 3' },
	{ value: 'g4', label: 'Grade 4' },
	{ value: 'g5', label: 'Grade 5' },
	{ value: 'j1', label: 'Junior Secondary 1' },
	{ value: 'j2', label: 'Junior Secondary 2' },
	{ value: 'j3', label: 'Junior Secondary 3' }
];

// create a list of subjects and their labels
export const subjects: Subject[] = [
	{ value: 'math', label: 'Mathematics' },
	{ value: 'eng', label: 'English' },
	{ value: 'sci', label: 'Science' },
	{ value: 'soc', label: 'Social Studies' },
	{ value: 'art', label: 'Art' },
	{ value: 'mus', label: 'Music' },
	{ value: 'phy', label: 'Physical Education' },
	{ value: 'rel', label: 'Religion' },
	{ value: 'his', label: 'History' },
	{ value: 'geo', label: 'Geography' },
	{ value: 'lit', label: 'Literature' }
];

// create a list of terms and their labels
export const terms: Term[] = [
	{ value: '1', label: '1st term' },
	{ value: '2', label: '2nd term' },
	{ value: '3', label: '3rd term' }
];

// create a list of years and their labels
export const years: Year[] = [
	{ value: '2024', label: '2024' },
	{ value: '2025', label: '2025' },
	{ value: '2026', label: '2026' },
	{ value: '2027', label: '2027' }
];
