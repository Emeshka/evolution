import { Injectable } from '@nestjs/common';
import { Map } from './Map/Map.entity';
import { writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class AppService {
  private map: Map;

  seed(): string {
    this.map = new Map(3, 1000);
    const game = JSON.stringify(this.map);
    const filename = './game_snapshot.json';
    /**
     * flags:
     *  - w = Open file for reading and writing. File is created if not exists
     *  - a+ = Open file for reading and appending. The file is created if not exists
     */
    writeFileSync(join(__dirname, filename), game, {
      flag: 'w',
    });
    return game;
  }

  start(): string {
    return 'Finished.';
  }
}
