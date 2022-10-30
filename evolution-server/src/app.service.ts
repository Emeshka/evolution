import { Injectable } from '@nestjs/common';
import { Map } from './Map/Map.entity';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { Simulation } from './Simulation/Simulation.entity';

@Injectable()
export class AppService {
  private SAVE_DIRECTORY = process.env['SAVE_DIRECTORY'];
  private simulation: Simulation;

  seed(): string {
    const map = new Map(3, 1000);
    const game = JSON.stringify(map);
    const filepath = join(this.SAVE_DIRECTORY, 'game_snapshot.json');
    writeFileSync(filepath, game, { flag: 'w' });
    this.simulation = new Simulation(map);
    return game;
  }

  startSimulation(): string {
    return this.simulation.start();
  }

  resumeSimulation(): string {
    return this.simulation.resume();
  }

  stopSimulation(): string {
    return this.simulation.stop();
  }
}
