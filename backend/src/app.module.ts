import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {OwnerModule} from "./owner/owner.module";
import {PetModule} from "./pet/pet.module";
import {SensorModule} from "./sensor/sensor.module";
import {ScyllaService} from "./scylla/scylla.service";
import {ScyllaModule} from "./scylla/scylla.module";

@Module({
  imports: [
    OwnerModule, PetModule, SensorModule, ScyllaModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: []
})
export class AppModule {
}
