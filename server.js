const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");

app.use("/users", usersRoute);
app.use("/posts", postsRoute);

app.listen(port, () => {
  console.log(`app listening on http://localhost:3000`);
});
