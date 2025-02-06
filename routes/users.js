const express = require('express')
const usersRouter = express.Router()
const userController = require('../controllers/userController')
const jwt = require('jsonwebtoken')
const authenticateToken = require('../middlewares/authenticateToken')
const authenticatePassword = require('../middlewares/authenticatePassword')

//login - get token
usersRouter.get('/', authenticatePassword, async (req, res) => {
    try {
        const user = await userController.getUserByUsername(req);
        if (user) {
            //3600 represents the seconds to be added to the current moment. it's 1 hour
            const accessToken = jwt.sign({ userId: user.id, exp: Math.floor(Date.now() / 1000) + 3600 }, process.env.SECRET);
            res.status(200).json({
                message: `Successful ${user.username}'s login`,
                token : accessToken
            });
        } else {
            res.status(404).json({
                //non serve a niente
                message: `User ${req.body.username} does not exist`
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});

//create user
usersRouter.post('/', async(req, res)=> {
    try {
        await userController.createUser(req)
        res.json({
            message: "Successfully created user"
        })
    } catch (error) {
        res.status(400).json({
            message: 'User already exists'
    })
    }
});

usersRouter.delete('/', async (req, res) => {
    try {
        await userController.deleteUser(req)
        res.status(200).json({
            message: 'Successfully deleted user'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'internal server error'
        })
    }
})

//test authenticate. expects Authorization header
usersRouter.get('/authorization', authenticateToken, (req, res)=>{
    try {
        // console.log(req.user)
        res.status(200).json({
            message: req.user
        })
    } catch (error) {
        console.log(error)
        res.status(403).json({
            message:'Unauthorized'
        })
    }

})

module.exports = usersRouter;