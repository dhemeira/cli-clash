import { Hero } from './hero.js';
export class Mage extends Hero {
  constructor(name) {
    super(name, 'Mage', 70, 1, 5);
  }

  get dmg() {
    let chanceRoll = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    if (this.weapon.who == '*' || this.weapon.who == this.constructor.name) {
      return this.weapon.dmg + (this.abilityUsed && chanceRoll <= 10 ? 20 : 0);
    }
    return 0 + (this.abilityUsed && chanceRoll <= 10 ? 20 : 0);
  }
}
