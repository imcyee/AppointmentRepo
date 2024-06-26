import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';


// this is more like an entity specs
describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getAppointments', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get(AppController);
      expect(appController.getAppointments()).toBe('Hello World!');
    });
  });
});