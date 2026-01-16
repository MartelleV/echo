// src/components/Toast.tsx
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const accentColor = type === 'success' ? 'bg-emerald-500' : 'bg-red-400';
  const textColor = type === 'success' ? 'text-emerald-400' : 'text-red-400';

  return (
    <div
      className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-sm bg-[--bg-elevated] border border-[--border-subtle] px-5 py-4 rounded-2xl shadow-2xl animate-slide-up z-50"
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-4">
        {/* Status indicator */}
        <div className={`w-2 h-2 rounded-full ${accentColor} mt-1.5 shrink-0`}></div>

        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${textColor}`}>
            {type === 'success' ? 'Success' : 'Error'}
          </p>
          <p className="text-sm text-[--text-secondary] mt-0.5">{message}</p>
        </div>

        <button
          onClick={onClose}
          className="text-[--text-faint] hover:text-[--text-muted] transition-colors focus:outline-none shrink-0"
          aria-label="Dismiss notification"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
