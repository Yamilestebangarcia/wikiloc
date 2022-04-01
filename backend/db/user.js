import mongoose from "../db/connect.js";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: { type: String, unique: true, require: true },
    pass: { type: String, required: true },
    verified: { type: Boolean, required: true },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", UserSchema);
export default User;
