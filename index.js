require("dotenv").config();
const app = require("./routes/index").app;
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
