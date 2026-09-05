import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { CATEGORIES, makeItem, type Category, type PantryItem } from "@/lib/pantry";
import { Modal } from "./Modal";

export function AddItemModal({
  open,
  onClose,
  onSave,
  mode = "pantry",
}: {
  open: boolean;
  onClose: () => void;
  onSave: (item: PantryItem) => void;
  mode?: "pantry" | "shopping";
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>("Produce");
  const [days, setDays] = useState(7);
  const [scanning, setScanning] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;
    setScanning(true);
    window.setTimeout(() => {
      setName("Organic Roma Tomatoes");
      setCategory("Produce");
      setDays(3);
      setScanning(false);
    }, 1200);
    e.target.value = "";
  }

  function save() {
    if (!name.trim()) return;
    onSave(makeItem(name.trim(), category, days));
    setName("");
    setCategory("Produce");
    setDays(7);
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === "shopping" ? "Add to shopping list" : "Add to pantry"}
    >
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />

      <button
        onClick={() => fileRef.current?.click()}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-[0.95rem] font-semibold text-primary-foreground transition active:scale-[0.98]"
      >
        <Camera className="h-5 w-5" />
        Scan Item with AI
      </button>

      {scanning && (
        <div className="mt-3 flex items-center gap-3 rounded-2xl bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Scanning item label &amp; predicting shelf life...
        </div>
      )}

      <div className="my-5 flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-wide text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> or enter manually
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="text-xs font-semibold text-muted-foreground">Item name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Baby spinach"
            className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-ring"
          />
        </label>

        {mode === "pantry" && (
        <label className="block">
          <span className="text-xs font-semibold text-muted-foreground">Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="mt-1.5 w-full appearance-none rounded-2xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-ring"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        )}

        {mode === "pantry" && (
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Expires in</span>
            <span className="text-sm font-bold text-primary">{days} days</span>
          </div>
          <input
            type="range"
            min={1}
            max={90}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="mt-2 w-full accent-[var(--primary)]"
          />
          <input
            type="number"
            min={1}
            value={days}
            onChange={(e) => setDays(Math.max(1, Number(e.target.value) || 1))}
            className="mt-2 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-ring"
          />
        </div>
        )}
      </div>

      <button
        onClick={save}
        disabled={!name.trim()}
        className="mt-6 w-full rounded-2xl bg-foreground px-5 py-4 text-[0.95rem] font-semibold text-background transition active:scale-[0.98] disabled:opacity-40"
      >
        {mode === "shopping" ? "Add to Shopping List" : "Save to Pantry"}
      </button>
    </Modal>
  );
}
