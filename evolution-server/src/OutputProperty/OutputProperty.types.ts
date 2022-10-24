export class OutputPropertyDescription {
  name: string;
  minValue: number;
  maxValue: number;
}

export const OutputProperty = {
  color: {
    // will be inverted: 0x1.000.000 - color
    // so the higher value, the darker
    name: 'color',
    minValue: 0,
    maxValue: 0xffffff,
  },
  width: {
    name: 'width',
    minValue: 1,
    maxValue: 100,
  },
  reproductionBaseCost: {
    name: 'reproductionBaseCost',
    minValue: 1,
    maxValue: 100,
  },
  litterCount: {
    name: 'litterCount',
    minValue: 1,
    maxValue: 100,
  },
};

type OutputPropertyNames = keyof typeof OutputProperty;

export type Phenotype = { [K in OutputPropertyNames]?: number };
