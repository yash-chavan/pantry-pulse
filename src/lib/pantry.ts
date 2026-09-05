export type Category =
  | "Produce"
  | "Canned Goods"
  | "Grains"
  | "Oils & Spices"
  | "Dairy & Alternatives";

export const CATEGORIES: Category[] = [
  "Produce",
  "Canned Goods",
  "Grains",
  "Oils & Spices",
  "Dairy & Alternatives",
];

export type PantryItem = {
  id: string;
  name: string;
  category: Category;
  expiresAt: number; // epoch ms
  totalDays: number; // shelf life at time of adding
};

export const ITEMS_KEY = "pantrypulse.items";
export const SESSION_KEY = "pantrypulse.session";

const DAY = 86_400_000;

export function daysLeft(item: PantryItem): number {
  return Math.ceil((item.expiresAt - Date.now()) / DAY);
}

export type Freshness = "urgent" | "warning" | "fresh" | "expired";

export function freshnessOf(item: PantryItem): Freshness {
  const d = daysLeft(item);
  if (d < 0) return "expired";
  if (d <= 2) return "urgent";
  if (d <= 7) return "warning";
  return "fresh";
}

export const FRESHNESS_STYLES: Record<
  Freshness,
  { bar: string; chip: string; label: string }
> = {
  urgent: {
    bar: "bg-urgent",
    chip: "bg-urgent/12 text-urgent",
    label: "Use first",
  },
  warning: {
    bar: "bg-warning",
    chip: "bg-warning/20 text-warning-foreground",
    label: "Use soon",
  },
  fresh: {
    bar: "bg-fresh",
    chip: "bg-fresh/15 text-fresh",
    label: "Fresh",
  },
  expired: {
    bar: "bg-expired",
    chip: "bg-expired/15 text-expired",
    label: "Expired",
  },
};

export function progressPercent(item: PantryItem): number {
  const d = daysLeft(item);
  if (d <= 0) return 100;
  const total = Math.max(item.totalDays, d);
  return Math.min(100, Math.max(6, ((total - d) / total) * 100));
}

export function makeItem(name: string, category: Category, days: number): PantryItem {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    category,
    expiresAt: Date.now() + days * DAY,
    totalDays: Math.max(Math.abs(days), 1),
  };
}

export function seedItems(): PantryItem[] {
  return [
    makeItem("Tomatoes", "Produce", 1),
    makeItem("Pasta Sauce", "Canned Goods", 2),
    makeItem("Olive Oil", "Oils & Spices", 60),
    makeItem("Whole Wheat Bread", "Grains", -1),
  ];
}

export function loadItems(): PantryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ITEMS_KEY);
    if (!raw) {
      const seeded = seedItems();
      window.localStorage.setItem(ITEMS_KEY, JSON.stringify(seeded));
      return seeded;
    }
    return JSON.parse(raw) as PantryItem[];
  } catch {
    return seedItems();
  }
}

export function saveItems(items: PantryItem[]) {
  window.localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
}

export const DISPOSAL_GUIDE: Record<Category, { badge: string; steps: string }> = {
  Produce: {
    badge: "Compost / Organic Wet Waste",
    steps: "Remove any stickers or ties, then add to your compost bin or wet-waste caddy.",
  },
  "Canned Goods": {
    badge: "Rinse & Recyclable Packaging",
    steps: "Empty contents into wet waste, rinse the can or jar, and place it in dry recycling.",
  },
  Grains: {
    badge: "Compost / Organic Wet Waste",
    steps: "Break bread or grains into small pieces and compost. Recycle the outer bag if clean.",
  },
  "Oils & Spices": {
    badge: "Seal & Special Disposal",
    steps: "Never pour oil down the drain — seal it in a container and drop at an oil collection point.",
  },
  "Dairy & Alternatives": {
    badge: "Drain & Recycle Carton",
    steps: "Pour spoiled liquid into the sink with plenty of water, rinse the carton, then recycle.",
  },
};

export type Recipe = { title: string; time: string; steps: string[] };

export function buildRescueRecipe(items: PantryItem[]): Recipe {
  const picked = items.slice(0, 3);
  const names = picked.map((i) => i.name);
  const list = names.length ? names.join(", ") : "your pantry staples";
  const title = names.length
    ? `${names[0]} Rescue Skillet`
    : "Clean-the-Pantry Skillet";

  return {
    title,
    time: "20 min · 2 servings",
    steps: [
      `Prep ${list}: rinse, trim and roughly chop everything into bite-sized pieces.`,
      "Warm a splash of oil in a wide pan over medium heat until it shimmers.",
      `Add ${names[0] ?? "the firmest ingredient"} first and cook 4-5 minutes until it starts to soften and colour.`,
      `Stir in ${names[1] ?? "the remaining ingredients"} with a pinch of salt, pepper and any herbs you have on hand.`,
      `Fold in ${names[2] ?? "anything soft or saucy"}, lower the heat and simmer 6-8 minutes so the flavours melt together.`,
      "Taste, adjust seasoning, and serve hot with bread or rice. Nothing wasted.",
    ],
  };
}
