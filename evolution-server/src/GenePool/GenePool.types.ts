import { Allel } from 'src/Allel/Allel.entity';

export type GenePool = {
  [key: number]: {
    allel: Allel;
    quantity: number;
  }[];
};
