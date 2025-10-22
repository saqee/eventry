import mongoose from "mongoose"

export async function dbConnect() {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL)
    console.log("connect")

    return connect
  } catch (error) {
    console.log(error)
  }
}
