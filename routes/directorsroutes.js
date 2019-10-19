const express = require('express')
const router = express.Router()

const movies =require('./movies')
const directors = require('./directors')


router
.route('/')
.get((req,res)=>{
    directors.getAllDirectors().then(resp =>{
               res.status(200).send(resp.rows)
        })
    
})

router
.route('/')
.post((req,res)=>{
    console.log("post")
    directors.insertNewDirectors(req.body.id,req.body.movie_title,req.body.movie_geners,req.body.director_name,req.body.actor_name,req.body.actress_name,req.body.release_date)
    .then(resp => res.send(resp.command))
})


router
.route('/:id')
.get((req,res)=>{

    directors.getAllDirectorsId(req.params.id).then(resp =>{
        res.send(resp.rows)
           
    })
})


router
.route('/:id')
.delete((req,res)=>{

    directors.deleteDirector(req.params.id).then(resp =>{
        res.send(resp.rows)
           
    })
})


router
.route('/:id')
.put((req,res)=>{

    directors.updateDirectors(req.params.id,req.body.director_name).then(resp =>{
        res.send(resp.command)
           
    })
})
module.exports = router