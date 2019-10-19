const {Pool,Client} = require('pg')
const fs = require('fs')
const movies = JSON.parse(fs.readFileSync('./dataset/movies.json','utf-8'))

const pool = new Pool({
    user: 'postgres',
    database:'postgres',
    password :"aman",
    port:'5432'
})

function dropTable(){
    const query ={
        text:'DROP TABLE IF EXISTS movies '
    }
    return new Promise((resolve,reject)=>{

        resolve(pool.query(query))
    })
    
}

function createTable(){

    const query ={
        text:"CREATE TABLE movies(id serial PRIMARY KEY,movie_title varchar(100),movie_geners varchar(100),director_name varchar(100),actor_name varchar(100),actress_name varchar(100),release_date date)"
    }

    return new Promise((resolve,reject)=>{
            resolve(pool.query(query))
    })
    
}

function insert(){
    movies.forEach(movieObj => {
        const query = {
                text:'INSERT INTO movies(id,movie_title,movie_geners,director_name,actor_name,actress_name,release_date) VALUES($1,$2,$3,$4,$5,$6,$7)',
                values : Object.values(movieObj)
            }
            
            pool.query(query).then(res => console.log(res)).catch(e => console.log(e.stack))
            
        });
        
}


dropTable().then(() =>{

    return createTable()
}).then(() =>{
    
    insert()
})
