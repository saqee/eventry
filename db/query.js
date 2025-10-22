import mongoose from "mongoose"
import Event from "../models/event-models"
import { userModel } from "../models/user-model"
import { replaceMongoIdInArray, replaceWithObj } from "../utils/data-util"

export async function getAllEvents() {
  const allEvents = await Event.find().lean()

  return replaceMongoIdInArray(allEvents)
}

export async function getSingleEvent(eventId) {
  console.log(eventId)

  const event = await Event.findById(eventId).lean()
  return replaceWithObj(event)
}

export async function createUser(user) {
  return await userModel.create(user)
}

export async function login(user) {
  const isUser = await userModel.findOne(user).lean()
  return replaceWithObj(isUser)
}

export async function updateInterest(eventId, authId) {
  const event = await Event.findById(eventId)
  if (event) {
    const foundUsers = event.interested_ids.find(
      (id) => id.toString() === authId
    )
    if (foundUsers) {
      event.interested_ids.pull(new mongoose.Types.ObjectId(authId))
    } else {
      event.interested_ids.push(new mongoose.Types.ObjectId(authId))
    }
    event.save()
  }
}

export async function updateGoing(eventId, authId) {
  const event = await Event.findById(eventId)

  if (!event) {
    console.warn(`Event not found with id: ${eventId}`)
    return null // or throw an error
  }

  // Ensure ObjectId is correct
  const objId = new mongoose.Types.ObjectId(authId)

  // Avoid duplicates
  if (!event.going_ids.some((id) => id.equals(objId))) {
    event.going_ids.push(objId)
    await event.save()
  }

  return event
}
