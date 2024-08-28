import zod from 'zod';

const moviSchema = zod.object({
    title: zod.string({
        invalid_type_error: 'Movie title must be a string',
        required_error: 'Movie title is required',
    }),
    year: zod.number().int().min(1900).max(2024),
    director: zod.string(),
    duration: zod.number().int().positive(),
    rate: zod.number().min(0).max(10).default(5),
    poster: zod.string().url(),
    genre: zod.array(
        zod.enum(['Terror','Action','Drama','Fantasy','Comedy','Adventure','Sobrenatural']),
        {
            required_error: 'Movie genre is required',
            invalid_type_error: 'Movie genre must be a array of enum genre'
        }
    )
})

export function validateMovie(object){
    return moviSchema.safeParse(object);
}

export function validatePartialMovie(input){
   return moviSchema.partial().safeParse(input);
}
// el partial lo que hace es hacer que todas las propiedades 
// que reciba la pelicula sean opcionales 
