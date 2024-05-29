import { adminConfiguration } from "../admin.config";
import { Appointment } from "./Appointment.entity";
import { parseTime } from "./datetime.parser";

/**
 * Virtual entity is like an adapter that contain domain logic
 * which doesnt persist to the db instead
 */
export class Appointments {
  appointments: Appointment[]
  constructor(appointments) {
    this.appointments = appointments
  }


  // this should be all same day
  // prevent double book
  checkForClash(newAppointment: Appointment): boolean {
    const filteredDate = newAppointment.date
    // check for any clashes for the date
    const filteredLength = this.appointments.filter((a) => a.date = filteredDate).length
    if (filteredLength != this.appointments.length)
      throw Error("Internal Program Error: Appointments date list should be same date as the new Appointment")

    const intendedBlockedSlot = {
      start: parseTime(newAppointment.date),
      end: parseTime(newAppointment.date).add(newAppointment.slot * adminConfiguration.slotDuration, 'minutes')
    }

    // check and compare with any booked time 
    const comparedAppointment = this.appointments.filter((a) => {
      return parseTime(a.time)
        .isAfter(intendedBlockedSlot.start)
        && parseTime(a.time)
          .isBefore(intendedBlockedSlot.end)
    })
    if (comparedAppointment.length > 0) // clashes exist
      return false

    return true // no clash
  }
}
