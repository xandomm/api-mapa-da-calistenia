import { pool } from './pool';
import { Request, Response } from 'express';

export async function getPlaces(req: Request, res: Response) {
    try {
      const { rows } = await pool.query('SELECT * FROM places');
      res.json(rows);
    } catch (error) {
      console.error('Error retrieving places:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }