import React from 'react';

import SPELLS from 'common/SPELLS';
import ITEMS from 'common/ITEMS';
import SpellIcon from 'common/SpellIcon';
import { formatNumber } from 'common/format';

import Analyzer from 'Parser/Core/Analyzer';

import StatisticBox, { STATISTIC_ORDER } from 'Main/StatisticBox';

class DivinePurpose extends Analyzer {

  constructor(...args) {
    super(...args);
    const hasDivinePurpose = this.selectedCombatant.hasTalent(SPELLS.DIVINE_PURPOSE_TALENT_RETRIBUTION.id);
    const hasSoulOfTheHighlord = this.selectedCombatant.hasFinger(ITEMS.SOUL_OF_THE_HIGHLORD.id);
    this.active = hasDivinePurpose || hasSoulOfTheHighlord;
  }

  get divinePurposeProcs() {
    return this.selectedCombatant.getBuffTriggerCount(SPELLS.DIVINE_PURPOSE_BUFF.id);
  }

  statistic() {
    return (
      <StatisticBox
        icon={<SpellIcon id={SPELLS.DIVINE_PURPOSE_TALENT_RETRIBUTION.id} />}
        value={`${formatNumber(this.divinePurposeProcs)}`}
        label="Divine Purpose procs"
      />
    );
  }
  statisticOrder = STATISTIC_ORDER.OPTIONAL(1);
}

export default DivinePurpose;
