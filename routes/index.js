const express = require('express')
const router = express.Router()
const usersRouter = require('./users')
const chatRouter = require('./chat')
const messagesRouter = require('./messages')

router.get('/', async (req, res) => {
    res.json({
        message: "Successfully loaded index route"
    })
});

router.use('/users', usersRouter)
router.use('/chat', chatRouter)
router.use('/messages', messagesRouter)

module.exports = router;