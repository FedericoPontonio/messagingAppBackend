const express = require('express');
const { message } = require('../prisma.config');
const messagesRouter = express.Router()
const messagesController = require('../controllers/messagesController');

//get all messages per chat
messagesRouter.get('/', async (req, res) => {
    try {
        const messagesByChat = await messagesController.getMessagesByChatId(req.body.chatId);
        res.status(200).json({
            message:'Messages retrieved successfully.',
            data: messagesByChat
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error.'
        })
    }
})

messagesRouter.post('/', async (req, res) => {
    try {
        await messagesController.createMessage(req.body.userId, req.body.chatId, req.body.value)
        res.status(200).json({
            message: 'Message created successfully.'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error.'
        })
    }
})

messagesRouter.delete('/', async (req, res) => {
    try {
        await messagesController.deleteMessage(req.body.messageId);
        res.status(200).json({
            message: 'Message deleted successfully.'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error.'
        })
    }
})




module.exports = messagesRouter;