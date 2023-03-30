import { Module } from '@nestjs/common';
import {ScyllaService} from "./scylla.service";

@Module({
  imports: [],
  controllers: [],
  providers: [ScyllaService],
  exports: [ScyllaService]
})
export class ScyllaModule {}
