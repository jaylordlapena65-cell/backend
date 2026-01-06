import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/status", async (req, res) => {
  try {
    const r = await fetch("http://bc1.ph1-mczie.fun:4094/server", {
      headers: {
        Authorization: "Bearer GxzGQrGK1ZRKzhmGZRqoPOiqaEYuIrAIIxkkhXJAYXPSFmZZnd2RkwQm3nAIE7myDwwmeOQQ410osrKo2P1aNhf9BwTsac9IylN3"
      }
    });

    const data = await r.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server offline" });
  }
});

app.listen(3000, () => console.log("Backend running"));
