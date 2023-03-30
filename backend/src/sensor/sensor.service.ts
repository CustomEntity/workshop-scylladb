import { Injectable } from '@nestjs/common';
import { KEYSPACE, ScyllaService } from '../scylla/scylla.service';

@Injectable()
export class SensorService {
  constructor(private readonly scyllaService: ScyllaService) {}

  async getMeasurement(id: string): Promise<Measurement[]> {
    const client = this.scyllaService.getClient();
    const dateNow = new Date();
    const week = new Date(dateNow.getTime() - 1 * 24 * 60 * 60 * 1000);
    const result = await client.execute(`TODO`, [id, week], { prepare: true });
    return result.rows.map((row) => ({
      sensorId: row.sensor_id,
      timestamp: row.ts,
      value: row.value,
    }));
  }
}
