import React from 'react';

import SPELLS from 'common/SPELLS';
import ITEMS from 'common/ITEMS';
import SpellLink from 'common/SpellLink';
import ItemLink from 'common/ItemLink';
import { formatNumber, formatPercentage } from 'common/format';

import Analyzer from 'Parser/Core/Analyzer';

import calculateEffectiveDamage from 'Parser/Core/calculateEffectiveDamage';
import ItemDamageDone from 'Main/ItemDamageDone';

const WHISPER_OF_THE_NATHREZIM_MODIFIER = 0.15;

class WhisperOfTheNathrezim extends Analyzer {
  damageDone = 0;
  spenderInsideBuff = 0;
  totalSpender = 0;

  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.hasBack(ITEMS.WHISPER_OF_THE_NATHREZIM.id);
  }

  on_byPlayer_cast(event) {
    const spellId = event.ability.guid;
    if (spellId === SPELLS.TEMPLARS_VERDICT.id || spellId === SPELLS.DIVINE_STORM.id) {
      if (this.selectedCombatant.hasBuff(SPELLS.WHISPER_OF_THE_NATHREZIM_BUFF.id)) {
        this.spenderInsideBuff++;
      }
      this.totalSpender++;
    }
  }

  on_byPlayer_damage(event) {
    const spellId = event.ability.guid;
    if (!this.selectedCombatant.hasBuff(SPELLS.WHISPER_OF_THE_NATHREZIM_BUFF.id)) {
      return;
    }
    if (spellId === SPELLS.TEMPLARS_VERDICT_DAMAGE.id || spellId === SPELLS.DIVINE_STORM_DAMAGE.id) {
      this.damageDone += calculateEffectiveDamage(event, WHISPER_OF_THE_NATHREZIM_MODIFIER);
    }
  }

  item() {
    return {
      item: ITEMS.WHISPER_OF_THE_NATHREZIM,
      result: (
        <dfn data-tip={`
          The effective damage contributed by Whisper of the Nathrezim.<br/>
          Total Damage: ${formatNumber(this.damageDone)}<br/>
          Spenders With Buff: ${formatNumber(this.spenderInsideBuff)} spenders (${formatPercentage(this.spenderInsideBuff / this.totalSpender)}%)`}>
          <ItemDamageDone amount={this.damageDone} />
        </dfn>
      ),
    };
  }

  get suggestionThresholds() {
    return {
      actual: this.spenderInsideBuff / this.totalSpender,
      isLessThan: {
        minor: 0.80,
        average: 0.75,
        major: 0.70,
      },
      style: 'percentage',
    };
  }

  suggestions(when) {
    when(this.suggestionThresholds).addSuggestion((suggest, actual, recommended) => {
      return suggest(<React.Fragment>Your usage of <ItemLink id={ITEMS.WHISPER_OF_THE_NATHREZIM.id} icon /> can be improved. Make sure to save up five holy power before your next <SpellLink id={SPELLS.JUDGMENT_CAST.id} icon /> window to get more time on the buff.</React.Fragment>)
        .icon(ITEMS.WHISPER_OF_THE_NATHREZIM.icon)
        .actual(`${formatPercentage(actual)}% of spenders with the buff`)
        .recommended(`>${formatPercentage(recommended)}% is recommended`);
    });
  }
}

export default WhisperOfTheNathrezim;
