import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, ShoppingCart, Leaf } from "lucide-react";
import {
  SESSION_KEY,
  loadItems,
  loadShopping,
  makeShoppingItem,
  saveShopping,
  type PantryItem,
  type ShoppingItem,
} from "@/lib/pantry";
import { Onboarding } from "@/components/pantry/Onboarding";
import { Dashboard } from "@/components/pantry/Dashboard";
import { ShoppingList } from "@/components/pantry/ShoppingList";

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

type MainTab = "pantry" | "shopping";

function App() {
  const [ready, setReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [items, setItems] = useState<PantryItem[]>([]);
  const [shopping, setShoppingState] = useState<ShoppingItem[]>([]);
  const [tab, setTab] = useState<MainTab>("pantry");

  useEffect(() => {
    const session = window.localStorage.getItem(SESSION_KEY);
    if (session) {
      setSignedIn(true);
      setItems(loadItems());
      setShoppingState(loadShopping());
    }
    setReady(true);
  }, []);

  function setShopping(next: ShoppingItem[]) {
    setShoppingState(next);
    saveShopping(next);
  }

  function addToShopping(item: PantryItem) {
    const existing = shopping.find(
      (s) => s.name.toLowerCase() === item.name.toLowerCase() && s.category === item.category,
    );
    setShopping(
      existing
        ? shopping.map((s) => (s.id === existing.id ? { ...s, qty: s.qty + 1 } : s))
        : [...shopping, makeShoppingItem(item.name, item.category)],
    );
  }

  function signIn() {
    setAuthenticating(true);
    window.setTimeout(() => {
      window.localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ name: "Demo User", signedInAt: Date.now() }),
      );
      setItems(loadItems());
      setShoppingState(loadShopping());
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
          <>
            {tab === "pantry" ? (
              <Dashboard
                items={items}
                setItems={setItems}
                onSignOut={signOut}
                onAddToShopping={addToShopping}
              />
            ) : (
              <ShoppingList items={shopping} setItems={setShopping} />
            )}

            <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[480px] border-t border-border bg-card/95 px-4 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur">
              <div className="flex">
                {(
                  [
                    { id: "pantry", label: "Pantry", Icon: Leaf },
                    { id: "shopping", label: "Shopping List", Icon: ShoppingCart },
                  ] as const
                ).map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    onClick={() => setTab(id)}
                    className={`flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 text-[0.7rem] font-semibold transition ${
                      tab === id ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {label}
                  </button>
                ))}
              </div>
            </nav>
          </>
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
