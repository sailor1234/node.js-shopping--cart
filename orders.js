const express = require('express');
const router = express.Router();

// to get orders

router.get('/',(req, res, next) =>{
    res.status(200).json({
    message:"your order are complete"
    
    });
    
    });

    // tp post orders

    router.post('/',(req, res, next) =>{
        res.status(201).json({
        message:"your orders were created"
        
        });
        
        });

        // to get order by id

        router.get('/orderId',( req, res, next)=> {
            req.status(200).json({
                message:'you got order id done',
                orderid: req.params.orderid
            })
        } );

        // to delete orders

        router.delete('/orderId',( req, res, next)=> {
            req.status(200).json({
                message:'you deleted an order done',
                orderid: req.params.orderid
            })
        } );

module.exports = router;