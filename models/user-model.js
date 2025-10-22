import mongoose, { Schema } from "mongoose"

const schema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
  },
  bio: {
    type: String,
  },
})

export const userModel =
  mongoose.models.users || mongoose.model("users", schema)
