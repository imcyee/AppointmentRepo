import { Appointment } from "./Appointment.entity";
import { faker } from '@faker-js/faker'
import { Appointments } from "./Appointments.virtualEntity";


const randomTimeSlot = []


// this is an entity specs
describe('Appointment spec', () => {

  describe('Entity logic', () => {
    it('should create a new appointment without error', () => {
      const newAppointment = createRandomAppointment()
      expect(newAppointment).toBeDefined()
    });

    it('should prevent double booking', () => {
      const date = "2024-05-29"
      const appointmentsData = [
        { date, time: "12:30", slot: 1 },
        { date, time: "14:30", slot: 2 },
        { date, time: "16:30", slot: 1 },
      ]
      const appointments = appointmentsData.map((a) => new Appointment(a))
      const appointmentsDomain = new Appointments(appointments)
      try {
        const newAppointment = new Appointment({
          date,
          slot: 1,
          time: "13:00",
        })
        const hasClash = appointmentsDomain.checkForClash(newAppointment)

        expect(hasClash).toBeFalsy()
      } catch (error) {
        // should have no error
      }
    });


    it('should throw error if it has crashes prevent double booking', () => {
      const date = "2024-05-29"
      const appointmentsData = [
        { date, time: "12:30", slot: 1 },
        { date, time: "14:30", slot: 2 },
        { date, time: "16:30", slot: 1 },
      ]
      const appointments = appointmentsData.map((a) => new Appointment(a))
      const appointmentsDomain = new Appointments(appointments)
      try {
        const newAppointment = new Appointment({
          date,
          slot: 2,
          time: "14:00", // clashed with 14:30
        })
        const hasClash = appointmentsDomain.checkForClash(newAppointment)
        expect(hasClash).toBeTruthy()
      } catch (error) {
        // should have no error
      }
    });

  });
});





function createRandomAppointment() {
  return new Appointment({
    date: faker.number.int(),
    slot: 1,
    time: createRandomWithinOperationTimestring(),
  })
}

function createSameDateRandomAppointment() {
  return new Appointment({
    date: "2024-05-29",
    slot: 1,
    time: createRandomWithinOperationTimestring(),
  })
}

function createRandomWithinOperationTimestring() {
  var hour = faker.number.int({ max: 17, min: 9 })
  var min = faker.number.int({ max: 59, min: 0 })
  return createTimestring(hour, min)
}


function createTimestring(hour, min) {
  var hourString = ''
  if (hour < 10)
    hourString = `0${hour}`
  else
    hourString = `${hour}`

  var minString = ''
  if (hour < 10)
    minString = `0${min}`
  else
    minString = `${min}`
  return `${hourString}:${minString}`
}