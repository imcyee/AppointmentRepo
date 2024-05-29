import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Appointment } from './entities/Appointment.entity';
import { Appointments } from './entities/Appointments.virtualEntity';
import { ErrorMessage } from './errors/error';



@Injectable()
export class AppService {

  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: EntityRepository<Appointment>,
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async createAppointment({
    time,
    date,
    slot
  }) {
    const newAppointment = new Appointment({
      time,
      date,
      slot
    })

    const isClashed = await this.checkForClash(newAppointment)
    if (isClashed)
      throw new Error(ErrorMessage.clashConflicted)

    const insertedID = await this.appointmentRepository.insert(newAppointment)
    return insertedID
  }

  /**
   * return all active appointments
   * @returns 
   */
  async getAllAppointments() {
    // get all appointments on the date
    const appointments = await this.appointmentRepository.findAll()
    return appointments
  }

  async getAppointmentsByDate(date) {
    // get all appointments on the date
    const appointments = await this.appointmentRepository.find({
      date
    })
    const appointmentsDomain = new Appointments(appointments)



    // const appointments = await this.appointmentRepository.find({ date: '...' }, {
    //   // populate: ['author'],
    //   limit: 1,
    //   offset: 2,
    //   orderBy: { title: QueryOrder.DESC },
    // });

  }

  // get all appointments on the date
  async checkForClash(date): Promise<boolean> {
    const appointments = await this.appointmentRepository.find({ date })
    const appointmentsDomain = new Appointments(appointments)
    const isClashed = appointmentsDomain.checkForClash(date)
    return isClashed
  }

  async cancelAppointment(id: number) {
    const found = await this.appointmentRepository.findOne(id)
    if (found) {
      await this.appointmentRepository.nativeDelete(found)
    } else
      throw new Error(ErrorMessage.notFound)
    return
  }

}
