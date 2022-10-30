import { Requirement } from 'src/Requirement/Requirement.entity';

export class Supply {
  name: string;
  value: number;
  capacity: number;
  requirements: Requirement[];

  restore() {
    this.value = this.capacity;
  }
}
