// ToastContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type ToastType = 'success' | 'failure';

export interface Toast {
  id: string;
  title: string;
  type: ToastType;
  description?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id'>) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = uuidv4();
    const duration = toast.duration ?? 15000;

    setToasts(prev => [...prev, { ...toast, id, duration }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
};


// ToastContainer.tsx
import React from 'react';
import { createPortal } from 'react-dom';
import { useToast } from './ToastContext';
import { X } from 'lucide-react'; // You can replace with any icon

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useToast();

  return createPortal(
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`max-w-sm w-96 rounded-xl shadow-lg p-4 border-l-4 bg-white 
            ${toast.type === 'success' ? 'border-green-500' : 'border-red-500'}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-gray-800">{toast.title}</h4>
              {toast.description && (
                <p className="text-sm text-gray-600 mt-1">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-gray-500 hover:text-black ml-2"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>,
    document.body
  );
};
