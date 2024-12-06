export type SubstanceType = 'caffeine' | 'alcohol' | 'nicotine';

export interface SubstanceState {
  consumed: boolean;
  timestamp: string;
}

export interface DayData {
  date: string;
  substances: Record<SubstanceType, boolean>;
}