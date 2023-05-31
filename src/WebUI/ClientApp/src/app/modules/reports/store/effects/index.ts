export * from './diseases.effects';
export * from './reports.effects';
export * from './species.effects';

import { DiseaseEffects } from './diseases.effects';
import { ReportsEffects } from './reports.effects';
import { SpeciesEffects } from './species.effects';

export const effects = [DiseaseEffects, ReportsEffects, SpeciesEffects];
