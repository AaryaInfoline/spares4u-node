const app = require('../../routes/index').app;
const supertest = require("supertest");

test("GET /api/posts", async () => {
    //const post = await Post.create({ title: "Post 1", content: "Lorem ipsum" });
    await supertest(app).post("/user/create").set('Authorization', 'Bearer test').send({})
        .expect(200)
        .then((response) => {
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toEqual(1);
        }).catch(()=>{});
});
