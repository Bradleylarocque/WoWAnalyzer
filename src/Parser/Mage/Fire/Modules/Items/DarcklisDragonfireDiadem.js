import React from 'react';

import ITEMS from 'common/ITEMS';
import SPELLS from 'common/SPELLS';
import Analyzer from 'Parser/Core/Analyzer';
import getDamageBonus from 'Parser/Mage/Shared/Modules/GetDamageBonus';
import ItemDamageDone from 'Main/ItemDamageDone';

const DAMAGE_BONUS = 1;

class DarcklisDragonfireDiadem extends Analyzer {
  damage = 0;

  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.hasHead(ITEMS.DARCKLIS_DRAGONFIRE_DIADEM.id);
  }

  on_byPlayer_damage(event) {
    if (event.ability.guid !== SPELLS.DRAGONS_BREATH.id) {
      return;
    }
    this.damage += getDamageBonus(event, DAMAGE_BONUS);
  }

  item() {
    return {
      item: ITEMS.DARCKLIS_DRAGONFIRE_DIADEM,
      result: <ItemDamageDone amount={this.damage} />,
    };
  }
}

export default DarcklisDragonfireDiadem;
