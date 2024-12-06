import React, { useState } from 'react';
import { formatDate, getMonthDays } from './utils/dateUtils';
import Header from './components/Header';
import SubstanceGrid from './components/SubstanceGrid';
import DatePicker from './components/DatePicker';
import PrivateModeAlert from './components/PrivateModeAlert';
import { useSubstanceTracker } from './hooks/useSubstanceTracker';

function App() {
  const { consumptionData, toggleSubstance } = useSubstanceTracker();
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const dates = getMonthDays(currentDate.getFullYear(), currentDate.getMonth());

  return (
    <div className="min-h-screen p-3 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        <Header />
        <PrivateModeAlert />
        
        <div className="text-center space-y-4">
          <p className="text-xs sm:text-sm text-gray-400 font-medium tracking-wide">
            {formatDate(new Date())}
          </p>
          <DatePicker
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            onToday={handleToday}
          />
        </div>

        <SubstanceGrid
          dates={dates}
          consumptionData={consumptionData}
          onToggle={toggleSubstance}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          currentDate={currentDate}
        />
      </div>
    </div>
  );
}

export default App;