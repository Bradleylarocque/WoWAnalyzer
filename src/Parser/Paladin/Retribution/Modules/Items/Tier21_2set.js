import React from 'react';

import SPELLS from 'common/SPELLS';
import SpellIcon from 'common/SpellIcon';
import SpellLink from 'common/SpellLink';
import { formatNumber } from 'common/format';

import Analyzer from 'Parser/Core/Analyzer';

import calculateEffectiveDamage from 'Parser/Core/calculateEffectiveDamage';
import ItemDamageDone from 'Main/ItemDamageDone';

const RET_PALADIN_T21_2SET_MODIFIER = 0.4;

class Tier21_2set extends Analyzer {
  damageDone = 0;

  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.hasBuff(SPELLS.RET_PALADIN_T21_2SET_BONUS.id);
  }

  on_byPlayer_damage(event) {
    const spellId = event.ability.guid;
    if (spellId !== SPELLS.JUDGMENT_CAST.id) {
      return;
    }
    this.damageDone += calculateEffectiveDamage(event, RET_PALADIN_T21_2SET_MODIFIER);
  }

  item() {
    return {
      id: `spell-${SPELLS.RET_PALADIN_T21_2SET_BONUS.id}`,
      icon: <SpellIcon id={SPELLS.RET_PALADIN_T21_2SET_BONUS.id} />,
      title: <SpellLink id={SPELLS.RET_PALADIN_T21_2SET_BONUS.id} icon={false} />,
      result: (
        <dfn data-tip={`
          The effective damage contributed by tier 21 2 peice.<br/>
          Damage: ${this.owner.formatItemDamageDone(this.damageDone)}<br/>
          Total Damage: ${formatNumber(this.damageDone)}`}>
          <ItemDamageDone amount={this.damageDone} />
        </dfn>
      ),
    };
  }
}

export default Tier21_2set;
