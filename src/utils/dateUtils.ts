export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatShortDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    day: 'numeric'
  });
};

export const formatMonth = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
};

export const formatWeekday = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'short'
  });
};

export const getMonthDays = (year: number, month: number): Date[] => {
  const dates: Date[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  // Add empty dates for padding at start of month
  const startPadding = firstDay.getDay();
  for (let i = 0; i < startPadding; i++) {
    const paddingDate = new Date(year, month, -startPadding + i + 1);
    dates.push(paddingDate);
  }
  
  // Add all days of the month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    dates.push(new Date(year, month, day));
  }
  
  // Add padding at end to complete the last week
  const endPadding = 42 - dates.length; // 42 = 6 rows * 7 days
  for (let i = 1; i <= endPadding; i++) {
    dates.push(new Date(year, month + 1, i));
  }
  
  return dates;
};

export const formatDateKey = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const isNewDay = (timestamp: string): boolean => {
  const lastDate = new Date(timestamp);
  const currentDate = new Date();
  
  return lastDate.getDate() !== currentDate.getDate() ||
         lastDate.getMonth() !== currentDate.getMonth() ||
         lastDate.getFullYear() !== currentDate.getFullYear();
};