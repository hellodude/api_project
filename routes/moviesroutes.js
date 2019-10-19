const express = require('express')
const router = express.Router()

const movies =require('./movies')

router
.route('/')
.get((req,res)=>{
    movies.getAllMovies().then(resp =>{
        res.send(resp.rows)
    })
})

router
.route('/')
.post((req,res)=>{
    movies.insertNewMovies(req.body.id,req.body.movie_title,req.body.movie_geners,req.body.director_name,req.body.actor_name,req.body.actress_name,req.body.release_date).then(resp =>{
        res.send(resp.command)
    })
})



router
.route('/:id')
.post((req,res)=>{
    movies.getAllMoviesId(req.params.id).then(resp =>{
        res.send(resp.command)
    })
})


router
.route('/:id')
.put((req,res)=>{
    movies.updateMovies(req.params.id,req.body.movie_title).then(resp =>{
        res.send(resp.command)
    })
})


router
.route('/:id')
.delete((req,res)=>{
    movies.deleteMovie(req.params.id).then(resp =>{
        res.send(resp.command)
    })
})


module.exports = router