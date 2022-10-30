import { Allel } from 'src/Allel/Allel.entity';
import { GenePool } from 'src/GenePool/GenePool.types';
import { MapCell } from 'src/MapCell/MapCell.entity';
import { OutputProperty } from 'src/OutputProperty/OutputProperty.types';
import { ActionSign } from 'src/Signs.enum';

export class Map {
  cells: MapCell[][];
  size: number;
  genePool: GenePool;

  constructor(size, basicSupply) {
    this.size = size;
    this.genePool = [];
    Allel.genePool = this.genePool;
    const outputProperties = Object.entries(OutputProperty);
    const actionSigns = Object.entries(ActionSign);
    for (let i = 0; i < 6; i++) {
      this.genePool[i] = [
        {
          allel: new Allel(Allel.lastOrder++, 0, outputProperties, actionSigns),
          quantity: 0,
        },
      ];
    }

    this.cells = [];
    for (let i = 0; i < size; i++) {
      this.cells[i] = [];
      for (let j = 0; j < size; j++) {
        this.cells[i][j] = new MapCell(i, j, basicSupply, this.genePool);
      }
    }
  }
}
