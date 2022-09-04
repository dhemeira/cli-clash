import { Archer } from './Heroes/archer.js';
import { Mage } from './Heroes/mage.js';
import { Priest } from './Heroes/priest.js';
import { Rouge } from './Heroes/rouge.js';
import { Warrior } from './Heroes/warrior.js';
import { Dagger } from './Weapons/dagger.js';
import { Sword } from './Weapons/sword.js';
import { WarHammer } from './Weapons/warHammer.js';
import { BattleAxe } from './Weapons/battleAxe.js';
import { Bow } from './Weapons/bow.js';
import { Wand } from './Weapons/wand.js';
import { Arena } from './arena.js';

if (typeof process !== 'object') {
  document.querySelector('#fight').addEventListener('submit', (e) => {
    e.preventDefault();

    const hero1name = document.querySelector('#hero1name').value;
    const hero1class = document.querySelector('#hero1').value;
    const hero1weapon = document.querySelector('#hero1weapon').value;

    const hero2name = document.querySelector('#hero2name').value;
    const hero2class = document.querySelector('#hero2').value;
    const hero2weapon = document.querySelector('#hero2weapon').value;

    var hero1 = eval(`new ${hero1class}('${hero1name}')`);
    hero1.equipWeapon(eval(`new ${hero1weapon}()`));
    var hero2 = eval(`new ${hero2class}('${hero2name}')`);
    hero2.equipWeapon(eval(`new ${hero2weapon}()`));
    Arena.tournament(hero1, hero2);
  });
} else {
  const bela = new Warrior('Béla');
  bela.equipWeapon(new BattleAxe());
  const pista = new Priest('Pista');
  pista.equipWeapon(new BattleAxe());
  Arena.tournament(bela, pista);
}
