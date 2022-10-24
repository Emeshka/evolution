import { Allel } from 'src/Allel/Allel.entity';
import { GenePool } from 'src/GenePool/GenePool.types';
import {
  OutputProperty,
  Phenotype,
} from 'src/OutputProperty/OutputProperty.types';
import { ActionSign } from 'src/Signs.enum';

export class Individual {
  genotype: Allel[];
  phenotype: Phenotype;

  constructor(initialGenePool?: GenePool) {
    this.genotype = [];
    const geneOrder = Object.keys(initialGenePool).sort();
    for (const order of geneOrder) {
      const variants = initialGenePool[order];
      const randomVariant =
        variants[Math.floor(Math.random() * variants.length)];
      this.genotype.push(randomVariant.allel);
    }
  }

  execute() {
    const phenotype = {};
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
    }
    this.phenotype = phenotype;
  }

  toString() {
    return JSON.stringify({
      genotype: this.genotype.map((allel) => {
        return {
          order: allel.order,
          variantId: allel.variantId,
        };
      }),
      phenotype: this.phenotype,
    });
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
