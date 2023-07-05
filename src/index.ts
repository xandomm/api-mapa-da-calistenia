import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';

import { getPlaces } from './services/getPlaceServices';
import { addPlace } from './services/addPlaceServices';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/places', getPlaces);

app.post('/places', addPlace);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});