import React from 'react';
import { useToast } from '../../hooks/useToast';
import { AlertTriangle, CheckCircle, Info, XCircle, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-2 sm:px-0">
      {toasts.map((t) => {
        let borderClass = 'border-sky-blue';
        let bgIcon = <Info className="w-5 h-5 text-sky-blue shrink-0" />;

        if (t.type === 'success') {
          borderClass = 'border-l-4 border-growth';
          bgIcon = <CheckCircle className="w-5 h-5 text-growth shrink-0" />;
        } else if (t.type === 'warning') {
          borderClass = 'border-l-4 border-warning-amber';
          bgIcon = <AlertTriangle className="w-5 h-5 text-warning-amber shrink-0" />;
        } else if (t.type === 'danger' || t.type === 'error') {
          borderClass = 'border-l-4 border-danger-red';
          bgIcon = <XCircle className="w-5 h-5 text-danger-red shrink-0" />;
        }

        return (
          <div
            key={t.id}
            className={`pointer-events-auto bg-white rounded-lg p-3.5 shadow-lg border border-soil-dark/10 ${borderClass} flex items-start gap-3 animate-fade-in transition-all`}
          >
            {bgIcon}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-soil-dark tracking-wide uppercase">
                {t.title}
              </h4>
              <p className="text-xs text-soil-dark/80 mt-0.5 leading-relaxed break-words">
                {t.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-soil-dark/40 hover:text-soil-dark p-1 rounded transition-colors"
              aria-label="Dismiss alert"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
