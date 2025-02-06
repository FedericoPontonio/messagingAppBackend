const express = require('express');
const chatRouter = express.Router()
const chatController = require('../controllers/chatController');
const { message } = require('../prisma.config');


chatRouter.get('/', (req, res) => {
    res.status(200).json({
        message:'hello'
    })
})


chatRouter.post('/', async (req, res) => {
    try {
        await chatController.createChat(req.body.name);
        res.status(200).json({
            message: 'Chat created succesfully.'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error.'
        })
    }
})

chatRouter.delete('/', async (req, res) => {
    try {
        console.log(req.body.id)

        await chatController.deleteChat(req.body.id)
        res.status(200).json({
            message: 'Chat deleted successfully.'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error.'
        })
    }
})

//add user to chat
chatRouter.post('/addUser', async (req, res) => {
    try {
        const userId = req.body.userId;
        const chatId = req.body.chatId;
        await chatController.addUser(chatId, userId);
        res.status(200).json({
            message: 'user ' + userId + ' is now partecipating in chat ' + chatId
        })
    } catch (error) {
        if (error.code=='P2002') {
            res.status(403).json({
                message: 'The selected user is already a member of the chat.'
            })
        }
        else {
            res.status(500).json({
            message: 'Internal server error'
        })
        }

    }


})






module.exports = chatRouter;