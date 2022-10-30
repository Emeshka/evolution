import { OutputProperty } from 'src/OutputProperty/OutputProperty.types';
import { Population } from 'src/Population/Population.entity';
import { Requirement } from 'src/Requirement/Requirement.entity';
import { ComparativeSign } from 'src/Signs.enum';
import { Supply } from 'src/Supply/Supply.entity';

export class MapCell {
  i: number;
  j: number;
  basicSupply: Supply;
  advancedSupplies: Supply[];
  population: Population;

  constructor(i, j, basicSupplyValue, initialGenePool) {
    this.i = i;
    this.j = j;
    this.basicSupply = {
      name: 'basicSupply',
      value: basicSupplyValue,
      capacity: basicSupplyValue,
      requirements: [],
    };

    this.advancedSupplies = [];
    this.advancedSupplies[0] = {
      name: 'Advanced supply 1',
      value: 5000,
      capacity: 5000,
      requirements: [
        new Requirement(50, OutputProperty.width, ComparativeSign.G),
      ],
    };

    if (i == 1 && j == 1) {
      this.population = new Population(initialGenePool, 5);
    } else {
      this.population = new Population();
    }
  }

  restoreSupplies() {
    this.basicSupply.restore();
    for (const supply of this.advancedSupplies) {
      supply.restore();
    }
  }

  feedLiving() {
    this.population.consume(this.basicSupply, this.advancedSupplies);
  }
}
