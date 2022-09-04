export class Arena {
  static onGoing = true;
  static round = 1;
  static winner = '';
  static tournament(hero1, hero2) {
    this.resetArena();
    while (this.onGoing && this.round < 100) {
      if (Math.floor(Math.random() * (1 - 0 + 1) + 0) == 0) {
        this.simulateRound(hero1, hero2);
      } else {
        this.simulateRound(hero2, hero1);
      }
    }
  }

  static resetArena() {
    this.onGoing = true;
    this.round = 1;
    this.winner = '';

    if (typeof process !== 'object') {
      document.querySelector('.output').innerHTML = '';
    } 
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
    if (typeof process !== 'object') {
      this.drawUI(hero1, hero2, hp1, hp2);
    } else {
      this.drawUIConsole(hero1, hero2, hp1, hp2);
    }

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
    const output = document.querySelector('.output');
    output.innerHTML += `<p>--- Round ${
      this.round < 10 ? '0' + this.round : this.round
    } ---</p>`;

    let stats = {};
    let rowName1 = `(1st) ${hero1.name}`;
    let rowName2 = `(2nd) ${hero2.name}`;
    // reset the damage dealt by the loser in the last round, and get the heroes' stats
    if (this.winner == hero1.name) {
      hero1.hp = hp1;
      hero2.fullDmgDone = 0;
      hero2.reducedDmgDone = 0;
      rowName1 = `(1st) ${hero1.name} (Winner)`;
      rowName2 = `(2nd) ${hero2.name} (Dead)`;
      stats[`(1st) ${hero1.name} (Winner)`] = this.getStat(hero1, hp1);
      stats[`(2nd) ${hero2.name} (Dead)`] = this.getStat(hero2, hp2);
    } else if (this.winner == hero2.name) {
      hero2.hp = hp2;
      hero1.fullDmgDone = 0;
      hero1.reducedDmgDone = 0;
      rowName1 = `(1st) ${hero1.name} (Dead)`;
      rowName2 = `(2nd) ${hero2.name} (Winner)`;
      stats[`(1st) ${hero1.name} (Dead)`] = this.getStat(hero1, hp1);
      stats[`(2nd) ${hero2.name} (Winner)`] = this.getStat(hero2, hp2);
    } else {
      stats[`(1st) ${hero1.name}`] = this.getStat(hero1, hp1);
      stats[`(2nd) ${hero2.name}`] = this.getStat(hero2, hp2);
    }

    output.innerHTML += `<table class="table-${this.round}">
                          <thead>
                            <tr><th>Name</th><th>HP before</th><th>Full DMG done</th><th>Reduced DMG done</th><th>HP after</th></tr>
                          </thead>
                          <tbody>
                            <tr class="${
                              rowName1.includes('Dead')
                                ? 'loser'
                                : rowName1.includes('Winner')
                                ? 'winner'
                                : ''
                            }">
                              <td>${rowName1}</td>
                              <td>${stats[rowName1]['HP before']}</td>
                              <td>${stats[rowName1]['Full DMG done']}</td>
                              <td>${stats[rowName1]['Reduced DMG done']}</td>
                              <td>${stats[rowName1]['HP after']}</td>
                            </tr>
                            <tr class="${
                              rowName2.includes('Dead')
                                ? 'loser'
                                : rowName2.includes('Winner')
                                ? 'winner'
                                : ''
                            }">
                              <td>${rowName2}</td>
                              <td>${stats[rowName2]['HP before']}</td>
                              <td>${stats[rowName2]['Full DMG done']}</td>
                              <td>${stats[rowName2]['Reduced DMG done']}</td>
                              <td>${stats[rowName2]['HP after']}</td>
                            </tr>
                          </tbody>
                        </table>`;
  }

  static drawUIConsole(hero1, hero2, hp1, hp2) {
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
