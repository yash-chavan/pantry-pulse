import { X } from "lucide-react";
import type { ReactNode } from "react";

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-[480px] animate-in slide-in-from-bottom-6 duration-300">
        <div className="max-h-[88vh] overflow-y-auto rounded-t-[28px] bg-card px-5 pb-8 pt-4 shadow-2xl">
          <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-border" />
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-lg font-bold tracking-tight text-foreground">{title}</h2>
            <button
              onClick={onClose}
              aria-label="Close"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground transition active:scale-95"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
