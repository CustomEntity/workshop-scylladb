import {Controller, Get, Param} from '@nestjs/common';
import { SensorService } from './sensor.service';

@Controller("sensor")
export class SensorController {
  constructor(private readonly appService: SensorService) {}

  @Get(":id/measurement")
  async getMeasurement(@Param("id") id: string) {
    return this.appService.getMeasurement(id);
  }
}
