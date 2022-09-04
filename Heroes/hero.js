export class Hero {
  fullDmgDone;
  reducedDmgDone;
  constructor(name, type, hp, armour, evasion) {
    this.name = name;
    this.type = type;
    this.hp = hp;
    this.armour = armour;
    this.evasion = evasion;
    this.abilityUsed = false;
    this.weapon = null;
  }

  get hp() {
    return this._hp;
  }
  set hp(value) {
    this._hp = value;
  }

  get armour() {
    return this._armour;
  }
  set armour(value) {
    this._armour = value;
  }

  get evasion() {
    return this._evasion;
  }
  set evasion(value) {
    this._evasion = value;
  }

  get dmg() {
    if (this.weapon.who == '*' || this.weapon.who == this.constructor.name) {
      return this.weapon.dmg;
    }
    return 0;
  }

  useAbility() {
    this.abilityUsed = true;
  }

  resetAbility() {
    this.abilityUsed = false;
  }

  equipWeapon(weapon) {
    if (this.weapon === null) {
      this.weapon = weapon;
    }
  }

  attack(hero) {
    let chanceRoll = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    this.fullDmgDone = 0;
    this.reducedDmgDone = 0;
    if (chanceRoll > hero.evasion) {
      this.fullDmgDone = this.dmg;
      let calculatedDmg = this.fullDmgDone - Math.floor(hero.armour / 3);
      if (calculatedDmg > 0) {
        this.reducedDmgDone = calculatedDmg;
        hero.hp -= this.reducedDmgDone;
      }
    }
  }
}
