import CoreCombatLogParser from 'Parser/Core/CombatLogParser';
import DamageDone from 'Parser/Core/Modules/DamageDone';
// Core
import HealingDone from './Modules/Core/HealingDone';
import DamageTaken from './Modules/Core/DamageTaken';
import HealingReceived from './Modules/Core/HealingReceived';
import Stagger from './Modules/Core/Stagger';
import BrewCDR from './Modules/Core/BrewCDR';
import SharedBrews from './Modules/Core/SharedBrews';
import StaggerFabricator from './Modules/Core/StaggerFabricator';
import GlobalCooldown from './Modules/Core/GlobalCooldown';
import Channeling from './Modules/Core/Channeling';
import MasteryValue from './Modules/Core/MasteryValue';
// Spells
import IronSkinBrew from './Modules/Spells/IronSkinBrew';
import PurifyingBrew from './Modules/Spells/PurifyingBrew';
import BlackoutCombo from './Modules/Spells/BlackoutCombo';
import KegSmash from './Modules/Spells/KegSmash';
import TigerPalm from './Modules/Spells/TigerPalm';
import RushingJadeWind from './Modules/Spells/RushingJadeWind';
import BreathOfFire from './Modules/Spells/BreathOfFire';
import BlackOxBrew from './Modules/Spells/BlackOxBrew';
import HighTolerance from './Modules/Spells/HighTolerance';
import Guard from './Modules/Spells/Guard';
// Features
import Checklist from './Modules/Features/Checklist';
import Abilities from './Modules/Abilities';
import AlwaysBeCasting from './Modules/Features/AlwaysBeCasting';
import DamageTakenTable from './Modules/Features/DamageTakenTable';
import StaggerPoolGraph from './Modules/Features/StaggerPoolGraph';
import StaggerTable from './Modules/Features/StaggerTable';
// Items
import T20_2pc from './Modules/Items/T20_2pc';
import T20_4pc from './Modules/Items/T20_4pc';
import AnvilHardenedWristwraps from './Modules/Items/AnvilHardenedWristwraps';
import StormstoutsLastGasp from './Modules/Items/StormstoutsLastGasp';
import SalsalabimsLostTunic from './Modules/Items/SalsalabimsLostTunic';
// normalizers
import IronskinBrewNormalizer from './Modules/Normalizers/IronskinBrew';
import GarothiWorldbreakerMeleeNormalizer from './Modules/Normalizers/GarothiWorldbreakerMelee';

class CombatLogParser extends CoreCombatLogParser {
  static specModules = {
    // Core
    healingDone: [HealingDone, { showStatistic: true }],
    healingReceived: HealingReceived,
    damageTaken: [DamageTaken, { showStatistic: true }],
    stagger: Stagger,
    staggerFabricator: StaggerFabricator,
    damageDone: [DamageDone, { showStatistic: true }],
    brewCdr: BrewCDR,
    brews: SharedBrews,
    channeling: Channeling,
    globalCooldown: GlobalCooldown,
    masteryValue: MasteryValue,

    // Features
    checklist: Checklist,
    alwaysBeCasting: AlwaysBeCasting,
    abilities: Abilities,
    damageTakenTable: DamageTakenTable,
    staggerPoolGraph: StaggerPoolGraph,
    staggerTable: StaggerTable,

    // Spells
    ironSkinBrew: IronSkinBrew,
    purifyingBrew: PurifyingBrew,
    blackoutCombo: BlackoutCombo,
    kegSmash: KegSmash,
    tigerPalm: TigerPalm,
    rjw: RushingJadeWind,
    bof: BreathOfFire,
    bob: BlackOxBrew,
    highTolerance: HighTolerance,
    guard: Guard,

    // Items
    t20_2pc: T20_2pc,
    t20_4pc: T20_4pc,
    ahw: AnvilHardenedWristwraps,
    stormstoutsLastGasp: StormstoutsLastGasp,
    salsalabim: SalsalabimsLostTunic,

    // normalizers
    isbNormalizer: IronskinBrewNormalizer,
    garothi: GarothiWorldbreakerMeleeNormalizer,
  };
}

export default CombatLogParser;
