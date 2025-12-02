import { Risk, Market, AcordPayload } from '../types';

export const generateAcordJson = (risk: Risk, market: Market): AcordPayload => {
  // Simulate a unique Request ID
  const rqUid = `REQ-${Date.now()}-${risk.id.split('-')[1]}`;

  return {
    ACORD: {
      InsuranceSvcRq: {
        RqUID: rqUid,
        CommercialAutoPolicyQuoteInqRq: {
          Producer: {
            ProducerInfo: {
              ProducerName: "Market Matrix Demo Brokerage",
            },
          },
          InsuredOrPrincipal: {
            GeneralPartyInfo: {
              NameInfo: {
                CommlName: {
                  CommercialName: risk.name,
                },
              },
              Addr: {
                StateProvCd: risk.state,
              },
            },
          },
          CommlAutoLineBusiness: {
            NumVehs: risk.units,
            CommlAutoDriverInfo: {
              NumViolations: risk.driver_violations,
            },
            CommodityInfo: {
              CommodityDesc: risk.primary_commodity,
            },
          },
        },
      },
    },
  };
};