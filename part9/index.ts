import express from 'express';
import {calculateBmi} from "./bmiCalculator";

const app = express();


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

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});