interface Sensor {
  petId: string;
  sensorId: string;
}

interface Measurement {
  sensorId: string;
  timestamp: string;
  value: number;
}
