const express = require('express')
const router = express.Router()
const Student = require('../models/student') 
//Getting all students
router.get('/', async (req, res) => {
    try {
        const Students = await Student.find()
        res.json(Students)
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
})
//Getting one
router.get('/:id', getStudent, (req, res) => {
    res.json(res.student)
})
//Creating
router.post('/', async (req, res) => {
    const student = new Student({
        name: req.body.name,
        age: req.body.age,
        std: req.body.std
    }) 
    try {
        const newstud = await student.save()
        res.status(201).json(newstud) 
    }
    catch(err) {
        res.status(400).json({message: err.message })
    }
}) 
//Updating
router.patch('/:id', getStudent, async (req, res) => {
        if(req.body.name != null) {
            res.student.name = req.body.name
        }
        if(req.body.age != null) {
            res.student.age = req.body.age
        }
        if(req.body.std != null) {
            res.student.std = req.body.std
        }         
        try {
            const update = await res.student.save()
            res.json(update)
        }
        catch(err) {
            res.status(400).json({message: err.message})
        }
})
//Deleting
router.delete('/:id', getStudent, async (req, res) => {
    try{
        await res.student.remove()
        res.json({ message: 'Deleted'})
    }
    catch (err) {
        res.status(500).json({ message: err.message})
    }
})

async function getStudent(req, res, next) {
    try {
        student = await Student.findById(req.params.id)
        if(student == null) {
            res.status(404).json({message:'not found'})
        }
    }
    catch(err) {
        return res.status(500).json({message: err.message})
    }
    res.student = student
    next()
}
module.exports = router