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

})

// Put Todo
router.put('/:id', async (req, res, next) => {

})

//
// Delete Todo
router.delete('/:id', async (req, res, next) => {

})

module.exports = router;
