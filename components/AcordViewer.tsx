import React from 'react';
import { AcordPayload, Market } from '../types';
import { FileJson, ClipboardCopy } from 'lucide-react';

interface AcordViewerProps {
  payload: AcordPayload | null;
  selectedMarket: Market | null;
}

export const AcordViewer: React.FC<AcordViewerProps> = ({ payload, selectedMarket }) => {
  if (!payload || !selectedMarket) {
    return (
      <div className="bg-slate-50 rounded-lg border-2 border-dashed border-slate-200 h-full flex flex-col items-center justify-center p-8 text-center">
        <FileJson className="w-12 h-12 text-slate-300 mb-3" />
        <h3 className="text-sm font-semibold text-slate-500">No Submission Generated</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-[200px]">Select an eligible market to generate an ACORD-style JSON submission.</p>
      </div>
    );
  }

  const jsonString = JSON.stringify(payload, null, 2);

  return (
    <div className="bg-slate-900 rounded-lg shadow-lg flex flex-col h-full max-h-[600px] overflow-hidden">
      <div className="bg-slate-800 px-4 py-3 flex justify-between items-center border-b border-slate-700">
        <div className="flex items-center gap-2">
          <FileJson className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-mono text-slate-200">ACORD_Submission.json</span>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[10px] text-slate-400 uppercase tracking-wider">Target: {selectedMarket.name}</span>
           <button className="text-slate-400 hover:text-white transition-colors">
             <ClipboardCopy className="w-4 h-4" />
           </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4 custom-scrollbar">
        <pre className="text-xs font-mono leading-relaxed">
          <code dangerouslySetInnerHTML={{
            __html: jsonString.replace(
              /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
              (match) => {
                let cls = 'text-purple-300';
                if (/^"/.test(match)) {
                  if (/:$/.test(match)) {
                    cls = 'text-blue-300'; // Key
                  } else {
                    cls = 'text-green-300'; // String Value
                  }
                } else if (/true|false/.test(match)) {
                  cls = 'text-red-300'; // Boolean
                } else if (/null/.test(match)) {
                  cls = 'text-gray-400';
                }
                return `<span class="${cls}">${match}</span>`;
              }
            )
          }} />
        </pre>
      </div>
    </div>
  );
};