
const express = require('express')
const app = express();
const movies =require('./entities/movies')
const directors = require('./entities/directors')
app.use(express.json())

const routesDirector = require('./routes/directorsroutes.js')
const routesMovies = require('./routes/moviesroutes.js')


app.use('/api/directors',routesDirector)


// app.route('/api/directors').get((req,res)=>{ 
//  directors.getAllDirectors().then(resp =>{
//            res.send(resp.rows)
//     })
// })

// app.post('/api/directors',(req,res)=>{
//  directors.insertNewDirectors(req.body.id,req.body.movie_title,req.body.movie_geners,req.body.director_name,req.body.actor_name,req.body.actress_name,req.body.release_date)
//     .then(resp => res.send(resp.rows))
// })

//app.use('/api/directors',routes)
// app.get('/api/directors/:directorId',(req,res)=>{ 
//  directors.getAllDirectorsId(req.params.directorId).then(resp =>{
//         res.send(resp.rows)
           
//     })
// })

// app.put('/api/directors/:directorId',(req,res)=>{

//     directors.updateDirectors(req.params.directorId,req.body.director_name)
//         .then(resp => res.send(resp.command))
// })

// app.delete('/api/directors/:directorId',(req,res)=>{

//   directors.deleteDirector(req.params.directorId)
//     .then(resp => res.send(resp.command))
// })


// -----movies
app.use('/api/movies',routesMovies)
// app.get('/api/movies',(req,res)=>{
//     movies.getAllMovies().then(resp => res.send(resp.rows))
// })


// app.post('/api/movies',(req,res)=>{
//     movies.insertNewMovies(req.body.id,req.body.movie_title,req.body.movie_geners,req.body.director_name,req.body.actor_name,req.body.actress_name,req.body.release_date)
//        .then(resp => res.send(resp.rows))
// })



// app.get('/api/movies/:movieId',(req,res)=>{ 
//  movies.getAllMoviesId(req.params.movieId).then(resp =>{
//        res.send(resp.rows)
           
//     })
// })

// app.put('/api/movies/:movieId',(req,res)=>{

//     movies.updateMovies(req.params.movieId,req.body.movie_title)
//        .then(resp => res.send(resp.command))
//    })

//    app.delete('/api/movies/:movieId',(req,res)=>{
//     movies.deleteMovie(req.params.movieId)
//        .then(resp => res.send(resp))
//    })

const port = process.env.PORT || 3001
app.listen(port,()=>console.log(`listening on port ${port}...`))