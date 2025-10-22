import { getSingleEvent } from "../../../db/query"
import EventDetails from "../../components/details/EventDetails"
import Hero from "../../components/details/Hero"

const Page = async ({ params: { id } }) => {
  const eventInfo = await getSingleEvent(id)
  return (
    <>
      <Hero eventInfo={eventInfo} />
      <EventDetails eventInfo={eventInfo} />
    </>
  )
}

export default Page
