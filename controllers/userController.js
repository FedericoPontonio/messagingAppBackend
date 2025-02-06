const prisma = require('../prisma.config')
const bcrypt = require('bcryptjs')


async function getUserByUsername(reqObj) {
    return await prisma.user.findUnique({
        where: {
            username: reqObj.body.username
        }
    });
}

async function createUser(req) {
    await prisma.user.create({
        data: {
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, 10)
        }
    })
}

async function deleteUser(reqObj) {
    await prisma.user.delete({
        where: {
            username: reqObj.body.username
        }
    })
}

module.exports = {
    getUserByUsername,
    deleteUser,
    createUser
}