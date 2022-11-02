import { Map } from 'src/Map/Map.entity';
import { MapCell } from 'src/MapCell/MapCell.entity';

export class Simulation {
  private STEP_INTERVAL = 1000;

  public map: Map;
  private timeout: ReturnType<typeof setTimeout>;
  private isRunning: boolean;
  public generationNumber = 0;

  private updateModel(): void {
    for (let i = 0; i < this.map.size; i++) {
      for (let j = 0; j < this.map.size; j++) {
        const cell: MapCell = this.map[i][j];
        cell.restoreSupplies();
        cell.feedLiving();
        cell.spawn();
      }
    }
  }

  private step(delay): void {
    this.timeout = setTimeout(() => {
      if (this.isRunning) {
        return;
      }
      this.updateModel();
      this.generationNumber++;
      // TODO: vary interval depending on user input
      this.step(this.STEP_INTERVAL);
    }, delay);
  }

  start(): string {
    this.generationNumber = 0;
    this.resume();
    return 'Resumed.';
  }

  resume(): string {
    this.isRunning = true;
    this.step(0);
    return 'Started.';
  }

  stop(): string {
    this.isRunning = false;
    clearTimeout(this.timeout);
    return 'Stopped.';
  }

  constructor(map: Map) {
    this.map = map;
  }
}
