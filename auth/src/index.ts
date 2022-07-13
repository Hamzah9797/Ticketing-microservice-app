// dependencies
import express from "express";
import { json } from "body-parser";

//app
const app = express();

//middlewares
app.use(json());

// routes
app.get("/api/users/currentuser", (req, res) => {
  res.send("hi there");
});

//server
app.listen(3000, () => {
  console.log("listening on port 3000 - !Auth service!");
});
