import { OutputPropertyDescription } from 'src/OutputProperty/OutputProperty.types';
import { ActionSign } from 'src/Signs.enum';

export class Effect {
  static maxCount = 2;

  object: OutputPropertyDescription;
  action: ActionSign;
  value: number;

  constructor(outputProperties, actionSigns) {
    this.object =
      outputProperties[Math.floor(Math.random() * outputProperties.length)][1];
    this.action =
      actionSigns[Math.floor(Math.random() * actionSigns.length)][1];
    if (this.action == ActionSign.A || this.action == ActionSign.S) {
      const min = this.object.minValue;
      const max = this.object.maxValue;
      this.value = min + Math.floor(Math.random() * (max - min) * 0.2);
    } else {
      this.value = Math.floor(Math.random() * 2 * 100) / 100;
    }
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }

  toJSON() {
    return {
      object: this.object.name,
      action: this.action,
      value: this.value,
    };
  }
}
