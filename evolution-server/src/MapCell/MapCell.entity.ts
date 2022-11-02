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
    this.basicSupply = new Supply('basicSupply', basicSupplyValue, []);

    this.advancedSupplies = [];
    this.advancedSupplies[0] = new Supply('Advanced supply 1', 5000, [
      new Requirement(50, OutputProperty.width, ComparativeSign.G),
    ]);

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
    this.population.feed(this.basicSupply, this.advancedSupplies);
  }

  spawn() {
    /*TODO: spawn each organism depending on its phenotype.sex:

    https://ru.wikipedia.org/wiki/%D0%A0%D0%B0%D0%B7%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5_%D0%BF%D0%BE%D0%BB%D0%BE%D0%B2_%D1%83_%D1%80%D0%B0%D1%81%D1%82%D0%B5%D0%BD%D0%B8%D0%B9
    
    0 - can spawn only asexually (hydra, cyanobacteria)
    1 - can spawn asexually or sexually ()
    2 - can spawn only sexually (cats, birds)
    */
  }
}
