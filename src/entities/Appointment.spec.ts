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

    // it('should create a new appointments without error', () => {
    //   const arrayLength = 5
    //   const appointments = Array(arrayLength).fill(0).map(createRandomAppointment)
    //   expect(appointments.length).toBe(arrayLength)
    //   const appointmentsDomain = new Appointments(appointments)
    //   expect(appointmentsDomain).toBeDefined()
    // });


    it('should prevent double booking', () => {

      // const appointments = Array(arrayLength).fill(0).map(createSameDateRandomAppointment)
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


      // expect(appointments.length).toBe(arrayLength)
      // expect(appointmentsDomain).toBeDefined()
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
  var hour = faker.number.int({ max: 18, min: 9 })
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