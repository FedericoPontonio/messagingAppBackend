const prisma = require('../prisma.config')

async function createMessage(userId, chatId, value) {
    await prisma.message.create({
        data: {
            authorId: userId,
            chatId: chatId,
            value: value
        }
    })
}

async function deleteMessage(messageId) {
    await prisma.message.delete({
        where:{
            id:messageId
        }
    })
}

async function getMessagesByChatId(chatId) {
    return await prisma.message.findMany({
        where: {
            chatId: chatId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}



module.exports = {
    createMessage,
    deleteMessage,
    getMessagesByChatId
}