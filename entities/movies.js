const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    database:'postgres',
    password :"aman",
    port:'5432'
})

function getAllMovies(){
    const query = {
        text:"SELECT id,movie_title from movies"
    }
    return pool.query(query)

}
module.exports.getAllMovies = getAllMovies

function getAllMoviesId(id){
    const query = {
        text: "SELECT id , movie_title FROM movies WHERE id = $1",
        values:[id]
    }
    return pool.query(query)
}
module.exports.getAllMoviesId = getAllMoviesId


function insertNewMovies(id,movie_title,movie_geners,director_name,actor_name,actress_name,release_date){
    const query = {
        text:"INSERT INTO movies(id,movie_title,movie_geners,director_name,actor_name,actress_name,release_date) VALUES ($1,$2,$3,$4,$5,$6,$7)",
        values:[id,movie_title,movie_geners,director_name,actor_name,actress_name,release_date]
    }
    return pool.query(query)
}
module.exports.insertNewMovies = insertNewMovies



function updateMovies(id,movie_title){
    const query ={
        text:`UPDATE movies SET movie_title = $2 WHERE id = $1`,
        values:[id,movie_title]
    }
    return pool.query(query)
}
module.exports.updateMovies = updateMovies

function deleteMovie(id){
    const query ={
        text:'DELETE FROM movies WHERE id = $1',
        values:[id]
    }
    return pool.query(query)
}
module.exports.deleteMovie = deleteMovie
