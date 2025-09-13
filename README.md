
## Build a basic version of PayTM
# 💳 Online Payment Dashboard

A **Next.js 14 + Tailwind CSS** payment dashboard that allows users to **sign up, sign in, check balance, transfer funds, and view transaction history**. This project simulates a modern payment app interface with real-time backend integration.

---

## 🏗️ Project Structure

frontend/
├─ src/app/
│ ├─ SignIn/page.tsx
│ ├─ SignUp/page.tsx
│ ├─ page.tsx
│ ├─ settings/page.tsx
│ ├─ transaction/
│ │ ├─ CheckBalance.tsx
│ │ ├─ TransactionHistory.tsx
│ │ └─ Transfer.tsx
│ └─ components/
│ ├─ BalanceCard.tsx
│ ├─ Footer.tsx
│ ├─ Header.tsx
│ ├─ QuickActions.tsx
│ └─ RecentTransactions.tsx
├─ globals.css
├─ layout.tsx
├─ next.config.ts
├─ package.json
└─ tsconfig.json