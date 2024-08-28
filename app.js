import express, { json } from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import { moviesRouter } from './routes/movies.js';

//import fs from 'node:fs';
// leer un json en EsModules
//const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'));

// leer un json en EsModules recomendado por ahora
//import { createRequire } from 'node:module';
//const require = createRequire(import.meta.url)
const app = express();
const PORT = process.env.PORT ?? 1234;

// metodos normales GET/POST/HEAD
// metodos complejos DELETE/PUT/PATCH

// EN LOS METODO COMPLEJOS EXISTE EL CORS PRE-flight
// options

app.disable('x-powered-by');
app.use(json());
app.use(corsMiddleware()); ///

app.use('/movies', moviesRouter );

app.listen(PORT, ()=>{
    console.log(`listening on port: http://localhost:${PORT}`);
})