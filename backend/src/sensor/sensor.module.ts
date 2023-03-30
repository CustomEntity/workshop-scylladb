import { Module } from '@nestjs/common';
import { SensorController } from './sensor.controller';
import { SensorService } from './sensor.service';
import {ScyllaModule} from "../scylla/scylla.module";

@Module({
  imports: [ScyllaModule],
  controllers: [SensorController],
  providers: [SensorService],
})
export class SensorModule {}
