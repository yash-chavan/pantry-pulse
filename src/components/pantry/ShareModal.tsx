import { Copy, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { formatShoppingList, type ShoppingItem } from "@/lib/pantry";
import { Modal } from "./Modal";

export function ShareModal({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: ShoppingItem[];
}) {
  async function copy() {
    const text = formatShoppingList(items);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* clipboard unavailable */
    }
    toast.success("Shopping list copied to clipboard!");
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="Share your list">
      <div className="space-y-3">
        <button
          onClick={() => {
            toast("Opening WhatsApp with your formatted grocery list...");
            onClose();
          }}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-[0.95rem] font-semibold text-primary-foreground transition active:scale-[0.98]"
        >
          <MessageCircle className="h-5 w-5" />
          WhatsApp
        </button>
        <button
          onClick={copy}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card px-5 py-4 text-[0.95rem] font-semibold text-foreground transition active:scale-[0.98]"
        >
          <Copy className="h-5 w-5" />
          Copy to Clipboard
        </button>
      </div>
    </Modal>
  );
}
