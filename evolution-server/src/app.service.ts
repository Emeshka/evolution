import { Injectable } from '@nestjs/common';
import { Map } from './Map/Map.entity';
import { writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class AppService {
  private map: Map;
  private SAVE_DIRECTORY = process.env['SAVE_DIRECTORY'];

  seed(): string {
    this.map = new Map(3, 1000);
    const game = JSON.stringify(this.map);
    const filepath = join(this.SAVE_DIRECTORY, 'game_snapshot.json');
    /**
     * flags:
     *  - w = Open file for reading and writing. File is created if not exists
     *  - a+ = Open file for reading and appending. The file is created if not exists
     */
    writeFileSync(filepath, game, { flag: 'w' });
    return game;
  }

  start(): string {
    return 'Finished.';
  }
}
