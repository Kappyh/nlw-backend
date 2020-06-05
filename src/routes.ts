import express, { Request, Response } from 'express';
import knex from './database/connection';

const routes = express.Router();

routes.get('/items', async (req: Request, res: Response) => {
  const items = await knex('items').select('*');

  const serializedItems = items.map(item => {
    return { name: item.title, id: item.id, image_url: `http://localhost:3333/uploads/${item.image}` }
  })

  return res.json(serializedItems);
});

routes.post('/points', async (req: Request, res: Response) => {
  const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items
  } = req.body;

  const trx = await knex.transaction();

  const insertedIds = await trx('points').insert({
    image: 'image-fake',
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf
  });

  const point_id = insertedIds[0];

  const pointItems = items.map((item_id: number) => { return { item_id, point_id }; })

  await trx('point_items').insert(pointItems)

  return res.json({ sucess: 'true' })
});

export default routes;