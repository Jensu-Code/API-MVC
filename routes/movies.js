import { Router } from 'express';

import { MovieController } from '../controllers/movieController.js';
export const moviesRouter = Router();

//const movies = readJson('../movies.json');
moviesRouter.get('/',MovieController.getAll);

moviesRouter.get('/:id',MovieController.getById);

moviesRouter.post('/',MovieController.createMovie)

moviesRouter.patch('/:id',MovieController.updateMovie)

moviesRouter.delete('/:id',MovieController.deleteMovie)