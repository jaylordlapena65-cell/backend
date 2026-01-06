import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import https from "https";

const app = express();
app.use(cors());

const API = "http://bc1.ph1-mczie.fun:4094/server";
const KEY = "GxzGQrGK1ZRKzhmGZRqoPOiqaEYuIrAIIxkkhXJAYXPSFmZZnd2RkwQm3nAIE7myDwwmeOQQ410osrKo2P1aNhf9BwTsac9IylN3";

const agent = new https.Agent({ rejectUnauthorized: false });

app.get("/", (req, res) => {
  res.send("Barkada Backend is running");
});

app.get("/status", async (req, res) => {
  try {
    const r = await fetch(API, {
      headers: {
        Authorization: "Bearer " + KEY,
        "User-Agent": "Mozilla/5.0"
      },
      agent
    });

    const data = await r.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server unreachable" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Backend running on", PORT));
