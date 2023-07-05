import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { pool } from './pool';

interface Place {
    id: string;
    lat: string;
    long: string;
    description: string;
    equipments: string[];
    title: string;
    rate: number;
}

export async function addPlace(req: Request, res: Response) {
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
  }
