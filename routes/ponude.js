import express from "express";
import nekretnineRouter from "./nekretnine.js";
import { nekretnine } from "./nekretnine.js";
const router = express.Router();

router.use(nekretnineRouter);

router.get("/ponuda", (req,res) => {
    res.send("Ovdje mozete napraviti ponudu za nekretninu!");
});

let listaponude = [];

router.post("/ponuda", (req,res) => {
    let { ponuda } = req.body;

const nekretnina = nekretnine.find(nekretnina => nekretnina.id === ponuda.id_nekretnina);

console.log (nekretnina);
console.log(ponuda.id_nekretnina);
if (!nekretnina) {
    res.status(400).send("Nekretnina s traženim ID-em ne postoji.");
    return;
    }


    if(isNaN(ponuda.id_nekretnina) || ponuda.id_nekretnina < 0) { 
        res.status(400).send("Id nekretnine koje ste poslali nije vazec!");
        return;
    };

    if(isNaN(ponuda.ponuda) || ponuda.ponuda < 0) { 
        res.status(400).send("Novcana ponuda koje ste poslali nije vazeca!");
        return;
    };

    if(isNaN(ponuda.broj_telefona) || ponuda.broj_telefona.length < 8 ) { 
        res.status(400).send("Telefonski broj nije vazeci!");
        return;
    };

    let message = "Vasa ponuda je uspijesno poslana";

    let id = 200;

    const kljucevi = Object.keys(ponuda)
    res.json({ message, ponuda});
    id++;
    let ponudaid = { id, ...ponuda };
    listaponude.push(ponudaid);
    console.log("Lista ponude: \n")
    console.log(listaponude);
});



export default router;
