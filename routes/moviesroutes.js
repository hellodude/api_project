const express = require('express')
const router = express.Router()
const Joi = require('joi')
const movies =require('./movies')

router
.route('/')
.get((req,res,next)=>{
    movies.getAllMovies().then(resp =>{
        res.send(resp.rows)
    }).catch(next)
})

router
.route('/')
.post((req,res,next)=>{
    const schema = {
            id:Joi.number().integer(),
            movie_title: Joi.string().min(3).max(50).required(),
            movie_geners: Joi.string().min(3).max(50).required(),
            director_name:Joi.string().min(3).max(50).required(),
            actor_name:Joi.string().min(3).max(50).required(),
            actress_name:Joi.string().min(3).max(50).required(),
            release_date:Joi.date()

    }
    const result = Joi.validate(req.body,schema)
    if(result.error){
        res.status(400).send(result.error.details[0].message)
    }else{
    movies.insertNewMovies(req.body.id,req.body.movie_title,req.body.movie_geners,req.body.director_name,req.body.actor_name,req.body.actress_name,req.body.release_date).then(resp =>{
        res.send(resp.command)
    }).catch(next)
    }
})



router
.route('/:id')
.get((req,res,next)=>{
    
    
        movies.getAllMoviesId(req.params.id).then(resp =>{
            res.send(resp.rows)
        }).catch(next)
    
})


router
.route('/:id')
.put((req,res,next)=>{

    const schema = {
        movie_title: Joi.string().min(3).max(50).required()
        
    }
    const result = Joi.validate(req.body,schema)

    
    movies.searchId(req.params.id).then(resp =>{
            
        if(resp.rows[0].exists){
            if(result.error){
                res.status(400).send(result.error.details[0].message)
            }else{
                movies.updateMovies(req.params.id,req.body.movie_title).then(resp =>{
        
                    res.send(resp.command)
                }).catch(next)
            }
    
        }else{
            res.status(404).send('Entry Not Found')

        }
    })
})


router
.route('/:id')
.delete((req,res,next)=>{

    movies.searchId(req.params.id).then(resp =>{
        
        if(resp.rows[0].exists){
            movies.deleteMovie(req.params.id).then(resp =>{
                res.send(resp.command)
            }).catch(next)
        }else{
            res.status(404).send('Entry Not Found')
        }
    })
})

module.exports = router