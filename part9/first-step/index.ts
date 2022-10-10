import express from 'express';
import { calculateBmi } from "./bmiCalculator";
import { isNumber } from "./utils";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());


app.get('/', (_req, res) => {
    res.send('Home Page');
});

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        res.status(401);
        res.json({error: "malformed parameters"});
        return;
    }

    const result = calculateBmi(height, weight);
    res.status(200);
    res.json({height: height, weight: weight, bmi: result});
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    const hours = req.body.daily_exercises, target = req.body.target;

    if (hours === undefined || target === undefined) {
        res.status(401);
        res.json({error: "parameters missing"});
        return;
    }

    if (!Array.isArray(hours) || !isNumber(target)) {
        res.status(401);
        res.json({error: "malformed parameters"});
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(hours, target);
    res.status(200);
    res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`);
});