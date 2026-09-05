# PantryPulse 🥗

> **Interactive Prototype**  
> A mobile-first web application designed to track pantry inventory, prioritize expiring ingredients, and streamline restocking.

🔗 **Live Prototype:** https://pantry-pulse-seven.vercel.app/  
👤 **Builder:** Yash Chavan  

---

## 🎯 The Problem
Most household food waste happens simply because ingredients get forgotten in the back of the fridge or pantry. Manual tracking quickly feels like a chore, and managing inventory often feels disconnected from daily cooking and restocking routines.

---

## 🚀 What It Does

* **Expiration Tracking ("Cook First"):** Automatically surfaces items near spoilage on session launch so you know what needs to be used today.
* **Smart Recipe Suggestions:** Generates quick recipe ideas using your expiring items to help you cook what you already have before it goes bad.
* **Smart Depletion Loop:** Selecting **"Mark as Used"** or **"Mark as Discarded"** removes the item from inventory and offers a 1-tap action to add it directly to your shopping list.
* **Shopping List:** A fast, single-screen restocking list with instant `+ / -` quantity controls optimized for speed while shopping in-store.
* **Quick Sharing:** Pre-formats your shopping list into plain text for 1-click copying or messaging via WhatsApp.
* **AI Camera Simulation:** A mock visual scanner interface to test automated entry flows without manual typing.

---

## 🛠️ Tech Stack

* **Frontend:** React, Vite, Tailwind CSS, Shadcn UI
* **State & Persistence:** Web Storage API (`localStorage`)
* **Prototyping & CI/CD:** Lovable, GitHub, Vercel
