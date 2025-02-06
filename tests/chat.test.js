const index = require("../routes/index");
const chatController = require('../controllers/chatController')

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", index);

test("get request for chat route", done => {
    request(app)
      .get("/chat")
      .expect("Content-Type", /json/)
      .expect({message: "hello"})
      .expect(200, done);
  });

test("create new chat", async () => {
    const chatObj = await chatController.getChatByName('chat._.used._.for-:-test,-,purpose')

    //delete test chat
    await request(app)
        .delete("/chat")
        .type('form')
        .send({id: chatObj.id})
        .expect("Content-Type", /json/)
        .expect({message: "Chat deleted successfully."})
        .expect(200);
    //creare test chat
    await request(app)
        .post("/chat")
        .type('form')
        .send({name:'chat._.used._.for-:-test,-,purpose'})
        .expect("Content-Type", /json/)
        .expect({message: "Chat created succesfully."})
        .expect(200) 
});

// test("delete chat", done => {
//     request(app)
//     .delete("/chat")
//     .type('form')
//     .send({name:'chat._.used._.for-:-test,-,purpose'})
//     .expect("Content-Type", /json/)
//     .expect({message: "Chat deleted succesfully."})
//     .expect(200, done);
// });
