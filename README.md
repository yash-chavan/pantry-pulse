# PantryPulse 🥗

> A smart B2C pantry management web application built to eliminate household food waste through expiration intelligence, rescue recipes, and closed-loop restocking workflows.

🔗 **Live Prototype:** https://pantry-pulse-seven.vercel.app/  
📄 **Product Manager:** Yash Chavan

---

## 🎯 The Problem
Household food waste is driven by poor visibility into pantry inventory and friction when deciding what to cook before ingredients spoil. Standard inventory apps fail because logging consumption requires too much effort and lacks integration with restocking workflows.

## 🚀 Key PM Features & Product Mechanics

* **Expiration Intelligence ("Cook First"):** Prioritizes expiring ingredients automatically on session launch to drive immediate user action.
* **AI Camera Scanning (Simulated):** Reduces item logging friction via automated visual scanning with manual fallbacks.
* **Closed-Loop Item Depletion:** Replaces binary deletion with explicit **"Mark as Used"** vs. **"Mark as Discarded"** actions, driving data capture for waste metrics while triggering 1-tap transfers to the Shopping List.
* **Frictionless Shopping List:** A flattened, category-free restocking view with real-time quantity steppers (+/-) optimized for quick in-store scanning.
* **Growth & Sharing Loops:** Simulated pre-formatted text exports for instant list sharing via messaging apps (WhatsApp).

---

## 📐 Strategic Trade-offs & PM Decisions

* **Flat Shopping List vs. Categorized Aisles:** Opted for a flat, chronological list over category groupings to minimize tap friction and speed up manual list generation during user testing.
* **Local Persistence over Backend Auth:** Used `localStorage` to simulate full user sessions and state management without introducing backend complexity, prioritizing rapid prototype validation.

---

## 🛠️ Tech Stack & Architecture

* **Frontend:** React, Vite, Tailwind CSS, Shadcn UI
* **State Management:** Browser LocalStorage API
* **Deployment & Tooling:** Lovable AI, GitHub, Vercel
