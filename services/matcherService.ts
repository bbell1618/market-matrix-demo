import { Market, Risk, MatchResult } from '../types';

export const matchRiskToMarkets = (risk: Risk, markets: Market[]): MatchResult[] => {
  return markets.map((market) => {
    const reasons: string[] = [];
    let isEligible = true;
    let score = 100;

    // 1. State Eligibility
    if (!market.allowed_states.includes(risk.state)) {
      isEligible = false;
      score = 0;
      reasons.push(`State ${risk.state} not in appetite (Allowed: ${market.allowed_states.join(', ')})`);
    }

    // 2. Unit Count Eligibility
    if (risk.units < market.min_units || risk.units > market.max_units) {
      isEligible = false;
      score = 0;
      reasons.push(`Fleet size ${risk.units} outside range [${market.min_units}-${market.max_units}]`);
    }

    // 3. Commodity Eligibility
    if (!market.allowed_commodities.includes(risk.primary_commodity)) {
      isEligible = false;
      score = 0;
      reasons.push(`Commodity '${risk.primary_commodity}' excluded`);
    }

    // 4. Violations Eligibility
    if (risk.driver_violations > market.max_driver_violations) {
      isEligible = false;
      score = 0;
      reasons.push(`Violations (${risk.driver_violations}) exceed max allowed (${market.max_driver_violations})`);
    }

    // Scoring Logic (if eligible)
    if (isEligible) {
      // Bonus for being well within unit range (preferred sweet spot)
      const range = market.max_units - market.min_units;
      const midPoint = market.min_units + (range / 2);
      const distFromMid = Math.abs(risk.units - midPoint);
      
      // Minor penalty for being on the edges of unit appetite
      if (distFromMid > range * 0.4) {
        score -= 10;
        reasons.push("Edge of fleet size appetite");
      } else {
        reasons.push("Perfect fleet size match");
      }

      // Bonus for preferred tags
      if (market.appetite_tags.includes("Preferred") && risk.driver_violations === 0) {
        reasons.push("Clean record preferred bonus");
      }
      
      // Penalty for high violations even if allowed
      if (risk.driver_violations > 0 && market.max_driver_violations > 0) {
        const violationRatio = risk.driver_violations / market.max_driver_violations;
        if (violationRatio > 0.5) {
            score -= 15;
            reasons.push("Approaching violation limit");
        }
      }
    }

    return {
      market,
      is_eligible: isEligible,
      score: Math.max(0, score),
      reasons
    };
  }).sort((a, b) => b.score - a.score); // Sort by best match
};