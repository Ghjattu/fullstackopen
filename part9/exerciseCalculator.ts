interface Result {
    periodLength: number;
    trainingDays: number;
    target: number;
    success: boolean;
    average: number;
    rating: number;
    ratingDescription: string;
}

const parseArguments2 = (args: Array<string>) => {
    if (args.length < 4) throw new Error('Not enough arguments');

    if (isNaN(Number(args[2]))) {
        throw new Error('Provided values were not numbers!');
    }
    const target = Number(args[2]);
    const hours = [];
    for (let i = 3; i < args.length; i++) {
        if (isNaN(Number(args[i]))) {
            throw new Error('Provided values were not numbers!');
        }
        hours.push(Number(args[i]));
    }

    return {
        exerciseHours: hours,
        target: target,
    };
};

const calculateExercises = (exerciseHours: Array<number>, target: number): Result => {
    let sum = 0;
    exerciseHours.forEach(hour => sum += hour);
    const avg = sum / exerciseHours.length;

    let description, rating;
    if (avg - target < -1) {
        rating = 1;
        description = 'bad';
    } else if (avg - target < 0) {
        rating = 2;
        description = 'not too bad but could be better';
    } else {
        rating = 3;
        description = 'good';
    }

    return {
        periodLength: exerciseHours.length,
        trainingDays: exerciseHours.filter(hour => hour != 0).length,
        target: target,
        success: avg >= target,
        average: avg,
        rating: rating,
        ratingDescription: description
    }
};

try {
    const {exerciseHours, target} = parseArguments2(process.argv);
    console.log(calculateExercises(exerciseHours, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
