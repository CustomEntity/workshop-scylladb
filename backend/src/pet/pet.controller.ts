import {Controller, Get, Param} from '@nestjs/common';
import { PetService } from './pet.service';

@Controller("pet")
export class PetController {
  constructor(private readonly appService: PetService) {}

  @Get(':id/sensors')
  getSensors(@Param('id') id): Promise<Sensor[]> {
    return this.appService.getSensors(id);
  }
}
