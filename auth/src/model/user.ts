import mongoose from "mongoose";
import { Password } from "../services/password";

// an interface that describes the properties that are required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

//an interface that describes the properties that a user model has
interface UserModel extends mongoose.Model<UserDoc> {
  // describing our custom build method
  build(attrs: UserAttrs): UserDoc;
}

//an innterface that describes the properties a user document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

// custom function built into our model
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
