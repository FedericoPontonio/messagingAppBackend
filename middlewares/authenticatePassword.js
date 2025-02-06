const bcrypt = require('bcryptjs')
const userController = require('../controllers/userController')

async function authenticatePassword(req, res, next) {
    try {
        const user = await userController.getUserByUsername(req)
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            next()
        } else {
            res.status(401).json({
                message: 'Username and password mismatch'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}


module.exports = authenticatePassword