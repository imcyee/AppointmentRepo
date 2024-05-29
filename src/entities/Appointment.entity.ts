import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { adminConfiguration } from "../admin.config";
import { ErrorMessage } from "../errors/error";
import { parseDate, parseTime } from "./datetime.parser";



/**
 * This is also an domain entities,
 * hence domain logic is encapsulated inside 
 */
@Entity({ tableName: 'appointment' })
export class Appointment {

  // no need reinstantiate everytime
  static operationStartHour = parseTime(adminConfiguration.operationHours.start)
  static operationEndHour = parseTime(adminConfiguration.operationHours.end)


  @PrimaryKey()
  id: number;

  @Property()
  slot: number;

  @Property()
  time: string;

  @Property()
  date: string;



  constructor({ slot, time, date }) {
    // basic checking 
    if (!slot || !time || !date)
      throw new Error('Missing parameters for appointment')

    // sanitize new appointment
    // with joi

    // check and compare with any booked time 
    const isWithinOperationHour = this.checkWithinOperationHour(time, slot)
    if (slot > adminConfiguration.maximumSlotPerAppointment)
      throw new Error(ErrorMessage.maximumSlotReached)


    if (!isWithinOperationHour)
      throw new Error(ErrorMessage.outOfOperationHour)

    const isInWeekend = this.checkFallInWeekend(date)
    if (isInWeekend)
      throw new Error(ErrorMessage.outOfWeekday)

    this.slot = slot;
    this.time = time;
    this.date = date;
  }

  checkWithinOperationHour(time, slot) {
    const timeInDayjs = parseTime(time)

    const isTimeWithinOperationHour =
      timeInDayjs
        .isAfter(Appointment.operationStartHour)
      && timeInDayjs
        .add(slot * adminConfiguration.slotDuration, 'minutes')
        .isBefore(Appointment.operationEndHour)


    return isTimeWithinOperationHour
  }

  checkFallInWeekend(date) {
    const parsedDate = parseDate(date)
    // check for weekend
    const day = parsedDate.day()


    // ops in rest day of the week
    if (adminConfiguration.restDayInAWeek.includes(day))
      return true
    // if (day === adminConfiguration.restDayInAWeek[0] || day === adminConfiguration.restDayInAWeek[1])
    return false
  }

}


