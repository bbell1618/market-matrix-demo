export enum Commodity {
  GENERAL_FREIGHT = "General Freight",
  REFRIGERATED_GOODS = "Refrigerated Goods",
  HAZMAT = "Hazardous Materials",
  LOGGING = "Logging",
  AUTOS = "Autos",
  CONSTRUCTION = "Construction Materials"
}

export enum USState {
  TX = "TX", CA = "CA", FL = "FL", NY = "NY", 
  IL = "IL", PA = "PA", OH = "OH", GA = "GA",
  NC = "NC", MI = "MI", AL = "AL"
}

export interface Market {
  id: string;
  name: string;
  allowed_states: USState[];
  min_units: number;
  max_units: number;
  allowed_commodities: Commodity[];
  max_driver_violations: number;
  appetite_tags: string[]; // e.g., "Preferred", "High Risk", "Small Fleet"
  logo_color: string;
}

export interface Risk {
  id: string;
  name: string; // Business name
  state: USState;
  units: number;
  primary_commodity: Commodity;
  driver_violations: number;
  annual_revenue: number;
}

export interface EligibilityRuleResult {
  passed: boolean;
  reason: string;
}

export interface MatchResult {
  market: Market;
  is_eligible: boolean;
  score: number; // 0-100 match confidence
  reasons: string[]; // Why it failed or why it matched well
}

export interface AcordPayload {
  ACORD: {
    InsuranceSvcRq: {
      RqUID: string;
      CommercialAutoPolicyQuoteInqRq: {
        Producer: {
          ProducerInfo: {
            ProducerName: string;
          };
        };
        InsuredOrPrincipal: {
          GeneralPartyInfo: {
            NameInfo: {
              CommlName: {
                CommercialName: string;
              };
            };
            Addr: {
              StateProvCd: string;
            };
          };
        };
        CommlAutoLineBusiness: {
          NumVehs: number;
          CommlAutoDriverInfo: {
             NumViolations: number;
          };
          CommodityInfo: {
             CommodityDesc: string;
          };
        };
      };
    };
  };
}