import express, { Request, Response } from 'express';
import knex from './database/connection';

const routes = express.Router();

routes.get('/items', async (req: Request, res: Response) => {
  const items = await knex('items').select('*');

  const serializedItems = items.map(item => {
    return { name: item.title, image_url: `http://localhost:3333/uploads/${item.image}` }
  })

  return res.json(serializedItems);
});

routes.post('/points', async (req: Request, res: Response) => {

});

export default routes;