// dependencies
import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

//app
const app = express();

//middlewares
app.use(json());

// routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// if user tries to acccess a route we havent implemented
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// custome middlewares
app.use(errorHandler);

const start = async () => {
  try {
    // create a database automatically
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("connected to mongo db");
  } catch (err) {
    console.log(err);
  }
  //server
  app.listen(3000, () => {
    console.log("listening on port 3000 - !Auth service!");
  });
};

start();
