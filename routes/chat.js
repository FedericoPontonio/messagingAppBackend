const express = require('express');
const chatRouter = express.Router()
const chatController = require('../controllers/chatController');
const userController = require('../controllers/userController')
const authenticateToken = require('../middlewares/authenticateToken')

//get chats by user
chatRouter.get('/:userId', async(req, res) => {
    try {
        const chatIds= await chatController.getChatIdsByUserId(req.params.userId)
        const chatObjects = await chatController.getChatObjectsByChatIds(chatIds)
        const chatObjectsRearranged = await chatController.chatObjectsRearranged(chatObjects, req.params.userId)
        // console.log(chatObjectsRearranged)
        //before returning the object, I need to add the image field
        // const chatObjectsWithImages = await userController.addImagesToChatObjects(chatObjectsRearranged)
        res.status(200).json({
            data: chatObjectsRearranged
        })
    } catch (error) {
        res.status(500).json({
            message: 'Unable to retrive data'
        })
    }
})


chatRouter.post('/', async (req, res) => {
    try {
        const newChat = await chatController.createChat(req.body.name);
        res.status(200).json({
            message: 'Chat created succesfully.',
            newChat
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
        const chatId = req.body.chatId;
        const chatObj = await chatController.getChatById(chatId);
        let feedbackMessage;
        if (chatObj.name !== "") {
            feedbackMessage = 'The selected user is already a member of group chat.'
        }
        else {
            feedbackMessage = 'You already have an active chat with the selected user.'
        }
        if (error.code=='P2002') {
            res.status(403).json({
                message: feedbackMessage
            })
        }
        else {
            res.status(500).json({
            message: 'Internal server error'
        })
        }

    }
})

chatRouter.patch('/rename', async (req, res) => {
    try {
        await chatController.renameChat(req.body.id, req.body.name);
        res.status(200).json({
            message: 'Chat renamed successfully.'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error.'
        })
    }
})




module.exports = chatRouter;