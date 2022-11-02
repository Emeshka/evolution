import { Individual } from 'src/Individual/Individual.entity';
import { Supply } from 'src/Supply/Supply.entity';

export class Population {
  individuals: Individual[];

  constructor(initialGenePool?, individualCount?) {
    this.individuals = [];
    if (initialGenePool && individualCount) {
      for (let i = 0; i < individualCount; i++) {
        const individual = new Individual(initialGenePool);
        this.individuals.push(individual);
        individual.makePhenotype();
      }
    }
  }

  feed(basicSupply: Supply, advancedSupplies: Supply[]) {
    const individualIndexesToRemove = [];
    for (let i = 0; i < this.individuals.length; i++) {
      const individual = this.individuals[i];
      const isFed = individual.feed(basicSupply, advancedSupplies);
      if (!isFed) {
        // TODO: if feed returns false (there wasn't enough food), it returns
        // all of actually consumed energy to basic supply, no matter where it has taken it
        individualIndexesToRemove.push(i);
      }
    }

    for (const index of individualIndexesToRemove) {
      // update quantity of allels in gene pool
      this.individuals.splice(index);
    }
  }
}
