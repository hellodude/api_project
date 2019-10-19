const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    database:'postgres',
    password :"aman",
    port:'5432'
})
function getAllDirectors(){
    const query = {
        text:"SELECT id,director_name from movies"
    }
    return pool.query(query)

}
module.exports.getAllDirectors = getAllDirectors

function getAllDirectorsId(id){
    const query ={
        text:"SELECT id,director_name FROM movies WHERE id = $1",
        values:[id]
    }
    return pool.query(query)
}
module.exports.getAllDirectorsId = getAllDirectorsId

function updateDirectors(id,director_name){
    const query ={
        text:`UPDATE movies SET director_name = $2 WHERE id = $1`,
        values:[id,director_name]
    }
    return pool.query(query)
}
module.exports.updateDirectors = updateDirectors

function insertNewDirectors(id,movie_title,movie_geners,director_name,actor_name,actress_name,release_date){
    const query = {
        text:"INSERT INTO movies(id,movie_title,movie_geners,director_name,actor_name,actress_name,release_date) VALUES ($1,$2,$3,$4,$5,$6,$7)",
        values:[id,movie_title,movie_geners,director_name,actor_name,actress_name,release_date]
    }
    return pool.query(query)
}
module.exports.insertNewDirectors = insertNewDirectors

function deleteDirector(id){
    const query ={
        text:'DELETE FROM movies WHERE id = $1',
        values:[id]
    }
    return pool.query(query)
}
module.exports.deleteDirector = deleteDirector