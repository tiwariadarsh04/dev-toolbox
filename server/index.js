const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/format-json", (req, res) => {
  try {
    const obj = JSON.parse(req.body.json);
    const formatted = JSON.stringify(obj, null, 2);
    res.json({ formatted });
  } catch (e) {
    res.status(400).json({ error: "Invalid JSON" });
  }
});

app.post("/encode", (req, res) => {
  const encoded = Buffer.from(req.body.text).toString("base64");
  res.json({ encoded });
});

app.post("/decode", (req, res) => {
  try {
    const decoded = Buffer.from(req.body.base64, "base64").toString("utf8");
    res.json({ decoded });
  } catch (e) {
    res.status(400).json({ decoded: "Invalid base64" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
