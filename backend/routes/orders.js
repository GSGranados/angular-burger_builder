const express = require("express");
//Importing Mongoose model
const Order = require("../models/order");
const router = express.Router();

//ORDER A NEW BURGER

router.post("", (req, res, next) => {
  const order = new Order({
    name: req.body.name,
    cost: req.body.cost,
    onions: req.body.onions,
    lettuces: req.body.onions,
    cheeses: req.body.cheeses,
  });
  order
    .save()
    .then((savedOrder) => {
      res.status(201).json({
        message: "Order saved successfully",
        order: {
          ...savedOrder,
          id: savedOrder._id,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Saving your Order failed:"+ error,
      });
    });
});

//GET ALL THE ORDERS
router.get("",(req,res,next)=>{
  orderQuery = Order.find();
  orderQuery.then((documents)=>{
    res.status(200).json({
      message: "Orders Fetched Succesfully",
      orders: documents
    })
  }).catch(error => {
    res.status(500).json({
      message: "Fetching Orders Failed"
    })
  })
});


//GET AN ORDER
router.get("/:id", (req, res, next)=>{
  Order.findById(req.params.id).then(order=>{
    if(order){
      res.status(200).json(order);
    }else{
      res.status(404).json({
        message: "Order not found"
      });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching Order Failed"
    })
  })
});

module.exports = router;
