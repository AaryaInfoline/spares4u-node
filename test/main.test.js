const { sequelize } = require("../config/db.config");

afterAll(done => {
    console.log('done');
    done();
});
test("Database Connection test", async () => {
    await sequelize.authenticate();
});