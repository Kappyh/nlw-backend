import express, { Request, Response, request } from 'express';

const app = express();

app.use(express.json());

const users = ['Diego', 'Gabriela', 'Ted'];

app.get('/users', (req: Request, res: Response) => {
  const search = String(req.query.search);
  const filteredUsers = search ? users.filter(user => user.includes(search)) : users;
  res.json(filteredUsers);
});

app.get('/users/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const user = users[id];

  return res.json(user);
});

app.post('/users', (req: Request, res: Response) => {
  const data = req.body;
  const user = data;
  return res.json(user);
});

app.listen('3333', () => {
  console.log('server working')
});