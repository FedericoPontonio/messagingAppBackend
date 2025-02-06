const index = require("../routes/index");

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", index);

test("index route works", done => {
    request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect({message: "Successfully loaded index route"})
      .expect(200, done);
  });


  test('delete user', done =>  {
    request(app)
      .delete("/users")
      .type('form')
      .send({username:'userTest'})
      .expect("Content-Type", /json/)
      .expect(res => {
        expect(res.body.message).toBe("Successfully deleted user")
        }
      )
      .expect(200, done);
  })

  test('create user', done =>  {
  request(app)
    .post("/users")
    .type('form')
    .send({username:'userTest',password:'passwordTest'})
    .expect("Content-Type", /json/)
    .expect(res => {
      expect(res.body.message).toBe("Successfully created user")
      }
    )
    .expect(200, done);
})

test('unauthorized user', done =>  {
  request(app)
    .get("/users")
    .type('form')
    //ANY password other than "passwordTest" is a mismatch therefore fails this test
    .send({username:'userTest',password:'wrongPassword4Test'})
    .expect("Content-Type", /json/)
    .expect(res => {
      expect(res.body.message).toBe("Username and password mismatch")
      }
    )
    .expect(401, done);
})

//get token
test('validate token', done => {
  let token;
  request(app)
    .get("/users")
    .type('form')
    .send({username:'userTest', password:'passwordTest'})
    .expect("Content-Type", /json/)
    .expect(res => {
      expect(res.body.message).toBe("Successful userTest's login")
      token = res.body.token;
    })
    //use token
    .end((err, res) => {
      if (err) return done(err);
      request(app)
        .get("/users/authorization")
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        
        //test expiration - I would have to modify the value in token creation
        // .end((err, res) => {
        //   if (err) return done(err);
        //   setTimeout(() => {
        //     request(app)
        //       .get("/users/authorization")
        //       .set("Authorization", `Bearer ${token}`)
        //       .expect(403)
        //       .end(done);
        //   }, 1000);
        // });
        .end(done);
    });
});


test('create existing user', done =>  {
  request(app)
    .post("/users")
    .type('form')
    .send({username:'userTest',password:'passwordTest'})
    .expect("Content-Type", /json/)
    .expect(res => {
      expect(res.body.message).toBe("User already exists")
      }
    )
    .expect(400, done);
})

