const prisma = require('../prisma.config')

async function createChat(name) {
    await prisma.chat.create({
        data: {
            name
        }
    })
}

async function getChatByName(name) {
    const chatObj = await prisma.chat.findFirst({
        where: {
            name: name
        }
    })
    return chatObj
}

async function deleteChat(id) {
    await prisma.chat.delete({
        where:{
            id: +id
        }
    })
}

async function addUser(chatId, userId) {
    await prisma.chatPartecipation.create({
        data: {
            chatId: chatId,
            userId: userId
        }
    })
}

module.exports = {
    createChat,
    getChatByName,
    deleteChat,
    addUser,
}