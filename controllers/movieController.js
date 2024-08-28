import { MovieModel } from '../models/movie.js';
import { validateMovie, validatePartialMovie } from '.././schemas/movies.js';
export class MovieController{

    static async getAll(req,res) {
        const {genre, search}= req.query
        const movies = await MovieModel.getAll({genre:genre, search:search})
        if(!movies ){
            return res.status(404).json({message:"Resouce not found"} )
        }
        return res.json(movies)
    }

    static async getById(req,res) {// path to regexp
        const { id }= req.params
        const movie= await MovieModel.findById(id)
        if(movie) return res.json(movie)
      
        res.status(404).json({message: 'Movie not found'})
    }

    static async createMovie(req,res)  {
   
        const result = validateMovie(req.body);
        if(!result.success){// result.error si hay error
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
    
        // en base de datos 
        const newMovie = await MovieModel.create(result.data)
    
        res.status(201).json(newMovie)// actualizar la cache del cliente
    }

    static async updateMovie(req,res){
        const { id } = req.params;
        const result = validatePartialMovie(req.body)
        if(!result.success){
            return res.status(400).json({error:JSON.parse(result.error.message)})
         }
         const updateMovie = await MovieModel.updateMovie({id:id, input:result.data});
        if(!updateMovie){
            return res.status(404).json({message:'movie not found'})
        }
        
       
        return res.json(updateMovie);
    }

    static async deleteMovie(req,res){
        const {id} = req.params
        const result = MovieModel.deleteMovie({id:id});
        if(!result) return res.status(404).json({message:'movie not found'})
        
        return res.json({message:"Movie deleted"});
    }
}