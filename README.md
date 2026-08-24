# FinPath High — Personal Finance & Adulting Readiness

An interactive, practical personal finance and adulting preparation platform for high school students. Features interactive curriculum modules, real-world financial calculators, case studies, and an AI-powered financial literacy coach.

---

## 🚀 Live Demo / Deployment Options

Because this is a full-stack application (React 19 frontend + Express backend for the Gemini API tutor), it can be deployed directly from GitHub using several free/easy hosting providers:

### Option A: Deploy on Render (Recommended & Fastest)
1. Fork or push this repository to GitHub.
2. Sign up / Log in to [Render.com](https://render.com).
3. Click **New +** > **Web Service** and connect your GitHub repository.
4. Set the following settings:
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. In **Environment Variables**, add:
   - `GEMINI_API_KEY`: *(Your Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/))*
   - `NODE_ENV`: `production`
6. Click **Create Web Service**. Your app will have a live URL (e.g., `https://finpath-high.onrender.com`).

---

### Option B: Deploy on Railway
1. Go to [Railway.app](https://railway.app) and create a new project from your GitHub repo.
2. Add your `GEMINI_API_KEY` under the **Variables** tab.
3. Railway automatically detects `npm run build` and `npm start` from `package.json`.
4. Generate a public domain under service **Settings** > **Networking**.

---

### Option C: Run in 1-Click in the Browser via GitHub Codespaces / StackBlitz
- **GitHub Codespaces**: Open your repo on GitHub, click **Code** > **Codespaces** > **Create codespace on main**.
- Run `npm install` followed by `npm run dev`. The preview port (3000) will automatically forward in your browser.

---

## 💻 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/finpath-high-financial-literacy.git
cd finpath-high-financial-literacy
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory (based on `.env.example`):
```env
GEMINI_API_KEY="your-gemini-api-key-here"
```

### 4. Run the development server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 🛠️ Tech Stack & Architecture
- **Frontend:** React 19, TypeScript, Tailwind CSS, Lucide Icons, Motion
- **Backend Server:** Express.js, `@google/genai` SDK
- **Build Tool:** Vite, esbuild

## 📜 Curriculum Modules
1. **First Job, Taxes & Paycheck Breakdown** (W-4, W-2, FICA, Net vs Gross Pay)
2. **Checking, Savings & Modern Banking** (Debit cards, overdraft fees, HYSA)
3. **Teen & Young Adult Budgeting** (50/30/20 budget framework, emergency funds)
4. **Building Credit & Credit Cards** (FICO score factors, 30% utilization rule, grace periods)
5. **Student Loans & Financial Aid** (FAFSA, Grants vs Subsidized/Unsubsidized Direct loans)
6. **Car Buying, Financing & Auto Insurance** (Auto loans, APR, liability vs comprehensive insurance)
7. **Apartment Renting & Living Expenses** (Security deposits, lease terms, roommate expense splits)
8. **Investing & Compound Growth** (Roth IRA tax-free growth at age 18, S&P 500 index funds)
9. **Consumer Protection & Digital Scams** (Phishing identification, credit freezes, BNPL traps)
10. **Side Hustles & Freelancing Taxes** (1099 contractor income, 15.3% self-employment tax, deductions)

---

## 📄 License
MIT License
