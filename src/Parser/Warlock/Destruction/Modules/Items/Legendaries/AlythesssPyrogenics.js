import React from 'react';

import Analyzer from 'Parser/Core/Analyzer';
import Enemies from 'Parser/Core/Modules/Enemies';
import calculateEffectiveDamage from 'Parser/Core/calculateEffectiveDamage';

import SPELLS from 'common/SPELLS';
import ITEMS from 'common/ITEMS';

import ItemDamageDone from 'Main/ItemDamageDone';

const ALYTHESSS_PYROGENICS_DAMAGE_BONUS = 0.1;

const AFFECTED_SPELLS = new Set([
  SPELLS.INCINERATE.id,
  SPELLS.CONFLAGRATE.id,
  SPELLS.IMMOLATE_DEBUFF.id,
  SPELLS.IMMOLATE.id,
  SPELLS.CHANNEL_DEMONFIRE_DAMAGE.id,
  SPELLS.RAIN_OF_FIRE_DAMAGE.id,
]);

class AlythesssPyrogenics extends Analyzer {
  static dependencies = {
    enemies: Enemies,
  };

  bonusDmg = 0;

  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.hasFinger(ITEMS.ALYTHESSS_PYROGENICS.id);
  }

  on_byPlayer_damage(event) {
    const enemy = this.enemies.getEntity(event);
    if (!enemy || !enemy.hasBuff(SPELLS.ALYTHESSS_PYROGENICS_DEBUFF.id, event.timestamp) || !AFFECTED_SPELLS.has(event.ability.guid)) {
      return;
    }
    this.bonusDmg += calculateEffectiveDamage(event, ALYTHESSS_PYROGENICS_DAMAGE_BONUS);
  }

  item() {
    return {
      item: ITEMS.ALYTHESSS_PYROGENICS,
      result: <ItemDamageDone amount={this.bonusDmg} />,
    };
  }
}

export default AlythesssPyrogenics;
