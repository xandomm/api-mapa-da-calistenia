import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { pool } from './pool';
import sqlstring from 'sqlstring';

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
    // Validate inputs
    if (!title || !lat || !long || !description || !equipments || !rate) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // Sanitize inputs
    const sanitizedTitle = sanitizeInput(title);
    const sanitizedLat = sanitizeInput(lat);
    const sanitizedLong = sanitizeInput(long);
    const sanitizedDescription = sanitizeInput(description);
    const sanitizedEquipments = equipments.map((equip) => sanitizeInput(equip));


    await pool.query(
      'INSERT INTO places (id, title, lat, long, description, equipments, rate) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, sanitizedTitle, sanitizedLat, sanitizedLong, sanitizedDescription, sanitizedEquipments, rate]
    );
    res.status(201).json({ message: 'Place created successfully', id });
  } catch (error) {
    console.error('Error creating place:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

function sanitizeInput(input: string) {
  return sqlstring.escape(input);
}