import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  onBack,
  rightAction,
}) => {
  return (
    <div className="px-5 pt-3 pb-3 flex items-center justify-between border-b border-slate-50 bg-white">
      <div className="flex items-center space-x-3">
        {onBack && (
          <button
            onClick={onBack}
            className="w-8 h-8 -ml-1 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
            aria-label="Kembali"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}
        <div>
          <h1 className="text-base font-bold text-slate-900 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      {rightAction && <div>{rightAction}</div>}
    </div>
  );
};
