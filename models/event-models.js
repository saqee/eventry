import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  details: {
    type: String,
  },
  location: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  interested_ids: {
    required: false,
    type: Array,
  },
  going_ids: {
    required: false,
    type: Array,
  },
  swgs: {
    required: false,
    type: Array,
  },
})

const Event = mongoose.models.events || mongoose.model("events", eventSchema)

export default Event
