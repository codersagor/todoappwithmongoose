const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');

const Todo = new mongoose.model("Todo", todoSchema)



// Get All Todo
router.get('/', async (req, res, next) => {
   let todoArray = await Todo.find().limit(3).select({
       _id: 0,
       __v: 0,
       date: 0
   });
    res.status(200).json(todoArray);
});

// Get a single Todo
router.get('/:id', async (req, res, next) => {
    let id = req.params.id;
    let singleTodo = await Todo.findOne({_id: id});
    res.status(200).json(singleTodo);
})

// Post a todo
router.post('/', async (req, res, next) => {
    try {
        const { title, status, description } = req.body;
        await new Todo({title, status, description}).save();
        res.status(200).json({msg: "Todo Added"});

    } catch (err) {
        console.log(err)
        res.status(500).json({msg: "Internal Server Error"});
    }
})

// Post multiple todo
router.post('/all', async (req, res, next) => {
   try {
       const todosData = req.body;
       await Todo.create(todosData);
       res.status(200).json({msg: "Todo Added"});
   } catch (err) {
        console.log(err)
       res.status(500).json({msg: "Todo Added failed"});
   }
})

// Put Todo
router.put('/:id', async (req, res, next) =>{
    try {
        await Todo.updateOne({_id: req.params.id}, {
            $set: {
                status: "active",
                title: "Title UpDATED"
            }
        });
        res.status(200).json({msg: "Todo Update done"});
    } catch (err) {
        if(err) {
            res.status(500).json({msg: "Todo Update failed"});
        }
    }
})

// new put method
router.put('/update/:id', (req, res, next) => {
    const id = req.params.id;
    const QUERY = {_id: id};
    let reqBody = req.body;

    try {
     Todo.updateOne(QUERY, reqBody);
     console.log(x)
      res.status(200).json({msg: "Todo Update done"})
    } catch (err) {
        if(err) {
            console.log(err)
            res.status(500).json({msg: "Todo Update failed"});
        }
    }

})

//
// Delete Todo
router.delete('/:id', async (req, res, next) => {
    let id = req.params.id;
    let  Query = {status: id};
    try {
        Todo.deleteOne({Query});
        res.json({msg: "File Deleted"})
    } catch(err) {
        res.json({msg: "Delete Failed"})
    }
})

module.exports = router;
