import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    googleTokenObj: {
      access_token: { type: String, required: true, unique: true },
      refresh_token: { type: String, required: true, unique: true },
      id_token: { type: String, required: true, unique: true },
      scope: { type: String, required: true, unique: true },
      token_type: { type: String, required: true, unique: true },
      expiry_date: { type: Number, required: true, unique: true },
    },
    sub: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: false, unique: false },
    given_name: { type: String, required: true, unique: false },
    family_name: { type: String, required: false, unique: true },
    picture: { type: String, required: false, unique: false },
    locale: { type: String, required: false, unique: false },
    user_exp: { type: Number, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
