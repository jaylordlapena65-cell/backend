import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// ✅ Stable public proxy
const PROXY = "https://api.codetabs.com/v1/proxy/?quest=";
const TARGET = "http://bc1.ph1-mczie.fun:4094/server";

app.get("/", (req, res) => {
  res.send("Barkada Backend is running");
});

app.get("/status", async (req, res) => {
  try {
    const r = await fetch(PROXY + TARGET, { cache: "no-store" });
    const data = await r.text();

    // Your MC server already returns JSON
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: "Server unreachable" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Backend running on", PORT));
