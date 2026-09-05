# PantryPulse

Build a modern, mobile-first B2C web application called "PantryPulse" designed to eliminate pantry food waste.

Design System & Layout:

- Modern, clean iOS-style aesthetic using Tailwind CSS and Radix UI/Lucide icons.

- Warm, appetizing color scheme (soft greens, subtle warm whites, crisp accent colors).

- Mobile-first layout centered on screen with a max-width container (480px) for desktop responsiveness.

Core Features & User Flow:

1. Simulated Social Auth Onboarding:

   - On initial load, display a clean Welcome / Onboarding Screen if the user is not authenticated.

   - Display a catchy hero headline: "Never waste good food again."

   - Include two primary action buttons:

     * "Continue with Google" (with official Google icon)

     * "Continue with Apple" (with official Apple icon)

   - Clicking either button triggers a brief 0.8-second loading overlay ("Authenticating..."), saves a dummy user session in localStorage, and reveals the main app dashboard.

   - Main dashboard header displays a user avatar labeled "Demo User" and a "Sign Out" button (which clears session and returns to onboarding).

2. "Cook First" Dashboard (Hero Section):

   - Top Stat Bar: "Urgent Items", "Total Saved", "Expired".

   - Hero Banner (Dynamic): Highlight items expiring within 48 hours (e.g., "⚠️ 2 items need cooking today!"). 

   - Include a primary call-to-action button: "🍳 Generate Rescue Recipe".

   - Clicking "Generate Rescue Recipe" opens a modal displaying an AI-suggested 3-ingredient recipe using those specific expiring items, complete with step-by-step cooking instructions.

3. Inventory Feed & Freshness Logic:

   - Filter Tabs at top: "Use First (Urgent)", "All Pantry", "Expired & Disposal".

   - Inventory Cards display: Item Name, Category Tag, Days Remaining Countdown, and a Visual Progress Bar:

     * Red Bar: <= 2 days remaining (Urgent)

     * Yellow Bar: 3 to 7 days remaining (Warning)

     * Green Bar: 8+ days remaining (Fresh)

     * Dark Gray Bar: Past expiry (Expired)

4. Add Item Engine (AI Scan + Full Manual Override):

   - Floating Action Button (+) or "Add Item" button that opens an Add Item modal.

   - Modal contains TWO clear pathways:

     A. "📷 Scan Item with AI" Primary Button:

        - On click, opens standard file upload / camera input (`accept="image/*"`).

        - Selecting an image triggers a 1.2-second animated loading overlay: "Scanning item label & predicting shelf life...".

        - Pre-fills the form fields automatically: Item Name: "Organic Roma Tomatoes", Category: "Produce", Expiry: 3 days.

     B. Manual Input / Override Form (Always Editable):

        - Text input for Item Name.

        - Category dropdown: Produce, Canned Goods, Grains, Oils & Spices, Dairy & Alternatives.

        - Expiry Period slider or number input in Days.

        - Users can freely edit pre-filled AI values or type everything from scratch if scanning fails.

   - "Save to Pantry" primary button to append the item to localStorage and refresh the UI.

5. Expired Items & Waste Disposal Guide:

   - Separate "Expired & Disposal" view highlighting items past their prime.

   - Each expired card features a "Dispose Responsibly" badge displaying eco-friendly disposal steps (e.g., "Compost / Organic Wet Waste" vs. "Rinse & Recyclable Packaging").

6. Pre-populated Mock Data:

   - Upon initial login/demo entry, auto-populate localStorage with 4 sample items if empty:

     * "Tomatoes" (Produce, 1 day left -> Urgent Red)

     * "Pasta Sauce" (Canned Goods, 2 days left -> Warning Yellow)

     * "Olive Oil" (Oils & Spices, 60 days left -> Fresh Green)

     * "Whole Wheat Bread" (Grains, -1 days left -> Expired Dark Gray)

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b620f0c2-ad1e-49c4-8636-b423227d0083).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
