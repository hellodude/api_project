const express = require('express')
const router = express.Router()
const Joi = require('joi')
const directors = require('./directors')
const logger = require('../utils/logger')

router
.route('/')
.get((req,res,next)=>{
    directors.getAllDirectors().then(resp =>{

            res.status(200).send(resp.rows)
        }).catch(next)
    
})

router
.route('/')
.post((req,res,next)=>{
    const schema ={
        id:Joi.number().integer(),
        movie_title:Joi.string().min(3).max(50).required(),
        movie_geners:Joi.string().min(3).max(50).required(),
        director_name:Joi.string().min(3).max(50).required(),
        actor_name:Joi.string().min(3).max(50).required(),
        actress_name:Joi.string().min(3).max(50).required(),
        release_date:Joi.date()
    }
    const result = Joi.validate(req.body,schema)
    if(result.error){
        res.status(400).send(result.error.details[0].message)
    }else{
    directors.insertNewDirectors(req.body.id,req.body.movie_title,req.body.movie_geners,req.body.director_name,req.body.actor_name,req.body.actress_name,req.body.release_date)
    .then(resp => res.send(resp.command)).catch(next)
    }
})


router
.route('/:id')
.get((req,res,next)=>{

    directors.getAllDirectorsId(req.params.id).then(resp =>{
        
        res.send(resp.rows)
           
    }).catch(next)
})


router
.route('/:id')
.delete((req,res,next)=>{
    directors.searchId(req.params.id).then(resp =>{

        if(resp.rows[0].exists){
            directors.deleteDirector(req.params.id).then(resp =>{
                res.send(resp.rows)
        }).catch(next)
        }else{
            res.status(404).send('Entry Not Found')
        }
    })
})


router
.route('/:id')
.put((req,res,next)=>{
    const schema ={
        director_name:Joi.string().min(3).max(50).required()
    }
    const result = Joi.validate(req.body,schema)
    directors.searchId(req.params.id).then(resp =>{
            
        if(resp.rows[0].exists){
            if(result.error){
                res.status(400).send(result.error.details[0].message)
            }else{
                directors.updateDirectors(req.params.id,req.body.director_name).then(resp =>{
                    res.send(resp.command)
                }).catch(next)
            }
        }else{
            res.status(404).send('Entry not found')
        }
    })

})
module.exports = router