const express = require('express');
var path = require('path');
const router = express.Router();
const mongoose = require('mongoose');

const Category = require('../models/category');

router.get('/',(req, res, next) => {
   
    Category.find()
    .select('name details _id')
    .exec()
    .then(docs =>{
        const response ={
            count:docs.length,
            categories: docs.map(doc =>{
                return{
                    _id: doc._id,
                    name: doc.name,
                    details: doc.details,
                    request:{
                        type:"GET",
                        url: "http://localhost:8101/categories/" + doc._id
                    }
                }
            })
        };
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
   
    
    });
    
// find category id

router.get('/categoryId:',( req, res, next)=> {
    const id = req.params.categoryId;
    Category.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({message:'no category found with this id'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
} );

    
    router.post('/', (req, res, next) =>{
        
        res.status(201).json({
        message:"what category you looking for"
        
        });
        
        });
    
    module.exports = router;