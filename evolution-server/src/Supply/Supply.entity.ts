import { Requirement } from 'src/Requirement/Requirement.entity';

export class Supply {
  name: string;
  value: number;
  requirements: Requirement[];
}
