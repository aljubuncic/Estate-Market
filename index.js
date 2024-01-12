const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcrypt');
const pripremaBaze = require(__dirname+'/config/priprema.js')();
const db = require(__dirname + '/config/db.js');
const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'neka tajna sifra',
    resave: false,
    saveUninitialized: true
}));

app.get('/detalji.html', function (req, res, next) {
    res.sendFile(__dirname + '/public/html/detalji.html', function (err) {
        if (err)
            throw err;
    });
});

app.get('/meni.html', function (req, res, next) {
    res.sendFile(__dirname + '/public/html/meni.html', function (err) {
        if (err)
            throw err;
    });
});

app.get('/nekretnine.html', function (req, res, next) {
    res.sendFile(__dirname + '/public/html/nekretnine.html', function (err) {
        if (err)
            throw err;
    });
});

app.get('/prijava.html', function (req, res, next) {
    res.sendFile(__dirname + '/public/html/prijava.html', function (err) {
        if (err)
            throw err;
    });
});

app.get('/profil.html', function (req, res, next) {
    res.sendFile(__dirname + '/public/html/profil.html', function (err) {
        if (err)
            throw err;
    });
});

app.post('/login', async function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    let korisnik = await db.korisnik.findOne({where: {username: req.body.username}});
    if (!korisnik) {
        res.status(401).json({greska: "Neuspješna prijava" });
        return;
    }
    bcrypt.compare(req.body.password, korisnik.password, function (err, result) {
        if (result) {
            req.session.username = req.body.username;
            res.status(200).json({ poruka: "Uspješna prijava" });
        }
        else
            res.status(401).json({ greska: "Neuspješna prijava" });
        
    });
});

app.post('/logout', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    if (req.session.username) {
        req.session.username = null;
        res.status(200).json({ poruka: "Uspješno ste se odjavili" });
    }
    else
        res.status(401).json({ greska: "Neautorizovan pristup" });
});

app.get('/korisnik',async function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    if (!req.session.username) {
        res.status(401).json({ greska: "Neautorizovan pristup" });
        return;
    }
    
    let korisnik = await db.korisnik.findOne({where: {username: req.session.username}});
    res.status(200).json(korisnik);
  
});

app.post('/upit',async function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    if (!req.session.username) {
        res.status(401).json({ greska: "Neautorizovan pristup" });
        return;
    }

    let korisnik = await db.korisnik.findOne({where: {username: req.session.username}});
    let nekretnina = await db.nekretnina.findOne({where: {id: req.body.nekretnina_id}});
    if(!nekretnina){
        res.status(400).json({greska: `Nekretnina sa id-em ${nekretnina_id} ne postoji`});
        return;
    }

    await db.upit.create({
        korisnik_id: korisnik.id,
        tekst_upita: req.body.tekst_upita,
        NekretninaId: nekretnina.id
    });
    res.status(200).json({poruka: "Upit je uspješno dodan"});
});

app.put('/korisnik',async function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    if (!req.session.username) {
        res.status(401).json({ greska: "Neautorizovan pristup" });
        return;
    }
    let korisnik = await db.korisnik.findOne({where: {username: req.session.username}});

    for (let key in req.body) {
        if(key == 'password'){
            let hashPassword = await bcrypt.hash(req.body[key],10);
            korisnik[key] = hashPassword;
        }
        else{
            korisnik[key] = req.body[key];
        }
    }
    req.session.username = korisnik.username;

    await korisnik.save();

    res.status(200).json({poruka: "Podaci su uspješno ažurirani"});
});

app.get('/nekretnine', async function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    let nekretnine = await db.nekretnina.findAll({
        include: [{model: db.upit, as: 'upiti'}]
    });
    res.status(200).json(nekretnine);
});

app.post('/marketing/nekretnine',async function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    let nekretnineIds = req.body.nizNekretnina;
    for(let nekretninaId of nekretnineIds){
        let nekretnina = await db.nekretnina.findByPk(nekretninaId);
        nekretnina.pretrage = nekretnina.pretrage + 1;
        await nekretnina.save();
    }
    res.status(200).json();
});

app.post('/marketing/nekretnina/:id',async function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    nekretninaId = parseInt(req.params.id);
    let nekretnina = await db.nekretnina.findByPk(nekretninaId);
    nekretnina.klikovi = nekretnina.klikovi + 1; 
    await nekretnina.save();
    res.status(200).json();
});

app.post('/marketing/osvjezi', async function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    let nekretnineIds = [];
    
    if (req.body.nizNekretnina) {
        nekretnineIds = req.body.nizNekretnina;
        req.session.nekretnineIds = nekretnineIds;
    }
    else {
        nekretnineIds = req.session.nekretnineIds;
    }

    let klikovipretrage = await db.nekretnina.findAll({
        attributes: ['id','pretrage','klikovi']
    });
    klikovipretrage = klikovipretrage.filter(x => nekretnineIds.find(y => y == x.id));
    //filtirianje na osnovu da li se promjenio broj klikova i pretraga za pojedine nekretnine u odnosu na prethodni poziv 
    klikovipretrageSaPromjenom = klikovipretrage.filter(function (element) {
        let prethodniOdgovorNekretnina = null;
        if (req.session.prethodniOdgovorNekretnine) // provjera da li je bilo poziva od prije
            prethodniOdgovorNekretnina = req.session.prethodniOdgovorNekretnine.find(x => x.id == element.id);
        if (!prethodniOdgovorNekretnina) // ako je neka nova nekeretnina koje nije bilo u proslom pozivu
            return true;
        //provjera da li su se vrijednosti klikova i pretraga promjenile
        if (prethodniOdgovorNekretnina.pretrage != element.pretrage || prethodniOdgovorNekretnina.klikovi != element.klikovi)
            return true;
        else
            return false;
    });

    req.session.prethodniOdgovorNekretnine = klikovipretrage;
    res.status(200).json({
        nizNekretnina: klikovipretrageSaPromjenom
    });
});

app.listen(port);