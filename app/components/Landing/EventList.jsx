import { getAllEvents } from "../../../db/query"
import EventCard from "./EventCard"
const EventList = async () => {
  const allevents = await getAllEvents()

  return (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {allevents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}

export default EventList
