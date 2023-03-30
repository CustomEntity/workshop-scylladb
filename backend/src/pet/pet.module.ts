import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import {ScyllaModule} from "../scylla/scylla.module";

@Module({
  imports: [ScyllaModule],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
