import React from 'react';
import { Risk, Commodity, USState } from '../types';

interface RiskFormProps {
  risk: Risk;
  setRisk: (risk: Risk) => void;
  onPresetSelect: (risk: Risk) => void;
  presets: Risk[];
}

export const RiskForm: React.FC<RiskFormProps> = ({ risk, setRisk, onPresetSelect, presets }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRisk({
      ...risk,
      [name]: name === 'units' || name === 'driver_violations' ? parseInt(value) || 0 : value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 h-full">
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Load Example Risk</label>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.id}
              onClick={() => onPresetSelect(p)}
              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-full transition-colors"
            >
              {p.id}
            </button>
          ))}
        </div>
      </div>

      <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">Risk Profile</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
          <input
            type="text"
            name="name"
            value={risk.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
            <select
              name="state"
              value={risk.state}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              {Object.values(USState).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Fleet Size (Units)</label>
            <input
              type="number"
              name="units"
              min="1"
              value={risk.units}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Primary Commodity</label>
          <select
            name="primary_commodity"
            value={risk.primary_commodity}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            {Object.values(Commodity).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
           <label className="block text-sm font-medium text-slate-700 mb-1">Driver Violations (Last 3y)</label>
           <input
              type="number"
              name="driver_violations"
              min="0"
              value={risk.driver_violations}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
        </div>
      </div>
    </div>
  );
};