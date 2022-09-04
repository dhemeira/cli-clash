export class Arena {
  static onGoing = true;
  static round = 1;
  static winner = '';
  static tournament(hero1, hero2) {
    while (this.onGoing && this.round < 100) {
      if (Math.floor(Math.random() * (1 - 0 + 1) + 0) == 0) {
        this.simulateRound(hero1, hero2);
      } else {
        this.simulateRound(hero2, hero1);
      }
    }
    this.resetArena()
  }

  static resetArena() {
    this.onGoing = true;
    this.round = 1;
    this.winner = '';
  }

  static simulateRound(hero1, hero2) {
    // store the HPs before attack
    let hp1 = hero1.hp;
    let hp2 = hero2.hp;

    // use hero abilities
    hero1.useAbility();
    hero2.useAbility();

    // do both attack for the round
    hero1.attack(hero2);
    hero2.attack(hero1);

    // calculate if there is a winner, and who is it
    this.calculateWinner(hero1, hero2, hp1, hp2);

    // draw the UI for the round
    this.drawUI(hero1, hero2, hp1, hp2);

    // reset hero abilities
    hero1.resetAbility();
    hero2.resetAbility();

    this.round++;
  }

  static calculateWinner(hero1, hero2, hp1, hp2) {
    // if second attacker's hp below 0, then first attacker wins
    // else if first attacker's hp below 0, then second attacker wins
    this.winner = hero2.hp <= 0 ? hero1.name : hero1.hp <= 0 ? hero2.name : '';

    // if there is a winner, stop the tournament
    if (this.winner !== '') {
      this.onGoing = false;
    }
  }

  static drawUI(hero1, hero2, hp1, hp2) {
    console.log(
      `\n------------------------------ Round ${
        this.round < 10 ? '0' + this.round : this.round
      } ------------------------------`
    );

    let stats = {};
    // reset the damage dealt by the loser in the last round, and get the heroes' stats
    if (this.winner == hero1.name) {
      hero1.hp = hp1;
      hero2.fullDmgDone = 0;
      hero2.reducedDmgDone = 0;
      stats[`(1st) ${hero1.name} (Winner)`] = this.getStat(hero1, hp1);
      stats[`(2nd) ${hero2.name} (Dead)`] = this.getStat(hero2, hp2);
    } else if (this.winner == hero2.name) {
      hero2.hp = hp2;
      hero1.fullDmgDone = 0;
      hero1.reducedDmgDone = 0;
      stats[`(1st) ${hero1.name} (Dead)`] = this.getStat(hero1, hp1);
      stats[`(2nd) ${hero2.name} (Winner)`] = this.getStat(hero2, hp2);
    } else {
      stats[`(1st) ${hero1.name}`] = this.getStat(hero1, hp1);
      stats[`(2nd) ${hero2.name}`] = this.getStat(hero2, hp2);
    }

    console.table(stats);
  }

  static getStat(hero, hp) {
    return {
      'HP before': hp,
      'Full DMG done': hero.fullDmgDone,
      'Reduced DMG done': hero.reducedDmgDone,
      'HP after': hero.hp,
    };
  }
}
