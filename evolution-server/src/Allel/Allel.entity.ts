import { Effect } from 'src/Effect/Effect.entity';
import { GenePool } from 'src/GenePool/GenePool.types';

export class Allel {
  static lastOrder = 0;
  static genePool: GenePool = null;

  order: number;
  variantId: number;
  cost: number;
  effects: Effect[];

  constructor(order, variantId, outputProperties, actionSigns) {
    this.order = order;
    this.variantId = variantId;
    this.cost = Math.floor(Math.random() * 10) + 1;
    this.effects = [];
    const effectCount = Math.floor(Math.random() * Effect.maxCount) + 1;
    for (let i = 0; i < effectCount; i++) {
      this.effects.push(new Effect(outputProperties, actionSigns));
    }
  }

  updateAllelPlaceInGenePool(oldOrder, modifiedAllel) {
    // in this game order of allel (it's position in genome) can mutate, so applying order of genes can change
    // if the new order coincides with an order of some existing allel of any origin, it starts to be an alternative variant to it
    // this is a game convention
    const oldVariants = Allel.genePool[oldOrder];
    const oldIndex = oldVariants.findIndex(
      (entry) => entry.allel === modifiedAllel,
    );
    const [entry] = oldVariants.splice(oldIndex, 1);
    const newVariants = Allel.genePool[modifiedAllel.order];
    if (
      newVariants.find(
        (entry) => entry.allel.variantId === modifiedAllel.variantId,
      )
    ) {
      const maxVariantId = newVariants.reduce(
        (accum, entry) =>
          entry.allel.variantId > accum ? entry.allel.variantId : accum,
        newVariants[0].allel.variantId,
      );
      modifiedAllel.variantId = maxVariantId + 1;
    }
    newVariants.push(entry);
  }

  updateQuantity(delta) {
    const entry = Allel.genePool[this.order].find(
      (entry) => entry.allel == this,
    );
    entry.quantity += delta;
  }
}
