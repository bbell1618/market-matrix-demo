import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { MOCK_MARKETS, MOCK_RISKS } from '../constants';
import { Commodity, USState } from '../types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export const Dashboard: React.FC = () => {
  // 1. Data Prep: Markets per Commodity
  const commodityData = Object.values(Commodity).map((c) => ({
    name: c.split(' ')[0], // Shorten name
    count: MOCK_MARKETS.filter(m => m.allowed_commodities.includes(c)).length
  }));

  // 2. Data Prep: Markets per State
  const stateData = Object.values(USState).map((s) => ({
    name: s,
    count: MOCK_MARKETS.filter(m => m.allowed_states.includes(s)).length
  }));

  // 3. Stats
  const totalMarkets = MOCK_MARKETS.length;
  const avgMaxUnits = Math.round(MOCK_MARKETS.reduce((acc, m) => acc + m.max_units, 0) / totalMarkets);
  const strictMarkets = MOCK_MARKETS.filter(m => m.max_driver_violations === 0).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-500 uppercase">Active Markets</h3>
          <p className="text-3xl font-bold text-slate-800 mt-2">{totalMarkets}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-500 uppercase">Avg Fleet Capacity</h3>
          <p className="text-3xl font-bold text-slate-800 mt-2">{avgMaxUnits} <span className="text-sm font-normal text-slate-400">units</span></p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-500 uppercase">Zero-Tolerance Markets</h3>
          <p className="text-3xl font-bold text-slate-800 mt-2">{strictMarkets}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commodity Appetite Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 h-96">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Market Appetite by Commodity</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={commodityData} margin={{ bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" />
              <YAxis />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                cursor={{ fill: '#f1f5f9' }}
              />
              <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Geographic Appetite Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 h-96">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Market Coverage by State</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stateData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ fill: '#f1f5f9' }}
              />
              <Bar dataKey="count" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};