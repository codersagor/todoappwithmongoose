const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');

const Todo = new mongoose.model("Todo", todoSchema)



// Get All Todo
router.get('/', async (req, res, next) => {
    res.status(200).json({msg: "GET All Todo Page"})
});

// Get a single Todo
router.get('/:id', async (req, res, next) => {

})
// Post a todo
router.post('/', async (req, res, next) => {
    const newTodo = new Todo(req.body);

    await  newTodo.save((err) => {
        if(err) {
            res.status(500).json({
                msg: "there is a server side error"
            })
        } else {
            res.status(200).json({
                msg: "Todo Created"
            })
        }
    });
})

// Post multiple todo
router.post('/all', async (req, res, next) => {

})

// Put Todo
router.put('/:id', async (req, res, next) => {

})

//
// Delete Todo
router.delete('/:id', async (req, res, next) => {

})

module.exports = router;
