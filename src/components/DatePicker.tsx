import React from 'react';
import { Calendar } from 'lucide-react';

interface DatePickerProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onToday: () => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ currentDate, onDateChange, onToday }) => {
  const months = Array.from({ length: 12 }, (_, i) => 
    new Date(2024, i).toLocaleString('default', { month: 'long' })
  );
  
  const years = Array.from({ length: 5 }, (_, i) => 
    new Date().getFullYear() - 2 + i
  );

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(parseInt(e.target.value));
    onDateChange(newDate);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(parseInt(e.target.value));
    onDateChange(newDate);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
      <select
        value={currentDate.getMonth()}
        onChange={handleMonthChange}
        className="bg-gray-700/50 text-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      >
        {months.map((month, index) => (
          <option key={month} value={index}>{month}</option>
        ))}
      </select>

      <select
        value={currentDate.getFullYear()}
        onChange={handleYearChange}
        className="bg-gray-700/50 text-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      >
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>

      <button
        onClick={onToday}
        className="flex items-center gap-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-3 py-1.5 rounded-lg text-sm transition-all duration-200"
      >
        <Calendar className="w-4 h-4" />
        <span>Today</span>
      </button>
    </div>
  );
};

export default DatePicker;