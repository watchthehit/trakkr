import React from 'react';
import { SubstanceType } from '../types/substance';
import { Coffee, Wine, Cigarette, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatShortDate, formatDateKey, formatMonth, formatWeekday } from '../utils/dateUtils';

interface SubstanceGridProps {
  dates: Date[];
  consumptionData: Record<string, Record<SubstanceType, boolean>>;
  onToggle: (date: string, type: SubstanceType) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  currentDate: Date;
}

const icons = {
  caffeine: Coffee,
  alcohol: Wine,
  nicotine: Cigarette
};

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const SubstanceGrid: React.FC<SubstanceGridProps> = ({
  dates,
  consumptionData,
  onToggle,
  onPrevMonth,
  onNextMonth,
  currentDate
}) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-3 sm:p-6 shadow-xl ring-1 ring-white/10">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onPrevMonth}
          className="p-1.5 sm:p-2 hover:bg-gray-700/50 rounded-lg transition-all duration-200 active:scale-95"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
        </button>
        
        <h2 className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300">
          {formatMonth(currentDate)}
        </h2>
        
        <button
          onClick={onNextMonth}
          className="p-1.5 sm:p-2 hover:bg-gray-700/50 rounded-lg transition-all duration-200 active:scale-95"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 sm:gap-3">
        {/* Weekday headers */}
        {WEEKDAYS.map((weekday) => (
          <div key={weekday} className="text-center mb-2">
            <span className="text-[10px] sm:text-xs font-medium text-gray-500 tracking-wider">
              {weekday}
            </span>
          </div>
        ))}

        {/* Calendar grid */}
        {dates.map((date) => {
          const dateStr = formatDateKey(date);
          const isToday = new Date().toDateString() === date.toDateString();
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          
          return (
            <div
              key={dateStr}
              className={`p-1 sm:p-2 rounded-lg transition-all duration-200 ${
                isToday 
                  ? 'bg-blue-900/30 ring-1 ring-blue-400/50' 
                  : isCurrentMonth 
                    ? 'bg-gray-800/50 hover:bg-gray-700/50'
                    : 'bg-gray-800/20'
              }`}
            >
              <div className="text-center mb-1 sm:mb-2">
                <span className={`text-xs sm:text-sm font-medium ${
                  isToday 
                    ? 'text-blue-300' 
                    : isCurrentMonth 
                      ? 'text-gray-300'
                      : 'text-gray-600'
                }`}>
                  {formatShortDate(date)}
                </span>
              </div>
              <div className="space-y-1">
                {(Object.keys(icons) as SubstanceType[]).map((type) => {
                  const consumed = consumptionData[dateStr]?.[type] || false;
                  const Icon = icons[type];
                  
                  return (
                    <button
                      key={type}
                      onClick={() => isCurrentMonth && onToggle(dateStr, type)}
                      className={`w-full p-1 sm:p-1.5 rounded-md transition-all duration-200 ${
                        isCurrentMonth
                          ? consumed
                            ? 'bg-red-500/20 hover:bg-red-500/30'
                            : 'bg-emerald-500/20 hover:bg-emerald-500/30'
                          : 'bg-gray-700/30 cursor-not-allowed'
                      }`}
                      disabled={!isCurrentMonth}
                      title={`${type} - ${consumed ? 'Consumed' : 'Not Consumed'}`}
                    >
                      <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 mx-auto ${
                        isCurrentMonth
                          ? consumed ? 'text-red-400' : 'text-emerald-400'
                          : 'text-gray-600'
                      }`} />
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubstanceGrid;