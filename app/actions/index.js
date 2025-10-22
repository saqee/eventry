"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
const {
  createUser,
  login,
  updateInterest,
  updateGoing,
} = require("../../db/query")

export async function handleRegister(formData) {
  const user = Object.fromEntries(formData)
  const created = await createUser(user)
  redirect("/login")
}

export async function formLogin(formData) {
  try {
    const credentials = {}
    credentials.email = formData.get("email")
    credentials.password = formData.get("password")
    const found = await login(credentials)
    return found
  } catch (error) {
    throw new Error("user with email id not found")
  }
}

export async function addInterestedEvent(eventId, authId) {
  try {
    await updateInterest(eventId, authId)
    revalidatePath("/")
  } catch (error) {
    throw error
  }
}

export async function addGoingEvent(eventId, user) {
  try {
    console.log("101 action", user)

    await updateGoing(eventId, user?.id)
    revalidatePath("/")
    redirect("/")
  } catch (error) {
    throw error
  }
}
