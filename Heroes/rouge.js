import { Hero } from './hero.js';
export class Rouge extends Hero {
  constructor(name) {
    super(name, 'Priest', 80, 3, 30);
  }

  get evasion() {
    let chanceRoll = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    if (this.abilityUsed && chanceRoll <= 10) {
      return this._evasion + 10;
    }
    return this._evasion;
  }

  set evasion(value) {
    super.evasion = value;
  }
}
