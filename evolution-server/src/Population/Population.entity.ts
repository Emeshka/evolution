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
        individual.execute();
      }
    }
  }

  consume(basicSupply: Supply, supplies: Supply[]) {
    const individualIndexesToRemove = [];
    for (let i = 0; i < this.individuals.length; i++) {
      const individual = this.individuals[i];
      let isIndividualFed = false;
      // An organism will prioritize advanced supplies if it can reach any
      // TODO: take in account that one organism can feed on multiple supplies at one step
      for (const supply of supplies) {
        if (isIndividualFed) break;
        const isAdapted = individual.isAdapted(supply.requirements);
        if (isAdapted && supply.value - individual.consumption >= 0) {
          supply.value -= individual.consumption;
          isIndividualFed = true;
        }
      }

      // If no advanced supply is accessible, it will take energy from basicSupply
      if (!isIndividualFed) {
        if (basicSupply.value - individual.consumption >= 0) {
          basicSupply.value -= individual.consumption;
          isIndividualFed = true;
        } else {
          // If basic supply ran out, organism dies with no heirs
          individualIndexesToRemove.push(i);
        }
      }
    }

    for (const index of individualIndexesToRemove) {
      // update quantity of allels in gene pool
      this.individuals.splice(index);
    }
  }
}
