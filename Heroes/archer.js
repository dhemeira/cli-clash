import { Hero } from './hero.js';
export class Archer extends Hero {
  constructor(name) {
    super(name, 'Priest', 80, 2, 15);
  }

  get dmg() {
    let chanceRoll = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    if (this.weapon.who == '*' || this.weapon.who == this.constructor.name) {
      return this.weapon.dmg + (this.abilityUsed && chanceRoll <= 10 ? 15 : 0);
    }
    return 0 + (this.abilityUsed && chanceRoll <= 10 ? 15 : 0);
  }
}
