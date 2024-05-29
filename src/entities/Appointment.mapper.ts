import { Appointment } from "./Appointment.entity";

export interface AppointmentObj {
  date: string
  time: string
  slot
}

// mapper to prevent data leak 
export const convertEntityToObject = (appointment: Appointment) => {
  return {
    date: appointment.date,
    time: appointment.time,
    slot: appointment.slot // TODO change to available slot instead
  }
}

export const convertEntitiesToObjects = (appointments: Appointment[]) => {
  return appointments.map((a) => convertEntityToObject(a))
}