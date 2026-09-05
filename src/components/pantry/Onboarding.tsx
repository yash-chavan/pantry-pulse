import { Leaf, Sparkles } from "lucide-react";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.94-2.92l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.28v3.1A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.29 14.28a7.2 7.2 0 0 1 0-4.56v-3.1H1.28a12 12 0 0 0 0 10.76l4.01-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.18 15.23 0 12 0A12 12 0 0 0 1.28 6.62l4.01 3.1C6.23 6.86 8.88 4.75 12 4.75z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M16.36 12.78c.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.71-3.19-1.73-1.36-.14-2.65.8-3.34.8-.69 0-1.75-.78-2.88-.76-1.48.02-2.85.86-3.61 2.19-1.54 2.67-.39 6.62 1.11 8.79.73 1.06 1.6 2.25 2.75 2.21 1.1-.05 1.52-.71 2.85-.71s1.71.71 2.88.69c1.19-.02 1.94-1.08 2.67-2.15.84-1.23 1.19-2.42 1.21-2.48-.03-.01-2.32-.89-2.33-3.54zM14.2 5.36c.6-.74 1.01-1.75.9-2.77-.87.04-1.93.58-2.56 1.31-.56.65-1.05 1.69-.92 2.68.97.08 1.96-.49 2.58-1.22z" />
    </svg>
  );
}

export function Onboarding({ onSignIn }: { onSignIn: () => void }) {
  return (
    <div className="app-gradient flex min-h-screen flex-col justify-between px-6 pb-10 pt-16">
      <div>
        <div className="flex items-center gap-2 text-sm font-semibold tracking-tight text-primary">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <Leaf className="h-5 w-5" />
          </span>
          PantryPulse
        </div>

        <h1 className="mt-14 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-foreground">
          Never waste
          <br />
          good food again.
        </h1>
        <p className="mt-4 max-w-[19rem] text-[0.95rem] leading-relaxed text-muted-foreground">
          Track what's in your pantry, cook what's about to turn, and dispose of the rest
          responsibly.
        </p>

        <div className="mt-10 space-y-3">
          {[
            "Freshness countdown on every item",
            "AI label scan to add in seconds",
            "Rescue recipes from expiring food",
          ].map((line) => (
            <div key={line} className="flex items-center gap-3 text-sm text-secondary-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              {line}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={onSignIn}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-[0.95rem] font-semibold text-foreground shadow-sm transition active:scale-[0.98]"
        >
          <GoogleIcon />
          Continue with Google
        </button>
        <button
          onClick={onSignIn}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-foreground px-5 py-4 text-[0.95rem] font-semibold text-background transition active:scale-[0.98]"
        >
          <AppleIcon />
          Continue with Apple
        </button>
        <p className="pt-2 text-center text-xs text-muted-foreground">
          Demo experience — no real account is created.
        </p>
      </div>
    </div>
  );
}
