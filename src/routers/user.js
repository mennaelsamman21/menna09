const express = require('express')
const User = require('../models/user')
const router = express.Router()

//post
router.post ('/user' , (req , res) => {
    console.log(req.body)

    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

/////////////////////////////////////////////////

//get 
router.get('/user' , (req , res) => {
    User.find({}).then((user) => {
        res.status(200).send(user)
    }).catch((e) => {
        res.status(500).send()
    })
})

///////////////////////////////////////////////////

//get by id
router.get('/user/:id' , (req , res) => {
    console.log(req.params)
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if(!user) {
            return res.status(404).send('Unable to find user')
        }
        res.status(200).send(user)
    }).catch((e) => {
        res.status(500).send()
    })
})

/////////////////////////////////////////////////////////////////////

//patch

router.patch('/user/:id' , async(req , res) => {
    try {
        const _id = req.params.id
        const user = await User.findByIdAndUpdate(_id , req.body , {
            new : true,
            runValidators : true
        })
        if(!user) {
            return res.status(404).send('Unable to find user')
        }
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

/////////////////////////////////////////////////////////////////////

//delete

router.delete('/user/:id' , async(req , res) => {
    try {
        const _id = req.params.id
        const user = await User.findByIdAndDelete(_id)
        if(!user) {
            return res.status(404).send('Unable to find user')
        }
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router