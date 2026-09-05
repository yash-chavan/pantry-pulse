import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { SESSION_KEY, loadItems, type PantryItem } from "@/lib/pantry";
import { Onboarding } from "@/components/pantry/Onboarding";
import { Dashboard } from "@/components/pantry/Dashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PantryPulse — Never waste good food again" },
      {
        name: "description",
        content:
          "PantryPulse tracks pantry freshness, suggests rescue recipes for expiring food, and guides responsible disposal.",
      },
      { property: "og:title", content: "PantryPulse — Never waste good food again" },
      {
        property: "og:description",
        content:
          "Track pantry freshness, cook what's about to turn, and cut household food waste.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: App,
});

function App() {
  const [ready, setReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [items, setItems] = useState<PantryItem[]>([]);

  useEffect(() => {
    const session = window.localStorage.getItem(SESSION_KEY);
    if (session) {
      setSignedIn(true);
      setItems(loadItems());
    }
    setReady(true);
  }, []);

  function signIn() {
    setAuthenticating(true);
    window.setTimeout(() => {
      window.localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ name: "Demo User", signedInAt: Date.now() }),
      );
      setItems(loadItems());
      setSignedIn(true);
      setAuthenticating(false);
    }, 800);
  }

  function signOut() {
    window.localStorage.removeItem(SESSION_KEY);
    setSignedIn(false);
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-[480px] bg-background shadow-sm">
      {ready &&
        (signedIn ? (
          <Dashboard items={items} setItems={setItems} onSignOut={signOut} />
        ) : (
          <Onboarding onSignIn={signIn} />
        ))}

      {authenticating && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-background/85 backdrop-blur-sm">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
          <p className="text-sm font-semibold text-foreground">Authenticating...</p>
        </div>
      )}
    </main>
  );
}
