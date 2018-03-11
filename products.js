const express = require('express');
var path = require('path');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
         cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
   
    
}
const upload = multer({storage: storage})



const Product = require('../models/product');

// to get all products products
router.get("/",(req, res, next) =>{
    //console.log(req.file);

    Product.find()
    .select("name description price specification category productImage _id")
    .populate('category')
    .exec()
    .then(docs =>{
       const response = {
           count: docs.length,
           products: docs.map(doc =>{
               return{
                   _id: doc._id,
                  name: doc.name,
                  description: doc.description,
                  price: doc.price,
                  specification: doc.specification,
                  category: doc.category,
                  productImage: doc.productImage,
                  request: {
                      type:'GET',
                      URL: 'http://localhost:8101/products/' + doc._id
                       
                  }

               }
           })

       };
      //  if(docs.length >= 0) {
            res.status(200).json(response);
        // }else{
        //     res.status(404).json({
        //         message: 'no entries are found'
        //     });
        // }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

});


// to get products by id

router.get('/productId:',( req, res, next)=> {
    const id = req.params.productId;
    Product.findById(id)
    .populate('category')
    .exec()
    .then(doc => {
        console.log(doc);
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({message:'no product found with this id'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
} );

// tp patch products

router.patch('/productId:',( req, res, next)=> {
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
   Product.update({_id: id},{$set:updateOps})
   .exec()
   .then(result =>{
       console.log(result);
       res.status(200).json(result);
   })
   .catch(err =>{
       console.log(err);
       res.status(500).json({
           error: err
       });
   })
});

// to delete products

router.delete('/productId:',( req, res, next)=> {
    const id = req.params.productId;
   Product.remove({_id: id})
   .select('name description price specification category productImage')
   .exec()
   .then(doc =>{
       res.status(200).json({
           Product: doc,
           request:{
               type:'GET',
               url:'http://localhost:8101/products'
           }
       });
   })
   .catch(err =>{
       console.log(err);
       res.status(500).json({
           err: err
       });
   });
} );

// to add my products
router.post("/",upload.single('productImage'), (req, res, next) => {
   // console.log(req.file);
   const product = new Product({
    _id:new mongoose.Types.ObjectId(),
   name:req.body.name,
   description:req.body.description,
   price:req.body.price,
   specification:req.body.specification,
   category:req.body.category,
   productImage:req.file.path
   
   });
    product
    .save()
    .then(result =>{
       console.log(result);
       res.status(200).json({
        message: 'products saved',
        createdProduct: {
            _id:result._id,
            name:result.name,
            description:result.description,
            price:result.price,
            specification:result.specification,
            category:result.category,
            productImage:result.productImage,
            request:{
                type:'GET',
                url:'http://localhost:8101/products/' + result._id
            }
        }
    });
    })
    .catch(err => {
        console.log(err);
        res.status(200).json({
            error: err
        })
    });
});

module.exports = router;