import { Module } from '@nestjs/common';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';
import {AppModule} from "../app.module";
import {ScyllaModule} from "../scylla/scylla.module";

@Module({
  imports: [ScyllaModule],
  controllers: [OwnerController],
  providers: [OwnerService],
})
export class OwnerModule {}
