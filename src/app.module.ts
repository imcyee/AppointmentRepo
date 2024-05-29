import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mikroOptions } from './orm.config';
import { Appointment } from './entities/Appointment.entity';
 

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOptions),
    MikroOrmModule.forFeature({
      entities: [Appointment],
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
