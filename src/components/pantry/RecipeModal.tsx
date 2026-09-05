import { buildRescueRecipe, type PantryItem } from "@/lib/pantry";
import { Modal } from "./Modal";

export function RecipeModal({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: PantryItem[];
}) {
  const recipe = buildRescueRecipe(items);

  return (
    <Modal open={open} onClose={onClose} title="Your rescue recipe">
      <div className="rounded-2xl bg-secondary p-4">
        <h3 className="text-lg font-bold tracking-tight text-secondary-foreground">
          {recipe.title}
        </h3>
        <p className="mt-1 text-xs font-medium text-muted-foreground">{recipe.time}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {items.slice(0, 3).map((i) => (
            <span
              key={i.id}
              className="rounded-full bg-card px-3 py-1 text-xs font-semibold text-foreground"
            >
              {i.name}
            </span>
          ))}
        </div>
      </div>

      <ol className="mt-5 space-y-4">
        {recipe.steps.map((step, idx) => (
          <li key={idx} className="flex gap-3">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {idx + 1}
            </span>
            <p className="pt-1 text-sm leading-relaxed text-foreground">{step}</p>
          </li>
        ))}
      </ol>

      <button
        onClick={onClose}
        className="mt-6 w-full rounded-2xl bg-primary px-5 py-4 text-[0.95rem] font-semibold text-primary-foreground transition active:scale-[0.98]"
      >
        Let's cook
      </button>
    </Modal>
  );
}
