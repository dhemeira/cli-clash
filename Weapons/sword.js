import { Weapon } from './weapon.js';
export class Sword extends Weapon {
  constructor() {
    super('Sword', '*', 8, 12, 90);
  }
}
