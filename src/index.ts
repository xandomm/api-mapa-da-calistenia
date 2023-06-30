import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Pool } from 'pg';

interface Place {
    id: string;
    lat: string;
    long: string;
    description: string;
    equipments: string;
    title: string;
    rate: number;
}

const app = express();
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'docker',
  port: 5432,
});

app.get('/places', async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query('SELECT * FROM places');
    res.json(rows);
  } catch (error) {
    console.error('Error retrieving places:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/places', async (req: Request, res: Response) => {
  const { title, lat, long, description, equipments, rate }: Place = req.body;
  const id = uuidv4();

  try {
    await pool.query(
      'INSERT INTO places (id, title, lat, long, description, equipments, rate) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [id, title, lat, long, description, equipments, rate]
    );
    res.status(201).json({ message: 'Place created successfully', id });
  } catch (error) {
    console.error('Error creating place:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});