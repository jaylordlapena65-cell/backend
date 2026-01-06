import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// 🔥 PROXY FIX — this bypasses firewall blocks
const API = "https://api.allorigins.win/raw?url=http://bc1.ph1-mczie.fun:4094/server";

app.get("/", (req, res) => {
  res.send("Barkada Backend is running");
});

app.get("/status", async (req, res) => {
  try {
    const r = await fetch(API, { cache: "no-store" });
    const json = await r.json();
    res.json(json);
  } catch (e) {
    res.status(500).json({ error: "Server unreachable" });
  }
});

// 🔧 Render uses PORT env variable
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Backend running on", PORT));
