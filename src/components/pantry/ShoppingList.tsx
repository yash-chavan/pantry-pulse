import { useMemo, useState } from "react";
import { Camera, ChevronDown, Minus, Plus, Share2 } from "lucide-react";
import {
  CATEGORIES,
  makeShoppingItem,
  type Category,
  type PantryItem,
  type ShoppingItem,
} from "@/lib/pantry";
import { AddItemModal } from "./AddItemModal";
import { ShareModal } from "./ShareModal";

export function ShoppingList({
  items,
  setItems,
}: {
  items: ShoppingItem[];
  setItems: (items: ShoppingItem[]) => void;
}) {
  const [name, setName] = useState("");
  const [scanOpen, setScanOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const grouped = useMemo(
    () =>
      CATEGORIES.map((c) => ({
        category: c,
        entries: items.filter((i) => i.category === c),
      })).filter((g) => g.entries.length > 0),
    [items],
  );

  function add(itemName: string, category: Category) {
    const trimmed = itemName.trim();
    if (!trimmed) return;
    const existing = items.find(
      (i) => i.name.toLowerCase() === trimmed.toLowerCase() && i.category === category,
    );
    setItems(
      existing
        ? items.map((i) => (i.id === existing.id ? { ...i, qty: i.qty + 1 } : i))
        : [...items, makeShoppingItem(trimmed, category)],
    );
  }

  function step(id: string, delta: number) {
    setItems(
      items
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );
  }

  return (
    <div className="app-gradient min-h-screen pb-28">
      <header className="flex items-center justify-between px-5 pt-6">
        <div>
          <p className="text-[0.7rem] font-medium text-muted-foreground">Plan your restock</p>
          <h1 className="text-xl font-extrabold tracking-tight text-foreground">Shopping List</h1>
        </div>
        <button
          onClick={() => setShareOpen(true)}
          className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground transition active:scale-95"
        >
          <Share2 className="h-3.5 w-3.5" />
          Share List
        </button>
      </header>

      <section className="mt-5 px-5">
        <div className="card-soft p-4">
          <div className="flex gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  add(name, "Produce");
                  setName("");
                }
              }}
              placeholder="Add an item..."
              className="min-w-0 flex-1 rounded-2xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-ring"
            />
            <button
              onClick={() => {
                add(name, "Produce");
                setName("");
              }}
              disabled={!name.trim()}
              className="shrink-0 rounded-2xl bg-foreground px-4 py-3 text-sm font-bold text-background transition active:scale-95 disabled:opacity-40"
            >
              + Add
            </button>
          </div>
          <button
            onClick={() => setScanOpen(true)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition active:scale-[0.98]"
          >
            <Camera className="h-4 w-4" />
            Scan Item
          </button>
        </div>
      </section>

      <section className="mt-4 space-y-3 px-5">
        {grouped.length === 0 ? (
          <div className="card-soft px-5 py-10 text-center text-sm text-muted-foreground">
            Your shopping list is empty.
          </div>
        ) : (
          grouped.map((group) => {
            const isOpen = !collapsed[group.category];
            return (
              <div key={group.category} className="card-soft overflow-hidden">
                <button
                  onClick={() =>
                    setCollapsed((c) => ({ ...c, [group.category]: !collapsed[group.category] }))
                  }
                  className="flex w-full items-center justify-between px-4 py-3.5"
                >
                  <span className="text-sm font-bold tracking-tight text-foreground">
                    {group.category}
                    <span className="ml-2 text-xs font-medium text-muted-foreground">
                      {group.entries.length}
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition ${isOpen ? "" : "-rotate-90"}`}
                  />
                </button>
                {isOpen && (
                  <div className="space-y-2 px-3 pb-3">
                    {group.entries.map((i) => (
                      <div
                        key={i.id}
                        className="flex items-center justify-between gap-3 rounded-2xl bg-secondary/60 px-4 py-3"
                      >
                        <span className="text-sm font-semibold text-foreground">{i.name}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => step(i.id, -1)}
                            aria-label={`Decrease ${i.name}`}
                            className="grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-foreground transition active:scale-95"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-5 text-center text-sm font-bold text-foreground">
                            {i.qty}
                          </span>
                          <button
                            onClick={() => step(i.id, 1)}
                            aria-label={`Increase ${i.name}`}
                            className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground transition active:scale-95"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>

      <AddItemModal
        open={scanOpen}
        onClose={() => setScanOpen(false)}
        mode="shopping"
        onSave={(item: PantryItem) => add(item.name, item.category)}
      />
      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} items={items} />
    </div>
  );
}
