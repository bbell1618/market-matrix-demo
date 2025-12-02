import { Market, Risk, Commodity, USState } from './types';

export const MOCK_MARKETS: Market[] = [
  {
    id: "MKT-001",
    name: "Atlas Guard Insurance",
    allowed_states: [USState.TX, USState.FL, USState.GA, USState.AL, USState.NC],
    min_units: 1,
    max_units: 50,
    allowed_commodities: [Commodity.GENERAL_FREIGHT, Commodity.CONSTRUCTION, Commodity.REFRIGERATED_GOODS],
    max_driver_violations: 2,
    appetite_tags: ["Regional", "Small Fleet"],
    logo_color: "bg-blue-600"
  },
  {
    id: "MKT-002",
    name: "Red Route Carriers",
    allowed_states: [USState.CA, USState.NY, USState.IL, USState.TX],
    min_units: 10,
    max_units: 500,
    allowed_commodities: [Commodity.GENERAL_FREIGHT, Commodity.AUTOS],
    max_driver_violations: 0,
    appetite_tags: ["Large Fleet", "Preferred"],
    logo_color: "bg-red-600"
  },
  {
    id: "MKT-003",
    name: "HazMat Pro Specialty",
    allowed_states: [USState.TX, USState.PA, USState.OH, USState.MI, USState.IL],
    min_units: 5,
    max_units: 100,
    allowed_commodities: [Commodity.HAZMAT, Commodity.GENERAL_FREIGHT],
    max_driver_violations: 1,
    appetite_tags: ["Specialty", "High Risk"],
    logo_color: "bg-yellow-500"
  },
  {
    id: "MKT-004",
    name: "Forest & Field Mutual",
    allowed_states: [USState.GA, USState.NC, USState.AL, USState.FL],
    min_units: 1,
    max_units: 15,
    allowed_commodities: [Commodity.LOGGING, Commodity.CONSTRUCTION],
    max_driver_violations: 3,
    appetite_tags: ["Niche", "Forgiving"],
    logo_color: "bg-green-600"
  },
  {
    id: "MKT-005",
    name: "National Haulers Grp",
    allowed_states: Object.values(USState), // All states in our subset
    min_units: 20,
    max_units: 1000,
    allowed_commodities: [Commodity.GENERAL_FREIGHT, Commodity.REFRIGERATED_GOODS, Commodity.AUTOS],
    max_driver_violations: 1,
    appetite_tags: ["National", "Standard"],
    logo_color: "bg-indigo-600"
  }
];

export const MOCK_RISKS: Risk[] = [
  {
    id: "RISK-101",
    name: "Lone Star Logistics LLC",
    state: USState.TX,
    units: 12,
    primary_commodity: Commodity.GENERAL_FREIGHT,
    driver_violations: 1,
    annual_revenue: 2500000
  },
  {
    id: "RISK-102",
    name: "Miami Cool Transports",
    state: USState.FL,
    units: 4,
    primary_commodity: Commodity.REFRIGERATED_GOODS,
    driver_violations: 0,
    annual_revenue: 800000
  },
  {
    id: "RISK-103",
    name: "Gotham City Movers",
    state: USState.NY,
    units: 25,
    primary_commodity: Commodity.HAZMAT, // Tricky commodity
    driver_violations: 2,
    annual_revenue: 5000000
  },
  {
    id: "RISK-104",
    name: "Appalachian Timber Co",
    state: USState.NC,
    units: 8,
    primary_commodity: Commodity.LOGGING,
    driver_violations: 4, // High violations
    annual_revenue: 1200000
  }
];