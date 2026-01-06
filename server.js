import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const API = "http://bc1.ph1-mczie.fun:4094/server";
const KEY = "GxzGQrGK1ZRKzhmGZRqoPOiqaEYuIrAIIxkkhXJAYXPSFmZZnd2RkwQm3nAIE7myDwwmeOQQ410osrKo2P1aNhf9BwTsac9IylN3";

// Root check
app.get("/", (req, res) => {
  res.send("Barkada Backend is running");
});

// Status endpoint (browser-emulated request)
app.get("/status", async (req, res) => {
  try {
    const response = await fetch(API, {
      headers: {
        "Authorization": "Bearer " + KEY,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept": "application/json,text/plain,*/*",
        "Accept-Language": "en-US,en;q=0.9",
        "Connection": "keep-alive",
        "Referer": "http://bc1.ph1-mczie.fun/",
        "Origin": "http://bc1.ph1-mczie.fun"
      }
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.error("Backend error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("Backend running on", PORT);
});
