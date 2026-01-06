import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

const API = "http://bc1.ph1-mczie.fun:4094/server";
const KEY = "GxzGQrGK1ZRKzhmGZRqoPOiqaEYuIrAIIxkkhXJAYXPSFmZZnd2RkwQm3nAIE7myDwwmeOQQ410osrKo2P1aNhf9BwTsac9IylN3";

// Root route — para mawala ang "Cannot GET /"
app.get("/", (req, res) => {
  res.send("Barkada Backend is running 🚀");
});

// Status API
app.get("/status", async (req, res) => {
  try {
    const r = await fetch(API, {
      headers: { Authorization: "Bearer " + KEY }
    });

    const json = await r.json();
    res.json(json);
  } catch (e) {
    res.status(500).json({ error: "Server unreachable" });
  }
});

app.listen(PORT, () => {
  console.log("Backend running on port", PORT);
});
