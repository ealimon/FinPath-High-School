import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google Gen AI client server-side
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// API Route: AI Financial Tutor Chat (Finny)
app.post("/api/tutor/chat", async (req, res) => {
  try {
    const { message, context, history } = req.body;

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Message is required." });
      return;
    }

    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not set
      res.json({
        reply: `Hello! I'm Finley, your High School Financial Advisor. 🎓\n\nTo enable live AI responses, please set your \`GEMINI_API_KEY\` in the Secrets panel.\n\nQuick Tip: ${
          context ? `In ${context.moduleTitle}, ` : ""
        }When starting your first job, make sure to review your W-4 tax withholding and set up automated direct deposits into a high-yield savings account!`,
      });
      return;
    }

    const systemInstruction = `You are Finley, a knowledgeable, engaging, and practical Financial Advisor for high school students (Grades 9-12 / Ages 14-18) in the app "FinPath High".
Your mission is to empower teens and young adults preparing for independent life after high school (college, trade school, workforce).
Topics cover: First Job Taxes (W-4, W-2, 1040), Checking & Savings Accounts, Building Credit & Avoiding Debt, FAFSA & Student Loans, Buying/Insuring a Car, Apartment Renting & Utilities, Roth IRAs & Compound Interest Growth, and Avoiding Digital Scams.
Keep your answers concise, structured (using bullet points and bold key terms), highly practical, and relatable to high school students without sounding juvenile or overly academic.
Current topic context: ${context ? JSON.stringify(context) : "High School Personal Finance & Adulting Preparation"}`;

    const contents = [];
    if (history && Array.isArray(history)) {
      for (const h of history) {
        if (h.role && h.text) {
          contents.push({
            role: h.role === "assistant" ? "model" : "user",
            parts: [{ text: h.text }],
          });
        }
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text });
  } catch (err: any) {
    console.error("Error calling Gemini API:", err);
    res.status(500).json({
      error: "Failed to generate AI response.",
      details: err.message,
    });
  }
});

// API Route: Generate Custom Financial Quiz / Challenge
app.post("/api/tutor/generate-challenge", async (req, res) => {
  try {
    const { topic } = req.body;

    if (!ai) {
      res.json({
        scenario: "You receive a $100 birthday gift card. You want to buy a $60 video game and save the rest for a $200 tablet.",
        question: "How should you divide your $100 according to smart saving rules?",
        options: [
          "Spend $60 on the game and put $40 into savings",
          "Spend all $100 on snacks and clothes",
          "Put $100 into a 0% interest envelope under your mattress forever",
          "Borrow $100 more to buy two games"
        ],
        correctIndex: 0,
        explanation: "Saving $40 gets you 20% closer to your $200 tablet while still enjoying your video game purchase!"
      });
      return;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Create a fun high school scenario challenge for the topic: "${topic || "Budgeting"}".
Return ONLY a valid JSON object matching this schema:
{
  "scenario": "string",
  "question": "string",
  "options": ["string", "string", "string", "string"],
  "correctIndex": number (0-3),
  "explanation": "string"
}`,
      config: {
        responseMimeType: "application/json",
      },
    });

    const jsonText = response.text || "{}";
    const data = JSON.parse(jsonText);
    res.json(data);
  } catch (err: any) {
    console.error("Error generating challenge:", err);
    res.status(500).json({ error: "Failed to generate challenge." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`FinKid Academy server running on http://localhost:${PORT}`);
  });
}

startServer();
