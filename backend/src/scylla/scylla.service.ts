import {Injectable, OnModuleInit} from '@nestjs/common';
import {Client} from 'cassandra-driver'
import {raw} from "express";

export const KEYSPACE = 'carepet';

@Injectable()
export class ScyllaService implements OnModuleInit{

  readonly client: Client;

  constructor() {
    this.client = new Client({
      contactPoints: ['localhost'],
      keyspace: KEYSPACE,
      localDataCenter: 'datacenter1',
    });
  }

  async onModuleInit(): Promise<any> {
    await this.client.connect();
  }

  getClient() : Client {
    return this.client;
  }

}
