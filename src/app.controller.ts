import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AppointmentObj, convertEntitiesToObjects } from './entities/Appointment.mapper';
import { ErrorMessage } from './errors/error';
import { AppointmentDto } from './interface/Appointment.dto';
import { DeleteAppointmentDTO } from './interface/DeleteAppointment.dto';

// TODO: add auth header for now we dont check
// eg: dangerousNotImplementedAuth

/**
 * Slot duration is 30mins
 * 
 * 
 * 
 * Basic Level Configuration:
 * Allow configuration of the appointment slot duration (minimum 5 minutes).
 * Enable setting the maximum number of slots per appointment (1 to 5 slots).
 * Configure operational hours and days for scheduling appointments.
 * 
 */
@Controller("appointment")
export class AppController {
  constructor(private readonly appService: AppService) { }

  /**
   * Appointment Creation 
   * @param 
   * date 
   * time 
   * available_slots
   * 
   * @description
   * can create slot of 1 to 5
   * 9 AM to 6 PM on weekdays
   * no double booking
   * 
   * @returns created ID
   */
  @HttpCode(201)
  @Post()
  async createAppointment(
    @Body() appointmentDTO: AppointmentDto
  ): Promise<number> {
    try {
      // add joi sanitize
      return this.appService.createAppointment(appointmentDTO);
    } catch (e) {
      if (e.message == ErrorMessage.clashConflicted)
        throw new HttpException('Conflicted', HttpStatus.CONFLICT);
      else
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
  }

  /**
  * Appointment Viewing 
  * 
  * @description
  * maximum slot is 1
  * 
  * @param 
  * @returns 
  */
  @Get() 
  @HttpCode(200)
  async getAppointments(): Promise<AppointmentObj[]> {
    const appointments = await this.appService.getAllAppointments();
    return convertEntitiesToObjects(appointments)
  }




  /**
  * Appointment Cancellation 
  * @param id
  * @returns 
  */
  @Delete()
  // @UseGuards(AuthGuard)
  @HttpCode(200)
  async cancelAppointments(
    @Body() deleteAppointmentDTO: DeleteAppointmentDTO
  ): Promise<void> {
    try {
      if (!deleteAppointmentDTO.id)
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
      return await this.appService.cancelAppointment(deleteAppointmentDTO.id)
    } catch (error) {
      if (error.message == ErrorMessage.notFound) {
        throw new HttpException("Appointment Not found", HttpStatus.NOT_FOUND)
      } else {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
      }
    }


  }
}
