export class Weapon {
  constructor(name, who, mindmg, maxdmg, chance) {
    this.name = name;
    this.who = who;
    this.mindmg = mindmg;
    this.maxdmg = maxdmg;
    this.chance = chance;
  }

  get dmg() {
    let chanceRoll = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    if (chanceRoll <= this.chance) {
      return Math.floor(Math.random() * (this.maxdmg - this.mindmg + 1) + this.mindmg);
    } else {
      return 0;
    }
  }
}
