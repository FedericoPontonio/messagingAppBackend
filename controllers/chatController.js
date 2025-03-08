const prisma = require('../prisma.config')

async function createChat(name) {
    return await prisma.chat.create({
        data: {
            name,
            isGroupChat: name !== ''
        }
    })
}
//get the ids of the chat in which a user partecipate
async function getChatIdsByUserId(userId) {
    const result = await prisma.chatPartecipation.findMany({
        where:{
            userId: +userId
        },
        select: {
            chatId: true
        }
    })
    return result.map(chat => chat.chatId)

}

async function getChatById(id) {
    return await prisma.chat.findUnique({
        where:{
            id: id
        }
    })
}

async function getChatObjectsByChatIds(idsArray) {
    return await prisma.chat.findMany({
            where: {
                id: {
                    in: idsArray
                }
            }
        })
}
    
async function enstablishChatName(chatObj, userId) {
// //check if the chat has not a name (private chat)
    if (chatObj.name === '') {
        //search for this chat partecipants
        const chatPartecipants = await prisma.chatPartecipation.findMany({
                where:{
                    chatId: chatObj.id
                },
                select:{
                    userId: true
                }
            })
        // this is the pair of ids of the partecipants of a private chat
        const partecipantsIds = chatPartecipants.map(user=>user.userId)
        //take the id of the ulterior partecipant
        let ulteriorChatPartecipantId;
        partecipantsIds.forEach(id=> {
            if (id != userId) {
                ulteriorChatPartecipantId = id
            }
        })
        const ulteriorPartecipantName = await prisma.user.findUnique({
            where:{
                id:ulteriorChatPartecipantId
            }
        })
        return ulteriorPartecipantName.username
    }
    else {
        return chatObj.name
    }
}

async function chatObjectsRearranged(chatObjects, userId) {
    let result = [];

    for (let i = 0; i<chatObjects.length; i++) {
        result.push({
            'chatId': chatObjects[i].id,
            //I need to use either promiseall as codium suggests or finding all names before the foeach loop
            'chatName': await enstablishChatName(chatObjects[i], userId),
            'messages':[],
            'image': chatObjects[i].image,
            'isGChat': chatObjects[i].name !== ''
        })
    }
    return result
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
    getChatIdsByUserId,
    getChatObjectsByChatIds,
    enstablishChatName,
    chatObjectsRearranged,
    getChatById
}