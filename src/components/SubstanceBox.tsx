import React from 'react';
import { SubstanceType } from '../types/substance';
import { Coffee, Wine, Cigarette } from 'lucide-react';

interface SubstanceBoxProps {
  type: SubstanceType;
  consumed: boolean;
  onClick: () => void;
}

const icons = {
  caffeine: Coffee,
  alcohol: Wine,
  nicotine: Cigarette
};

const SubstanceBox: React.FC<SubstanceBoxProps> = ({ type, consumed, onClick }) => {
  const Icon = icons[type];
  
  return (
    <button
      onClick={onClick}
      className={`
        p-6 rounded-lg shadow-lg transition-all duration-300
        flex flex-col items-center justify-center gap-4
        ${consumed ? 'bg-red-100 hover:bg-red-200' : 'bg-green-100 hover:bg-green-200'}
        transform hover:scale-105
      `}
    >
      <Icon className={`w-8 h-8 ${consumed ? 'text-red-600' : 'text-green-600'}`} />
      <span className="font-medium capitalize">{type}</span>
      <span className="text-sm">{consumed ? 'Consumed' : 'Not Consumed'}</span>
    </button>
  );
};

export default SubstanceBox;