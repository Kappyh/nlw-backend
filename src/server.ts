import express, { Request, Response } from 'express';

const app = express();

app.get('/users', (req: Request, res: Response) => {
  res.json(['Diego', 'Gabriela', 'Ted']);
});

app.listen('3333', () => {

})