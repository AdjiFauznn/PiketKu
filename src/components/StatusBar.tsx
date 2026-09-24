import React from 'react';
import { Wifi, Battery } from 'lucide-react';

interface StatusBarProps {
  time?: string;
  theme?: 'dark' | 'light';
}

export const StatusBar: React.FC<StatusBarProps> = ({
  time = '07:30',
  theme = 'light',
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={`w-full px-7 pt-3 pb-1 flex items-center justify-between text-xs font-semibold select-none ${
        isDark ? 'text-white' : 'text-slate-900'
      }`}
    >
      {/* Time */}
      <span className="font-semibold tracking-tight">{time}</span>

      {/* Dynamic Island / Speaker Pill indicator on iPhone */}
      <div className="w-20 h-4 rounded-full bg-black/90 mx-auto hidden sm:block shadow-sm" />

      {/* Status Icons */}
      <div className="flex items-center space-x-1.5">
        {/* Cellular signal bars */}
        <div className="flex items-end space-x-0.5 h-2.5">
          <div className={`w-0.5 h-1 rounded-xs ${isDark ? 'bg-white' : 'bg-slate-900'}`} />
          <div className={`w-0.5 h-1.5 rounded-xs ${isDark ? 'bg-white' : 'bg-slate-900'}`} />
          <div className={`w-0.5 h-2 rounded-xs ${isDark ? 'bg-white' : 'bg-slate-900'}`} />
          <div className={`w-0.5 h-2.5 rounded-xs ${isDark ? 'bg-white' : 'bg-slate-900'}`} />
        </div>

        {/* Wifi */}
        <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />

        {/* Battery */}
        <div className="flex items-center">
          <div
            className={`w-5 h-2.5 rounded-sm border px-0.5 flex items-center ${
              isDark ? 'border-white' : 'border-slate-900'
            }`}
          >
            <div
              className={`h-1.5 w-full rounded-xs ${
                isDark ? 'bg-white' : 'bg-slate-900'
              }`}
            />
          </div>
          <div
            className={`w-0.5 h-1 rounded-r-xs ${
              isDark ? 'bg-white' : 'bg-slate-900'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
