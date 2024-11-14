import express from "express";
import ponudeRouter from "./routes/ponude.js";
import nekretnineRouter from "./routes/nekretnine.js";

const app = express();
app.use(express.json());

const PORT = 3000;
app.listen(PORT);

app.use(ponudeRouter);
app.use(nekretnineRouter);

app.get("/", (req,res) => {
    res.send("Ovo je stranica za nekretnine, idite na /nekretnine kako bi ste vidijeli sve nekretnine");
});
