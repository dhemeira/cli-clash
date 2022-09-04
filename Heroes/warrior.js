import { Hero } from './hero.js';
export class Warrior extends Hero {
  constructor(name) {
    super(name, 'Warrior', 100, 5, 20);
  }

  get armour() {
    let chanceRoll = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    if(this.abilityUsed && chanceRoll <= 99) {
      return this._armour + 10;
    }
    return this._armour;
  }

  set armour(value) {
    super.armour = value
  }
}
