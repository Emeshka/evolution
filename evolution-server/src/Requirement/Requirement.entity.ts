import { OutputPropertyDescription } from 'src/OutputProperty/OutputProperty.types';
import { ComparativeSign } from 'src/Signs.enum';

export class Requirement {
  threshold: number;
  outputProperty: OutputPropertyDescription;
  sign: ComparativeSign;

  toString() {
    return JSON.stringify({
      threshold: this.threshold,
      outputProperty: this.outputProperty.name,
      sign: this.sign,
    });
  }

  toJSON() {
    return {
      threshold: this.threshold,
      outputProperty: this.outputProperty.name,
      sign: this.sign,
    };
  }

  constructor(threshold, outputProperty, sign) {
    this.threshold = threshold;
    this.outputProperty = outputProperty;
    this.sign = sign;
  }
}
