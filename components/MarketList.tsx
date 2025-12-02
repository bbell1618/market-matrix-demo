import React from 'react';
import { MatchResult, Market } from '../types';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface MarketListProps {
  results: MatchResult[];
  onSelect: (market: Market) => void;
  selectedId: string | null;
}

export const MarketList: React.FC<MarketListProps> = ({ results, onSelect, selectedId }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col h-full max-h-[600px]">
      <div className="p-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Market Matrix Results</h2>
        <p className="text-xs text-slate-500 mt-1">{results.filter(r => r.is_eligible).length} eligible markets found</p>
      </div>
      
      <div className="overflow-y-auto p-4 space-y-3 flex-1">
        {results.map((result) => {
          const { market, is_eligible, score, reasons } = result;
          const isSelected = selectedId === market.id;

          return (
            <div 
              key={market.id}
              onClick={() => is_eligible && onSelect(market)}
              className={`
                relative border rounded-lg p-4 transition-all duration-200 cursor-pointer
                ${!is_eligible ? 'opacity-60 bg-slate-50 border-slate-200 cursor-not-allowed' : 
                  isSelected ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-200 hover:border-blue-300 hover:shadow-sm bg-white'}
              `}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${market.logo_color}`}>
                    {market.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{market.name}</h3>
                    <div className="flex gap-1 mt-1">
                      {market.appetite_tags.map(tag => (
                        <span key={tag} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded uppercase tracking-wide">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {is_eligible ? (
                   <div className="flex flex-col items-end">
                      <span className={`text-lg font-bold ${score >= 80 ? 'text-green-600' : 'text-yellow-600'}`}>
                        {score}%
                      </span>
                   </div>
                ) : (
                   <XCircle className="text-red-400 w-5 h-5" />
                )}
              </div>

              {/* Reasons/Debug info */}
              <div className="mt-3 space-y-1">
                {reasons.slice(0, 3).map((reason, idx) => (
                   <div key={idx} className="flex items-start gap-2 text-xs">
                     {is_eligible ? (
                       <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                     ) : (
                       <AlertCircle className="w-3 h-3 text-red-500 mt-0.5 shrink-0" />
                     )}
                     <span className={is_eligible ? "text-slate-600" : "text-red-700"}>{reason}</span>
                   </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};