const userController = require('../controllers/userController')
const prisma = require('../prisma.config')


async function validateSignIn (req, res, next) {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    //check if password and confirm password match
    if (password !== confirmPassword) {
        res.status(400).json({
            message: "Your password entries don't match."
        })
    }
    //check if user already exists
    try {
        const user = await userController.getUserByUsername(req.body.username);
        if (user) {
            return res.status(400).json({
                message: 'User already exists!'
            })
        }
    } catch (error) {
        next(error)
    }

    console.log(req.body)
    next()
}

module.exports = validateSignIn