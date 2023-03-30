import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {v4 as generateUUID} from 'uuid';
import {ScyllaService, KEYSPACE} from "../scylla/scylla.service";

@Injectable()
export class OwnerService {

  constructor(
      private readonly scyllaService: ScyllaService) {
  }

  async findOne(id: string): Promise<Owner> {
    const client = this.scyllaService.getClient();
    const result = await client.execute(`TODO`, [id], {prepare: true});

    if (result.rows.length === 0) {
      throw new NotFoundException(`Owner with id ${id} not found`)
    }
    return {
      ownerId: result.rows[0].id,
      name: result.rows[0].name,
      address: result.rows[0].address
    }
  }

  async findPets(id: string): Promise<Pet[]> {
    const client = this.scyllaService.getClient();
    const result = await client.execute(`TODO`, [id], {prepare: true});

    return result.rows.map((row) => ({
      ownerId: row.owner_id,
      petId: row.pet_id,
      chipId: row.chip_id,
      species: row.species,
      breed: row.breed,
      color: row.color,
      gender: row.gender,
      age: row.age,
      weight: row.weight,
      address: row.address,
      name: row.name,
    }));
  }

  async findAll(): Promise<Owner[]> {
    const client = this.scyllaService.getClient();
    const result = await client.execute(`TODO`);

    return result.rows.map((row) => ({
      ownerId: row.owner_id,
      name: row.name,
      address: row.address,
    }));
  }
}
