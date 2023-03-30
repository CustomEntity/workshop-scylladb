import {Injectable} from '@nestjs/common';
import {KEYSPACE, ScyllaService} from "../scylla/scylla.service";

@Injectable()
export class PetService {

  constructor(
      private readonly scyllaService: ScyllaService) {
  }

  async getSensors(id: string): Promise<Sensor[]> {
    const client = this.scyllaService.getClient();
    const result = await client.execute(`TODO`, [id], {prepare: true});

    return result.rows.map((row) => ({
      petId: row.pet_id,
      sensorId: row.sensor_id,
    }));
  }
}
