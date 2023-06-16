const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routers/userRoutes");

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
const User = require("./models/user");
const port = process.env.PORT || 3000;

const dbURI = "mongodb://localhost:27017/magic-app-db";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected successfully to the data base :D ");
    app.listen(port, () => {
      console.log(`Listening on port ${port} Happy Coding :D`);
    });
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
