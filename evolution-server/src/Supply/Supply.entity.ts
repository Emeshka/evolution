import { Requirement } from 'src/Requirement/Requirement.entity';

export class Supply {
  name: string;
  value: number;
  capacity: number;
  requirements: Requirement[];

  restore() {
    this.value = this.capacity;
  }

  constructor(name: string, capacity: number, requirements: Requirement[]) {
    this.name = name;
    this.capacity = capacity;
    this.value = capacity;
    this.requirements = requirements;
  }
}
