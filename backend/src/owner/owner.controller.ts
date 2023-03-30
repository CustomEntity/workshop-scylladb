import {BadRequestException, Controller, Get, Param, Res, Response} from '@nestjs/common';
import {OwnerService} from './owner.service';
import {validate} from 'uuid';

@Controller('owner')
export class OwnerController {
  constructor(private readonly appService: OwnerService) {
  }

  @Get()
    async findAll(): Promise<Owner[]> {
    return this.appService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id): Promise<Owner> {
    if (!validate(id))
      throw new BadRequestException("Invalid ID format");
    return this.appService.findOne(id);
  }

  @Get(':id/pets')
  async findPets(@Param('id') id): Promise<Pet[]> {
    if (!validate(id))
      throw new BadRequestException("Invalid ID format");
    return this.appService.findPets(id);
  }
}
