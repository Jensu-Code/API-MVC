import { readJson } from "../utils/require.js";
import { randomUUID } from "node:crypto";

const movies = readJson('../movies.json');

export class MovieModel {
    
    static async getAll({ genre , search}){
        if(genre){
            if(search){
                const filterMovie= movies.filter(m=>{ return m.genre.includes(genre) && m.title==search} )
                // cualquiera de los dos recursos no han sido encontrados en la busqueda
                if(filterMovie.length===0) return false;
                
                return filterMovie;
            }
            const filterByGenre= movies.filter(m=> m.genre.some(g=> g.toLowerCase()=== genre.toLowerCase()))
            if(filterByGenre.length===0) return false;
            
            return filterByGenre;
        }
        return movies;
    }

    static async getById(id){
        const movie= movies.find(m => m.id == id)
        if(movie) return movie

        return false;
    }

    static async createMovie(input){
        const newMovie ={
            id: randomUUID(),
             ...input
        }
        movies.push(newMovie)

        return newMovie;
    }

    static async updateMovie({id, input}){
        const movieIndex = movies.findIndex(m=> m.id===id);
        if(movieIndex===-1) return false;
        
        const updateMovie = {
            ...movies[movieIndex],
            ...input
        }
        
        movies[movieIndex]= updateMovie;

        return updateMovie;
    }

    static async deleteMovie({id}){
        const movieIndex = movies.findIndex(m=> m.id===id);
        if(movieIndex===-1) return false;
        
        movies.splice(movieIndex,1)
        return true;
    }
}