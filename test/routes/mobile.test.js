const app = require('../../routes/index').app;
const supertest = require("supertest");

test("GET /mobile/user/create", async () => {
   // const post = await Post.create({ title: "Post 1", content: "Lorem ipsum" });
    await supertest(app).post("/api/user/create").set('Authorization', 'Bearer test').send({ title: "Post 1", content: "Lorem ipsum" })
        .expect(200)
        .then((response) => {
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toEqual(1);
        }).catch((err)=>{
            console.log(err);
        })
});
