import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { isPrivateMode } from '../utils/storage';

const PrivateModeAlert: React.FC = () => {
  if (!isPrivateMode) return null;

  return (
    <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h3 className="font-medium text-yellow-300">Private Browsing Detected</h3>
          <p className="text-sm text-yellow-200/70">
            You're in private/incognito mode. Your data will only be stored temporarily and will be lost when you close this window.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivateModeAlert;