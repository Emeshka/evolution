import { Allel } from 'src/Allel/Allel.entity';
import { GenePool } from 'src/GenePool/GenePool.types';
import {
  OutputProperty,
  Phenotype,
} from 'src/OutputProperty/OutputProperty.types';
import { Requirement } from 'src/Requirement/Requirement.entity';
import { ActionSign, ComparativeSign } from 'src/Signs.enum';
import { Supply } from 'src/Supply/Supply.entity';

export class Individual {
  genotype: Allel[];
  phenotype: Phenotype;
  consumption: number;

  constructor(initialGenePool?: GenePool) {
    this.genotype = [];
    const geneOrder = Object.keys(initialGenePool)
      .map((stringKey) => Number(stringKey))
      .sort();
    for (const order of geneOrder) {
      const variants = initialGenePool[order];
      const randomVariant =
        variants[Math.floor(Math.random() * variants.length)];
      this.genotype.push(randomVariant.allel);
      randomVariant.allel.updateQuantity(1);
    }
  }

  makePhenotype() {
    const phenotype = {};
    this.consumption = 0;
    for (const name of Object.keys(OutputProperty)) {
      phenotype[name] = OutputProperty[name].minValue;
    }
    for (const allel of this.genotype) {
      for (const effect of allel.effects) {
        const { object, action, value } = effect;
        if (action == ActionSign.A) {
          phenotype[object.name] += value;
        } else if (action == ActionSign.S) {
          phenotype[object.name] -= value;
        } else if (action == ActionSign.M) {
          phenotype[object.name] *= value;
        } else if (action == ActionSign.D) {
          phenotype[object.name] /= value;
        }

        phenotype[object.name] = Math.floor(phenotype[object.name]);

        if (phenotype[object.name] < object.minValue) {
          phenotype[object.name] = object.minValue;
        } else if (phenotype[object.name] > object.maxValue) {
          phenotype[object.name] = object.maxValue;
        }
      }
      this.consumption += allel.cost;
    }
    this.phenotype = phenotype;
  }

  isAdapted(requirements: Requirement[]) {
    let isAdapted = true;
    for (const requirement of requirements) {
      const actualValue = this.phenotype[requirement.outputProperty.name];
      if (requirement.sign === ComparativeSign.G) {
        isAdapted = isAdapted && actualValue > requirement.threshold;
      } else if (requirement.sign === ComparativeSign.L) {
        isAdapted = isAdapted && actualValue < requirement.threshold;
      }
    }
    return isAdapted;
  }

  feed(basicSupply: Supply, advancedSupplies: Supply[]) {
    // An organism will prioritize advanced supplies if it can reach any

    // TODO: take in account that one organism can feed on multiple supplies at one step

    // TODO: if feed returns false (there wasn't enough food), it returns
    // all of actually consumed energy to basic supply, no matter where it has taken it
    for (const supply of advancedSupplies) {
      const isAdapted = this.isAdapted(supply.requirements);
      if (isAdapted && supply.value - this.consumption >= 0) {
        supply.value -= this.consumption;
        return true;
      }
    }

    // If no advanced supply is accessible, it will take energy from basicSupply
    if (basicSupply.value - this.consumption >= 0) {
      basicSupply.value -= this.consumption;
      return true;
    } else {
      // If basic supply ran out, organism dies with no heirs
      return false;
    }
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }

  toJSON() {
    return {
      genotype: this.genotype.map((allel) => {
        return {
          order: allel.order,
          variantId: allel.variantId,
        };
      }),
      phenotype: this.phenotype,
    };
  }
}
