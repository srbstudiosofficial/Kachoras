import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  Trash2,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  RotateCcw,
  Link as LinkIcon,
  FileText
} from 'lucide-react';

/** Visual styling tokens keyed by dialog/toast tone so variants share one code path. */
const TONE_STYLES = {
  danger: {
    bar: 'bg-[#B3261E]',
    iconWrap: 'bg-red-50 text-[#B3261E] border border-red-200',
    primaryBtn: 'bg-[#B3261E] hover:bg-[#961F18] text-white shadow-sm',
    toastBorder: 'border-red-200',
    Icon: Trash2
  },
  warning: {
    bar: 'bg-[#C59B27]',
    iconWrap: 'bg-amber-50 text-amber-700 border border-amber-200',
    primaryBtn: 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm',
    toastBorder: 'border-amber-200',
    Icon: AlertTriangle
  },
  success: {
    bar: 'bg-emerald-600',
    iconWrap: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    primaryBtn: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm',
    toastBorder: 'border-emerald-200',
    Icon: CheckCircle2
  },
  info: {
    bar: 'bg-[#14171F]',
    iconWrap: 'bg-[#14171F]/5 text-[#14171F] border border-[#E2E8F0]',
    primaryBtn: 'bg-[#14171F] hover:bg-slate-900 text-white shadow-sm',
    toastBorder: 'border-[#E2E8F0]',
    Icon: ShieldCheck
  }
};

const ICON_OVERRIDES = {
  reset: RotateCcw,
  link: LinkIcon,
  json: FileText,
  alert: AlertCircle
};

/**
 * Provides promise-based custom confirmation/prompt modals and toast
 * notifications styled to match the Owner Portal theme, replacing native
 * browser window.confirm / window.prompt / alert dialogs.
 */
export function usePortalFeedback() {
  const [dialogState, setDialogState] = useState(null);
  const [promptInput, setPromptInput] = useState('');
  const [toasts, setToasts] = useState([]);

  const resolverRef = useRef(null);
  const toastTimersRef = useRef(new Map());

  const resolvePending = useCallback((value) => {
    const resolve = resolverRef.current;
    resolverRef.current = null;
    setDialogState(null);
    if (resolve) resolve(value);
  }, []);

  const dismissToast = useCallback((id) => {
    const timer = toastTimersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      toastTimersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const showToast = useCallback((tone, title, message, durationMs = 4600) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev.slice(-3), { id, tone, title, message }]);

    const timer = setTimeout(() => {
      toastTimersRef.current.delete(id);
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, durationMs);
    toastTimersRef.current.set(id, timer);
  }, []);

  const toast = useRef({
    success: (title, message) => showToast('success', title, message),
    error: (title, message) => showToast('error', title, message, 6000),
    warning: (title, message) => showToast('warning', title, message, 5200),
    info: (title, message) => showToast('info', title, message)
  });

  // Keep toast wrapper synced with stable showToast callback.
  toast.current.success = (title, message) => showToast('success', title, message);
  toast.current.error = (title, message) => showToast('danger', title, message, 6000);
  toast.current.warning = (title, message) => showToast('warning', title, message, 5200);
  toast.current.info = (title, message) => showToast('info', title, message);

  const confirmAction = useCallback((options) => {
    if (resolverRef.current) {
      resolverRef.current(false);
    }
    return new Promise((resolve) => {
      resolverRef.current = resolve;
      setDialogState({
        kind: 'confirm',
        tone: 'danger',
        eyebrow: 'Owner Portal Confirmation',
        cancelLabel: 'Cancel',
        confirmLabel: 'Confirm',
        ...options
      });
    });
  }, []);

  const promptAction = useCallback((options) => {
    if (resolverRef.current) {
      resolverRef.current(null);
    }
    return new Promise((resolve) => {
      resolverRef.current = resolve;
      setPromptInput(options.defaultValue || '');
      setDialogState({
        kind: 'prompt',
        tone: 'info',
        eyebrow: 'Owner Portal Input',
        cancelLabel: 'Cancel',
        confirmLabel: 'Apply',
        multiline: false,
        placeholder: '',
        ...options
      });
    });
  }, []);

  // Close active modal cleanly when user presses Escape.
  useEffect(() => {
    if (!dialogState) return undefined;
    const cancelVal = dialogState.kind === 'prompt' ? null : false;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        resolvePending(cancelVal);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dialogState, resolvePending]);

  // Clean up timers and unresolved promises on unmount.
  useEffect(() => {
    const timers = toastTimersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
      if (resolverRef.current) {
        resolverRef.current(false);
        resolverRef.current = null;
      }
    };
  }, []);

  const PortalFeedbackUI = (
    <>
      {dialogState && (
        <PortalDialogModal
          dialog={dialogState}
          promptInput={promptInput}
          onPromptChange={setPromptInput}
          onCancel={() => resolvePending(dialogState.kind === 'prompt' ? null : false)}
          onConfirm={() => {
            if (dialogState.kind === 'prompt') {
              resolvePending(promptInput);
            } else {
              resolvePending(true);
            }
          }}
        />
      )}

      {toasts.length > 0 && (
        <div
          className="fixed top-5 right-5 z-[130] flex flex-col gap-2.5 w-[calc(100vw-2rem)] max-w-sm pointer-events-none"
          aria-live="polite"
        >
          {toasts.map((item) => {
            const style = TONE_STYLES[item.tone] || TONE_STYLES.info;
            const ToastIcon = item.tone === 'danger' ? AlertCircle : style.Icon;

            return (
              <div
                key={item.id}
                role="status"
                className={`pointer-events-auto bg-white rounded-2xl border ${style.toastBorder} shadow-2xl overflow-hidden transition-all`}
              >
                <div className={`h-1 w-full ${style.bar}`} />
                <div className="p-3.5 sm:p-4 flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${style.iconWrap}`}>
                    <ToastIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h6 className="text-xs font-bold font-display text-[#14171F]">
                      {item.title}
                    </h6>
                    {item.message && (
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed break-words">
                        {item.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => dismissToast(item.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer shrink-0"
                    aria-label="Dismiss notification"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );

  return {
    confirmAction,
    promptAction,
    toast: toast.current,
    PortalFeedbackUI
  };
}

function PortalDialogModal({ dialog, promptInput, onPromptChange, onCancel, onConfirm }) {
  const style = TONE_STYLES[dialog.tone] || TONE_STYLES.danger;
  const DialogIcon = ICON_OVERRIDES[dialog.icon] || style.Icon;
  const isPrompt = dialog.kind === 'prompt';

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <div
      className="fixed inset-0 z-[120] bg-[#14171F]/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => {
        e.stopPropagation();
        onCancel();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="portal-dialog-title"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl overflow-hidden"
      >
        <div className={`h-1.5 w-full ${style.bar}`} />

        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3.5">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${style.iconWrap}`}>
                <DialogIcon className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="inline-block text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  {dialog.eyebrow}
                </span>
                <h4 id="portal-dialog-title" className="text-base sm:text-lg font-bold font-display text-[#14171F] leading-snug">
                  {dialog.title}
                </h4>
              </div>
            </div>

            <button
              type="button"
              onClick={onCancel}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition cursor-pointer shrink-0"
              aria-label="Close confirmation dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {dialog.message}
          </p>

          {(dialog.subjectTitle || dialog.subjectMeta) && (
            <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
              {dialog.subjectTitle && (
                <div className="text-xs sm:text-sm font-bold text-[#14171F] truncate">
                  {dialog.subjectTitle}
                </div>
              )}
              {dialog.subjectMeta && (
                <div className="text-[11px] font-mono text-slate-500 truncate">
                  {dialog.subjectMeta}
                </div>
              )}
            </div>
          )}

          {isPrompt && (
            dialog.multiline ? (
              <textarea
                rows={5}
                value={promptInput}
                onChange={(e) => onPromptChange(e.target.value)}
                placeholder={dialog.placeholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white text-xs font-mono text-slate-800 focus:border-[#B3261E] focus:ring-1 focus:ring-[#B3261E] outline-none resize-y"
                autoFocus
              />
            ) : (
              <input
                type="text"
                value={promptInput}
                onChange={(e) => onPromptChange(e.target.value)}
                placeholder={dialog.placeholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white text-xs sm:text-sm text-slate-800 focus:border-[#B3261E] focus:ring-1 focus:ring-[#B3261E] outline-none"
                autoFocus
              />
            )
          )}
        </div>

        <div className="px-5 sm:px-6 py-3.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition cursor-pointer"
          >
            {dialog.cancelLabel}
          </button>
          <button
            type="submit"
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${style.primaryBtn}`}
          >
            {dialog.confirmLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
