import { useState, useEffect, useCallback } from 'react';
import { SubstanceType } from '../types/substance';
import { getStoredState, saveState, cleanupOldData } from '../utils/storage';

export const useSubstanceTracker = () => {
  const [consumptionData, setConsumptionData] = useState<Record<string, Record<SubstanceType, boolean>>>(
    getStoredState()
  );

  const checkDayChange = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    if (!consumptionData[today]) {
      setConsumptionData(prevState => {
        const newState = {
          ...prevState,
          [today]: {
            caffeine: false,
            alcohol: false,
            nicotine: false,
          },
        };
        saveState(newState);
        return newState;
      });
    }
  }, [consumptionData]);

  useEffect(() => {
    // Initial cleanup of old data
    cleanupOldData();

    // Check for day change
    checkDayChange();

    // Set up intervals for periodic checks
    const dayCheckInterval = setInterval(checkDayChange, 60000); // Every minute
    const cleanupInterval = setInterval(cleanupOldData, 86400000); // Daily cleanup

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkDayChange();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Handle online/offline status
    const handleOnline = () => {
      checkDayChange();
    };
    window.addEventListener('online', handleOnline);

    return () => {
      clearInterval(dayCheckInterval);
      clearInterval(cleanupInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('online', handleOnline);
    };
  }, [checkDayChange]);

  const toggleSubstance = useCallback((dateStr: string, type: SubstanceType) => {
    setConsumptionData(prevState => {
      const newState = {
        ...prevState,
        [dateStr]: {
          ...prevState[dateStr],
          [type]: !prevState[dateStr]?.[type],
        },
      };
      saveState(newState);
      return newState;
    });
  }, []);

  return {
    consumptionData,
    toggleSubstance,
  };
};