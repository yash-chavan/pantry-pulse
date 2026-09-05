import { Recycle } from "lucide-react";
import {
  DISPOSAL_GUIDE,
  FRESHNESS_STYLES,
  daysLeft,
  freshnessOf,
  progressPercent,
  type PantryItem,
} from "@/lib/pantry";

export function ItemCard({ item }: { item: PantryItem }) {
  const fresh = freshnessOf(item);
  const style = FRESHNESS_STYLES[fresh];
  const d = daysLeft(item);
  const disposal = DISPOSAL_GUIDE[item.category];

  const countdown =
    d < 0
      ? `Expired ${Math.abs(d)} day${Math.abs(d) === 1 ? "" : "s"} ago`
      : d === 0
        ? "Expires today"
        : `${d} day${d === 1 ? "" : "s"} left`;

  return (
    <div className="card-soft p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[0.98rem] font-semibold tracking-tight text-foreground">
            {item.name}
          </h3>
          <span className="mt-1 inline-block rounded-full bg-secondary px-2.5 py-0.5 text-[0.7rem] font-medium text-secondary-foreground">
            {item.category}
          </span>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-[0.7rem] font-semibold ${style.chip}`}>
          {countdown}
        </span>
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all ${style.bar}`}
          style={{ width: `${progressPercent(item)}%` }}
        />
      </div>

      {fresh === "expired" && (
        <div className="mt-3 rounded-2xl bg-muted/70 p-3">
          <div className="flex items-center gap-2 text-[0.75rem] font-semibold text-foreground">
            <Recycle className="h-4 w-4 text-primary" />
            Dispose Responsibly · {disposal.badge}
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{disposal.steps}</p>
        </div>
      )}
    </div>
  );
}
