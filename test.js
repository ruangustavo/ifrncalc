const gradesArray = [
	{ nota: 71, faltas: 6 },
	{ nota: 66, faltas: 0 },
	{ nota: 50, faltas: 0 },
	{ nota: null, faltas: 0 },
];

const stageToWeight = { 1: 2, 2: 2, 3: 3, 4: 3 };

let totalWeightNull = 0;
let sumOfGradesNotNull = 0;

for (let i = 0; i < gradesArray.length; i++) {
	const currentStageGrade = gradesArray[i];
	const weight = stageToWeight[i + 1];

	if (currentStageGrade.nota === null) {
		totalWeightNull += weight;
	} else {
		sumOfGradesNotNull += currentStageGrade.nota * weight;
	}
}

const gradeNeededToPass = (60 * 10 - sumOfGradesNotNull) / totalWeightNull;
const gradeNeededToPassRounded = Math.round(gradeNeededToPass);
console.log(gradeNeededToPassRounded);
