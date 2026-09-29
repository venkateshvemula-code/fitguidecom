import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export default function ToastContainer() {
  const { toasts } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div class="fixed bottom-6 left-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map(toast => {
        let border = 'border-emerald-500/40 bg-slate-900/95 text-slate-100';
        let icon = <CheckCircle2 size={16} class="text-emerald-400 shrink-0" />;

        if (toast.type === 'warning') {
          border = 'border-amber-500/40 bg-slate-900/95 text-slate-100';
          icon = <AlertTriangle size={16} class="text-amber-400 shrink-0" />;
        } else if (toast.type === 'info') {
          border = 'border-teal-500/40 bg-slate-900/95 text-slate-100';
          icon = <Info size={16} class="text-teal-400 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            class={`px-4 py-3 rounded-xl border ${border} shadow-2xl backdrop-blur-md text-xs font-medium flex items-center gap-2.5 animate-in slide-in-from-left duration-200 pointer-events-auto`}
          >
            {icon}
            <span>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
}
