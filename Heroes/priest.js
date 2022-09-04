import { Hero } from './hero.js';
export class Priest extends Hero {
  constructor(name) {
    super(name, 'Priest', 90, 4, 20);
  }

  useAbility() {
    let chanceRoll = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    if (!this.abilityUsed && chanceRoll <= 10) {
      this.hp += 10;
      this.abilityUsed = true;
    }
  }
}
