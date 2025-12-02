import React, { useState, useEffect } from 'react';
import { MOCK_MARKETS, MOCK_RISKS } from './constants';
import { Risk, Market, MatchResult, AcordPayload } from './types';
import { matchRiskToMarkets } from './services/matcherService';
import { generateAcordJson } from './services/acordService';
import { Dashboard } from './components/Dashboard';
import { RiskForm } from './components/RiskForm';
import { MarketList } from './components/MarketList';
import { AcordViewer } from './components/AcordViewer';
import { LayoutDashboard, GitGraph, FileCode, Truck } from 'lucide-react';

enum Tab {
  DASHBOARD = 'Dashboard',
  MATCHER = 'Matcher',
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);
  
  // State for the Matcher Module
  const [currentRisk, setCurrentRisk] = useState<Risk>(MOCK_RISKS[0]);
  const [matchResults, setMatchResults] = useState<MatchResult[]>([]);
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [acordPayload, setAcordPayload] = useState<AcordPayload | null>(null);

  // Run matching logic whenever risk changes
  useEffect(() => {
    const results = matchRiskToMarkets(currentRisk, MOCK_MARKETS);
    setMatchResults(results);
    
    // Auto-select best match if current selection is invalid
    const isCurrentValid = selectedMarket && results.find(r => r.market.id === selectedMarket.id)?.is_eligible;
    
    if (!isCurrentValid) {
       // Try to find the first eligible one
       const best = results.find(r => r.is_eligible);
       setSelectedMarket(best ? best.market : null);
    }
  }, [currentRisk, selectedMarket]);

  // Generate ACORD payload when market or risk changes
  useEffect(() => {
    if (selectedMarket) {
      setAcordPayload(generateAcordJson(currentRisk, selectedMarket));
    } else {
      setAcordPayload(null);
    }
  }, [currentRisk, selectedMarket]);

  const handleMarketSelect = (market: Market) => {
    setSelectedMarket(market);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">Market Matrix <span className="text-slate-400 font-normal">Demo</span></h1>
            </div>
            <nav className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab(Tab.DASHBOARD)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === Tab.DASHBOARD 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Market Exploration
              </button>
              <button
                onClick={() => setActiveTab(Tab.MATCHER)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === Tab.MATCHER 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <GitGraph className="w-4 h-4" />
                Risk Matcher
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === Tab.DASHBOARD ? (
          <Dashboard />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)] min-h-[600px]">
            {/* Left Column: Input */}
            <div className="lg:col-span-3">
              <RiskForm 
                risk={currentRisk} 
                setRisk={setCurrentRisk} 
                presets={MOCK_RISKS}
                onPresetSelect={(preset) => setCurrentRisk({...preset})}
              />
            </div>
            
            {/* Middle Column: Results */}
            <div className="lg:col-span-4">
              <MarketList 
                results={matchResults} 
                onSelect={handleMarketSelect} 
                selectedId={selectedMarket?.id || null} 
              />
            </div>

            {/* Right Column: JSON Output */}
            <div className="lg:col-span-5">
              <AcordViewer 
                payload={acordPayload} 
                selectedMarket={selectedMarket} 
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;