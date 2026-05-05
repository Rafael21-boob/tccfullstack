const express = require("express");
const cors = require("cors");

const leituraRoutes = require("./routes/leitura.routes");
const leitorRoutes = require("./routes/leitor.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API do drone funcionando");
});

app.use("/api/auth", authRoutes);
app.use("/api/leituras", leituraRoutes);
app.use("/api/leitura", leitorRoutes);

module.exports = app;