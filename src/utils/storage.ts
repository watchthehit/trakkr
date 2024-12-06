import { SubstanceType } from '../types/substance';

const STORAGE_KEY = 'substance-tracker';
const VERSION_KEY = 'substance-tracker-version';
const CURRENT_VERSION = '1.0';

interface StorageData {
  version: string;
  lastUpdated: string;
  data: Record<string, Record<SubstanceType, boolean>>;
}

// In-memory fallback storage for private/incognito mode
let memoryStorage: StorageData | null = null;

// Check if localStorage is available
const isLocalStorageAvailable = (): boolean => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

const validateData = (data: any): boolean => {
  if (!data || typeof data !== 'object') return false;
  if (!data.version || !data.lastUpdated || !data.data) return false;
  
  // Validate each day's data
  for (const date in data.data) {
    const substances = data.data[date];
    if (!substances || typeof substances !== 'object') return false;
    if (!('caffeine' in substances && 'alcohol' in substances && 'nicotine' in substances)) return false;
  }
  
  return true;
};

const getDefaultState = () => {
  const today = new Date().toISOString().split('T')[0];
  return {
    version: CURRENT_VERSION,
    lastUpdated: new Date().toISOString(),
    data: {
      [today]: {
        caffeine: false,
        alcohol: false,
        nicotine: false,
      },
    },
  };
};

export const isPrivateMode = !isLocalStorageAvailable();

export const getStoredState = (): Record<string, Record<SubstanceType, boolean>> => {
  try {
    if (isPrivateMode) {
      if (!memoryStorage) {
        memoryStorage = getDefaultState();
      }
      return memoryStorage.data;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) throw new Error('No stored data found');

    const parsedData: StorageData = JSON.parse(stored);
    
    if (!validateData(parsedData)) {
      throw new Error('Invalid stored data format');
    }

    // Handle version migrations if needed
    if (parsedData.version !== CURRENT_VERSION) {
      parsedData.version = CURRENT_VERSION;
    }

    // Update last accessed timestamp
    parsedData.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedData));

    return parsedData.data;
  } catch (error) {
    console.warn('Error loading stored data:', error);
    const defaultState = getDefaultState();
    
    if (isPrivateMode) {
      memoryStorage = defaultState;
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
    }
    
    return defaultState.data;
  }
};

export const saveState = (state: Record<string, Record<SubstanceType, boolean>>): void => {
  try {
    const storageData: StorageData = {
      version: CURRENT_VERSION,
      lastUpdated: new Date().toISOString(),
      data: state,
    };
    
    if (isPrivateMode) {
      memoryStorage = storageData;
      return;
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
    
    // Verify the save was successful
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) throw new Error('Save verification failed');
    
    const parsedSavedData = JSON.parse(savedData);
    if (!validateData(parsedSavedData)) {
      throw new Error('Saved data validation failed');
    }
  } catch (error) {
    console.error('Error saving state:', error);
    // Attempt to save again with only today's data if there's an error
    const today = new Date().toISOString().split('T')[0];
    const fallbackState = {
      version: CURRENT_VERSION,
      lastUpdated: new Date().toISOString(),
      data: {
        [today]: {
          caffeine: false,
          alcohol: false,
          nicotine: false,
        },
      },
    };
    
    if (isPrivateMode) {
      memoryStorage = fallbackState;
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fallbackState));
    }
  }
};

// Add a cleanup function to remove old data (older than 1 year)
export const cleanupOldData = (): void => {
  try {
    let data: StorageData;
    
    if (isPrivateMode) {
      if (!memoryStorage) return;
      data = memoryStorage;
    } else {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      data = JSON.parse(stored);
    }

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const filteredData = Object.entries(data.data).reduce((acc, [date, data]) => {
      if (new Date(date) >= oneYearAgo) {
        acc[date] = data;
      }
      return acc;
    }, {} as Record<string, Record<SubstanceType, boolean>>);

    saveState(filteredData);
  } catch (error) {
    console.error('Error cleaning up old data:', error);
  }
};