export interface DTOTariff {
  id: number;
  name: string;
  company_id: number;
  data: DTOTariffRules;
  created_at: string;
}

export interface DTOTariffRules {
  periods: DTOTariffPeriodRule[];
  default_amount: number;
}

export interface DTOTariffPeriodRule {
  start: string;
  end: string;
  amount: number;
}
