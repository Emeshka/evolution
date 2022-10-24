import { Individual } from 'src/Individual/Individual.entity';

export class Population {
  individuals: Individual[];

  constructor(initialGenePool?, individualCount?) {
    this.individuals = [];
    if (initialGenePool && individualCount) {
      for (let i = 0; i < individualCount; i++) {
        const individual = new Individual(initialGenePool);
        this.individuals.push(individual);
        individual.execute();
      }
    }
  }
}
