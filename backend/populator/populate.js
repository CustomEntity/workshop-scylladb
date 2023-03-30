var cassandra = require('cassandra-driver');
var async = require('async');
var v4 = require('uuid').v4;

const KEYSPACE = 'carepet';

const client = new cassandra.Client({
  contactPoints: ['localhost'], keyspace: KEYSPACE, localDataCenter: 'datacenter1',
});

async function populateOwners() {
  const owners = [{
    ownerId: 'db273974-b35e-4ad1-b9f1-4d0f8ad84bdb', address: '123 Main St', name: 'Jean'
  }, {
    ownerId: 'e0b3e1e1-0f9e-4b0f-9b0e-1e1e1e0f9e4b', address: '456 Main St', name: 'Bon'
  }, {
    ownerId: 'f1b3e1e1-0f9e-4b0f-9b0e-1e1e1e0f9e4b', address: '789 Main St', name: 'Beurre'
  }]

  for (const owner of owners) {
    const query = 'INSERT INTO owner (owner_id, address, name) VALUES (?, ?, ?)';
    const params = [owner.ownerId, owner.address, owner.name];
    await client.execute(query, params, {prepare: true});
  }
}

async function populatePets() {
  const pets = [{
    ownerId: 'db273974-b35e-4ad1-b9f1-4d0f8ad84bdb',
    petId: 'a0b3e1e1-0f9e-4b0f-9b0e-1e1e1e0f9e4b',
    chipId: '123456789',
    species: 'dog',
    breed: 'labrador',
    color: 'black',
    gender: 'Male',
    age: 3,
    weight: 20,
    address: '123 Main St',
    name: 'Rex'
  }, {
    ownerId: 'db273974-b35e-4ad1-b9f1-4d0f8ad84bdb',
    petId: 'b0b3e1e1-0f9e-4b0f-9b0e-1e1e1e0f9e4b',
    chipId: '123456789',
    species: 'dog',
    breed: 'labrador',
    color: 'black',
    gender: 'Female',
    age: 5,
    weight: 40,
    address: '123 Main St',
    name: 'Carla'
  }, {
    ownerId: 'e0b3e1e1-0f9e-4b0f-9b0e-1e1e1e0f9e4b',
    petId: 'c0b3e1e1-0f9e-4b0f-9b0e-1e1e1e0f9e4b',
    chipId: '123456789',
    species: 'dog',
    breed: 'carlin',
    color: 'red',
    gender: 'Female',
    age: 2,
    weight: 15,
    address: '456 Main St',
    name: 'Madeleine'
  }, {
    ownerId: 'f1b3e1e1-0f9e-4b0f-9b0e-1e1e1e0f9e4b',
    petId: 'd0b3e1e1-0f9e-4b0f-9b0e-1e1e1e0f9e4b',
    chipId: '123456789',
    species: 'dog',
    breed: 'lévrier',
    color: 'white',
    gender: 'Female',
    age: 1,
    weight: 10,
    address: '789 Main St',
    name: 'Bérénice'
  }];

  for (const pet of pets) {
    const query = 'INSERT INTO pet (owner_id, pet_id, chip_id, species, breed, color, gender, age, weight, address, name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const params = [pet.ownerId, pet.petId, pet.chipId, pet.species, pet.breed, pet.color, pet.gender, pet.age, pet.weight, pet.address, pet.name];
    await client.execute(query, params, {prepare: true});
  }
}

async function populateSensors() {
  const sensors = [{
    petId: 'a0b3e1e1-0f9e-4b0f-9b0e-1e1e1e0f9e4b', sensorId: 'a0b3e1e1-0f9e-4b0f-9b0e-1e1e1e0f9e4b'
  }, {
    petId: 'b0b3e1e1-0f9e-4b0f-9b0e-1e1e1e0f9e4b', sensorId: 'b0b3e1e1-0f9e-4b0f-9b0e-1e1e1e0f9e4b'
  }, {
    petId: 'c0b3e1e1-0f9e-4b0f-9b0e-1e1e1e0f9e4b', sensorId: 'c0b3e1e1-0f9e-4b0f-9b0e-1e1e1e0f9e4b'
  }, {
    petId: 'd0b3e1e1-0f9e-4b0f-9b0e-1e1e1e0f9e4b', sensorId: 'd0b3e1e1-0f9e-4b0f-9b0e-1e1e1e0f9e4b'
  }];

  for (const sensor of sensors) {
    const query = 'INSERT INTO sensor (pet_id, sensor_id) VALUES (?, ?)';
    const params = [sensor.petId, sensor.sensorId];
    await client.execute(query, params, {prepare: true});
  }
}

async function populateMeasurements() {
  const sensors = [{
    petId: 'a0b3e1e1-0f9e-4b0f-9b0e-1e1e1e0f9e4b', sensorId: 'a0b3e1e1-0f9e-4b0f-9b0e-1e1e1e0f9e4b'
  }, {
    petId: 'b0b3e1e1-0f9e-4b0f-9b0e-1e1e1e0f9e4b', sensorId: 'b0b3e1e1-0f9e-4b0f-9b0e-1e1e1e0f9e4b'
  }, {
    petId: 'c0b3e1e1-0f9e-4b0f-9b0e-1e1e1e0f9e4b', sensorId: 'c0b3e1e1-0f9e-4b0f-9b0e-1e1e1e0f9e4b'
  }, {
    petId: 'd0b3e1e1-0f9e-4b0f-9b0e-1e1e1e0f9e4b', sensorId: 'd0b3e1e1-0f9e-4b0f-9b0e-1e1e1e0f9e4b'
  }];

  const now = new Date();
  for (const sensor of sensors) {
    let date = new Date(2023, now.getMonth(), now.getDate() - 2);
    for (let i = 0; i < 570; i++) {
      const query = 'INSERT INTO measurement (sensor_id, ts, value) VALUES (?, ?, ?)';
      const params = [sensor.sensorId, date, 100 + Math.random() * 100];
      await client.execute(query, params, {prepare: true});
      date = new Date(date.getTime() + (1000 * 60 * 5));
    }
  }
}

async function populate() {
  console.log("Populating database...");
  await populateOwners();
  await populatePets();
  await populateSensors();
  await populateMeasurements();
  process.exit(0);
}

async function connect() {
  console.log('Connecting to Scylla cluster');
  await client.connect();
}

connect().then(populate).catch(err => console.error(err));

