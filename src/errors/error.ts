import { adminConfiguration } from "../admin.config";

export const ErrorMessage = {
  clashConflicted: "Appointment clashed, please try with another slot",
  notFound: "Appointment not found",
  outOfOperationHour: "Appointment slot is out of operation hour",
  outOfWeekday: "Appointment is out of working day",
  maximumSlotReached: "Maximum slot number reached:  " + adminConfiguration.maximumSlotPerAppointment
}