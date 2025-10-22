"use client"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { addInterestedEvent } from "../actions"
import { useAuth } from "../hooks/useAuth"

const ActionButton = ({
  eventId,
  interestedUserIds,
  goingUserIds,
  formDetails,
}) => {
  const { auth } = useAuth()
  const isInterested = interestedUserIds.find((id) => id === auth?.id)
  const isGoing = goingUserIds.find((id) => id === auth?.id)
  const [interested, setIsInterested] = useState(isInterested)
  const [going, setIsGoing] = useState(isGoing)
  const [isPending, startTransation] = useTransition()
  const router = useRouter()
  async function toggleInterest() {
    if (auth) {
      await addInterestedEvent(eventId, auth?.id)
      setIsInterested(!interested)
    } else {
      router.push("/login")
    }
  }
  const markGoing = () => {
    if (auth) {
      router.push(`/payment/${eventId}`)
    } else {
      router.push("/login")
    }
  }

  if (isPending) {
    return <div>loading....</div>
  }
  return (
    <div className={`w-full flex gap-4 mt-4 ${formDetails && "flex-1"}`}>
      <button
        className={`w-full ${
          interested && "bg-indigo-600 hover:bg-indigo-800"
        }`}
        onClick={() =>
          startTransation(() => {
            toggleInterest()
          })
        }
      >
        Interested
      </button>
      <button
        disabled={auth && going}
        onClick={markGoing}
        className=" text-center w-full bg-[#464849] py-2 px-2 rounded-md border border-[#5F5F5F]/50 shadow-sm cursor-pointer hover:bg-[#3C3D3D] transition-colors active:translate-y-1"
      >
        Going
      </button>
    </div>
  )
}

export default ActionButton
