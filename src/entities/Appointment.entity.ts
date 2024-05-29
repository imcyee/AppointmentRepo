import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { parseTime } from "./datetime.parser";
import { adminConfiguration } from "../admin.config";
import { ErrorMessage } from "../errors/error";



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
    if (!isWithinOperationHour)
      throw new Error(ErrorMessage.outOfOperationHour)

    this.slot = slot;
    this.time = time;
    this.date = date;
  }

  checkWithinOperationHour(time, slot) {
    const timeInDayjs = parseTime(time)
    console.log('start');
    console.log(timeInDayjs);
    console.log(Appointment.operationStartHour);
    console.log(Appointment.operationEndHour);

    const isTimeWithinOperationHour =
      timeInDayjs
        .isAfter(Appointment.operationStartHour)
      && timeInDayjs
        .add(slot * adminConfiguration.slotDuration, 'minutes')
        .isBefore(Appointment.operationEndHour)


    console.log(isTimeWithinOperationHour);
    return isTimeWithinOperationHour
  }

  checkForWeekend(date) {

  }

}


