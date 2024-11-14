import express from "express";
const router = express.Router();

export const nekretnine = [
    { id: 1, naziv: "Villa Arte", opis: "5km od mora", cijena: 350000.0, lokacija: "Zadar", broj_soba: 4, povrsina: 200 },
    { id: 2, naziv: "Kuca Rumore", opis: "Blizu centra grada", cijena: 250000.0, lokacija: "Split", broj_soba: 3, povrsina: 120 },
    { id: 3, naziv: "Kuca Boska", opis: "S pogledom na more", cijena: 280000.0, lokacija: "Rijeka", broj_soba: 5, povrsina: 180 },
    { id: 4, naziv: "Villa Maria", opis: "10 minuta do plaže", cijena: 400000.0, lokacija: "Dubrovnik", broj_soba: 6, povrsina: 300 },
    { id: 5, naziv: "Villa Belpiato", opis: "U blizini parka prirode", cijena: 450000.0, lokacija: "Osijek", broj_soba: 4, povrsina: 220 }
];

let noviID = nekretnine.length + 1;

router.get("/nekretnine", (req,res) => {
    res.json(nekretnine);
});



router.get("/nekretnine/:id", (req,res) => {
    const id_nekretnina = req.params.id;
    const nekretnina = nekretnine.find(nekretnina => nekretnina.id == id_nekretnina)
    if(isNaN(id_nekretnina)) {
        res.status(404).json({message: "prosljedili ste parametar id koji nije broj!"});
        return;
    }
    if(nekretnina){
        res.json(nekretnina);
    } else {
        res.status(404).json({message: "Nekretnina s trazenim IDem ne postoji."});
    }
});




router.post("/nekretnine/dodaj", (req,res) => {
    const { naziv, opis, cijena, lokacija, broj_soba, povrsina } = req.body;
    const novaNekretnina = {
        id: noviID,
        naziv,
        opis,
        cijena,
        lokacija,
        broj_soba,
        povrsina
    };

    nekretnine.push(novaNekretnina);
    noviID++;

    res.status(201).json(novaNekretnina);
});




router.put("/nekretnine/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const nekretnina = nekretnine.find(nekretnina => nekretnina.id == id);
    if(!nekretnina) {
        return res.status(404).json({message: "nekretnina sa tim id-em ne postoji."});
    };
    if(!isNaN(id.cijena) || id.cijena < 0) { 
        res.status(400).send("cijena nekretnine nije vazeca! ");
        return;
    };
    if(!isNaN(id.broj_soba) || id.broj_soba < 0) { 
        res.status(400).send("broj soba koj ste unesli nije vazec! ");
        return;
    };
    if(!isNaN(id.povrsina) || id.povrsina < 0) { 
        res.status(400).send("broj m2 povrsine nije vazec");
        return;
    };
    
        const { naziv, opis, cijena, lokacija, broj_soba, povrsina } = req.body;
        nekretnina.naziv = naziv;
        nekretnina.opis = opis;
        nekretnina.cijena = cijena;
        nekretnina.lokacija = lokacija;
        nekretnina.broj_soba = broj_soba;
        nekretnina.povrsina = povrsina;     

    res.status(201).json({ message: "Nekretnina uspjesno dodana.", nekretnina });
    
});



router.patch("/nekretnine/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const nekretnina = nekretnine.find(nekretnina => nekretnina.id == id);
    if(!nekretnina) {
        return res.status(404).json({message: "nekretnina sa tim id-em ne postoji."});
    };
        const { naziv, opis, cijena, lokacija, broj_soba, povrsina } = req.body;
        if (naziv !== undefined) nekretnina.naziv = naziv;
        if (opis !== undefined) nekretnina.opis = opis;
        if (cijena !== undefined) nekretnina.cijena = cijena;
        if (lokacija !== undefined) nekretnina.lokacija = lokacija;
        if (broj_soba !== undefined) nekretnina.broj_soba = broj_soba;
        if (povrsina !== undefined) nekretnina.povrsina = povrsina;     

    res.status(201).json({ message: "Nekretnina uspjesno dodana.", nekretnina });
    
});


export default router;
