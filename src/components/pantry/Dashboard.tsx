import { useMemo, useState } from "react";
import { ChefHat, Leaf, LogOut, Plus, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { freshnessOf, saveItems, type PantryItem } from "@/lib/pantry";
import { ItemCard } from "./ItemCard";
import { AddItemModal } from "./AddItemModal";
import { RecipeModal } from "./RecipeModal";

type Tab = "urgent" | "all" | "expired";

const TABS: { id: Tab; label: string }[] = [
  { id: "urgent", label: "Use First" },
  { id: "all", label: "All Pantry" },
  { id: "expired", label: "Expired" },
];

export function Dashboard({
  items,
  setItems,
  onSignOut,
  onAddToShopping,
}: {
  items: PantryItem[];
  setItems: (items: PantryItem[]) => void;
  onSignOut: () => void;
  onAddToShopping: (item: PantryItem) => void;
}) {
  const [tab, setTab] = useState<Tab>("urgent");
  const [addOpen, setAddOpen] = useState(false);
  const [recipeOpen, setRecipeOpen] = useState(false);

  const urgent = useMemo(
    () => items.filter((i) => freshnessOf(i) === "urgent"),
    [items],
  );
  const expired = useMemo(() => items.filter((i) => freshnessOf(i) === "expired"), [items]);
  const active = useMemo(() => items.filter((i) => freshnessOf(i) !== "expired"), [items]);

  const visible =
    tab === "urgent"
      ? urgent
      : tab === "expired"
        ? expired
        : [...active].sort((a, b) => a.expiresAt - b.expiresAt);

  function addItem(item: PantryItem) {
    const next = [item, ...items];
    setItems(next);
    saveItems(next);
  }

  function removeItem(item: PantryItem, reason: "used" | "discarded") {
    const next = items.filter((i) => i.id !== item.id);
    setItems(next);
    saveItems(next);
    toast(`${item.name} ${reason === "used" ? "used" : "discarded"}. Add to Shopping List?`, {
      position: "bottom-center",
      action: {
        label: "Add to List",
        onClick: () => onAddToShopping(item),
      },
      cancel: { label: "Dismiss", onClick: () => {} },
    });
  }

  return (
    <div className="app-gradient min-h-screen pb-28">
      <header className="flex items-center justify-between px-5 pt-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <Leaf className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[0.7rem] font-medium text-muted-foreground">Welcome back</p>
            <p className="text-sm font-bold tracking-tight text-foreground">Demo User</p>
          </div>
        </div>
        <button
          onClick={onSignOut}
          className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground transition active:scale-95"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </button>
      </header>

      <section className="mt-5 grid grid-cols-3 gap-2.5 px-5">
        {[
          { label: "Urgent Items", value: urgent.length },
          { label: "Total Saved", value: active.length },
          { label: "Expired", value: expired.length },
        ].map((s) => (
          <div key={s.label} className="card-soft px-3 py-3 text-center">
            <p className="text-2xl font-extrabold tracking-tight text-foreground">{s.value}</p>
            <p className="mt-0.5 text-[0.68rem] font-medium text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </section>

      <section className="mt-4 px-5">
        <div className="rounded-[28px] bg-foreground p-5 text-background">
          <div className="flex items-center gap-2 text-xs font-semibold text-background/70">
            <TriangleAlert className="h-4 w-4" />
            Cook first
          </div>
          <h2 className="mt-2 text-xl font-extrabold leading-snug tracking-tight">
            {urgent.length > 0
              ? `⚠️ ${urgent.length} item${urgent.length === 1 ? "" : "s"} need cooking today!`
              : "🎉 Nothing urgent — your pantry is in great shape."}
          </h2>
          <p className="mt-1.5 text-sm text-background/70">
            {urgent.length > 0
              ? urgent.map((i) => i.name).join(" · ")
              : "Add more items to keep your freshness streak going."}
          </p>
          <button
            onClick={() => setRecipeOpen(true)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground transition active:scale-[0.98]"
          >
            <ChefHat className="h-4 w-4" />
            🍳 Generate Rescue Recipe
          </button>
        </div>
      </section>

      <div className="mt-5 flex gap-2 px-5">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 rounded-full px-3 py-2.5 text-xs font-semibold transition ${
              tab === t.id
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-muted-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <section className="mt-4 space-y-3 px-5">
        {visible.length === 0 ? (
          <div className="card-soft px-5 py-10 text-center text-sm text-muted-foreground">
            Nothing here right now.
          </div>
        ) : (
          visible.map((item) => <ItemCard key={item.id} item={item} onRemove={removeItem} />)
        )}
      </section>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-[480px] justify-end p-5">
        <button
          onClick={() => setAddOpen(true)}
          aria-label="Add item"
          className="pointer-events-auto flex items-center gap-2 rounded-full bg-foreground px-5 py-4 text-sm font-bold text-background shadow-xl transition active:scale-95"
        >
          <Plus className="h-5 w-5" />
          Add Item
        </button>
      </div>

      <AddItemModal open={addOpen} onClose={() => setAddOpen(false)} onSave={addItem} />
      <RecipeModal
        open={recipeOpen}
        onClose={() => setRecipeOpen(false)}
        items={urgent.length ? urgent : active}
      />
    </div>
  );
}
