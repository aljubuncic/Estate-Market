const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcrypt');
const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
   secret: 'neka tajna sifra',
   resave: true,
   saveUninitialized: true
}));

app.get('/detalji.html',function(req,res,next){
    res.sendFile(__dirname + '/public/html/detalji.html',function(err){
        if(err)
            throw err;
    });
});

app.get('/meni.html',function(req,res,next){
    res.sendFile(__dirname + '/public/html/meni.html',function(err){
        if(err)
            throw err;
    });
});

app.get('/nekretnine.html',function(req,res,next){
    res.sendFile(__dirname + '/public/html/nekretnine.html',function(err){
        if(err)
            throw err;
    });
});

app.get('/prijava.html',function(req,res,next){
    res.sendFile(__dirname + '/public/html/prijava.html',function(err){
        if(err)
            throw err;
    });
});

app.get('/profil.html',function(req,res,next){
    res.sendFile(__dirname + '/public/html/profil.html',function(err){
        if(err)
            throw err;
    });
});

app.post('/login', async function(req,res,next){
    res.setHeader('Content-Type','application/json');
    let requestBody = req.body;
    fs.readFile(__dirname + '/data/korisnici.json','utf8',async function(err,data){
        if(err)
            throw err;
        let users = JSON.parse(data);
        let user = users.find(user => user.username == requestBody.username);
        if(!user){
            res.status(401).json({"greska": "Nepostojeći korisnik"});
            return;
        }     
        bcrypt.compare(requestBody.password, user.password, function(err, result) {
            if(result) {   
                req.session.username = requestBody.username;
                res.status(200).json({"poruka": "Uspješna prijava"});
            }
            else
                res.status(401).json({"greska": "Neuspješna prijava"});
        });
    });
});

app.post('/logout',function(req,res,next){
    res.setHeader('Content-Type','application/json');
    if(req.session.username){
        req.session.username = null;
        res.status(200).json({"poruka":"Uspješno ste se odjavili"});
    }
    else
        res.status(401).json({"greska":"Neautorizovan pristup"});
});

app.get('/korisnik',function(req,res,next){
    res.setHeader('Content-Type','application/json');
    if(!req.session.username){
        res.status(401).json({"greska":"Neautorizovan pristup"});
        return;
    }
    fs.readFile(__dirname + '/data/korisnici.json','utf8',function(err,data){
        if(err)
            throw err;
        let users = JSON.parse(data);
        let user = users.find(u => u.username == req.session.username);
        res.status(200).json(user);
    });
});

app.post('/upit',function(req,res,next){
    res.setHeader('Content-Type','application/json');
    if(!req.session.username){
        res.status(401).json({"greska":"Neautorizovan pristup"});
        return;
    }
    let requestBody = req.body;
    fs.readFile(__dirname + '/data/nekretnine.json','utf8',function(err,data){
        if(err)
            throw err;
        let estates = JSON.parse(data);
        let estate = estates.find(e => e.id == requestBody.nekretnina_id);
        if(!estate){
            res.status(400).json({"greska":`Nekretnina sa id-em ${requestBody.nekretnina_id} ne postoji`});
            return;
        }
        fs.readFile(__dirname + '/data/korisnici.json','utf8',async function(err,data){
            if(err)
                throw err;
            let users = JSON.parse(data);
            let user = users.find(u => u.username == req.session.username);
            estate.upiti.push({
                korisnik_id: user.id,
                tekst_upita: requestBody.tekst_upita
            });
            await updateEntityInJsonFile(estates,estate,'nekretnine',res,'Upit je uspješno dodan');   
        });
    });
});

app.put('/korisnik',function(req,res,next){
    res.setHeader('Content-Type','application/json');
    if(!req.session.username){
        res.status(401).json({"greska":"Neautorizovan pristup"});
        return;
    }
    let requestBody = req.body;
    fs.readFile(__dirname + '/data/korisnici.json','utf8',async function(err,data){
        if(err)
            throw err;
        let users = JSON.parse(data);
        let user = users.find(u => u.username == req.session.username);

        if('password' in requestBody){
            bcrypt.hash(requestBody.password, 10, async function(err, hash) {
                user.password = hash;
                for(let key in requestBody){
                    if(key != 'password')  
                        user[key] = requestBody[key];
                }
                await updateEntityInJsonFile(users,user,'korisnici',res,'Podaci su uspješno ažurirani');   
            });
        }
        else {
            for(let key in requestBody){
                user[key] = requestBody[key];
            }
            await updateEntityInJsonFile(users,user,'korisnici',res,'Podaci su uspješno ažurirani');
        }   
    });
});

app.get('/nekretnine', function(req,res,next){
    res.setHeader('Content-Type','application/json');
    fs.readFile(__dirname + '/data/nekretnine.json','utf8',function(err,data){
        if(err)
            throw err;
        let estates = JSON.parse(data);
        res.status(200).json(estates);
    });
});

app.post('/marketing/nekretnine', function(req,res,next){
    res.setHeader('Content-Type','application/json');
    requestBody = req.body;
    nekretnine_ids = requestBody.nizNekretnina;
    fs.readFile(__dirname + '/data/klikovipretrage.json','utf8',async function(err,data){
        if(err)
            throw err;
        klikovipretrage = JSON.parse(data);
        for(nekretnina_id of nekretnine_ids){
            klikpretraga = klikovipretrage.find(x => x.id == nekretnina_id);
            if(klikpretraga){
                object = {
                    id: nekretnina_id,
                    pretrage: klikpretraga.pretrage + 1,
                    klikovi: klikpretraga.klikovi
                }
                klikovipretrage = await updateEntityInJsonFile(klikovipretrage,object,'klikovipretrage',null,null); 
            }
            else {
                object = {
                    id: nekretnina_id,
                    pretrage: 1,
                    klikovi: 0
                }
                klikovipretrage = await updateEntityInJsonFile(klikovipretrage,object,'klikovipretrage',null,null);
            }
        }
        res.status(200).end();
    });
});

app.post('/marketing/nekretnina/:id',function(req,res,next){
    res.setHeader('Content-Type','application/json');
    nekretnina_id = parseInt(req.params.id);
    fs.readFile(__dirname + '/data/klikovipretrage.json',async function(err,data){
        if(err)
            throw err;  
        klikovipretrage = JSON.parse(data);
        klikpretraga = klikovipretrage.find(x => x.id == nekretnina_id);
        if(!klikpretraga)
            object = {
                id: nekretnina_id,
                pretrage: 0,
                klikovi: 1
            }
        else
            object = {
                id: nekretnina_id,
                pretrage: klikpretraga.pretrage,
                klikovi: klikpretraga.klikovi + 1
            }
            
        await updateEntityInJsonFile(klikovipretrage,object,'klikovipretrage',res,null);
    })
});

var prethodniPozivNekretnine = [];

app.post('/marketing/osvjezi',async function(req,res,next){
    res.setHeader('Content-Type','application/json');
    try{
        let nekretnineIds = [];
        if(req.body.nizNekretnina){
            nekretnineIds = req.body.nizNekretnina;
            req.session.nekretnineIds = nekretnineIds;
        }
        else
            nekretnineIds = req.session.nekretnineIds;
        let data = await fs.promises.readFile(__dirname + '/data/klikovipretrage.json','utf8');
        klikovipretrage = JSON.parse(data);
        klikovipretrage = klikovipretrage.filter(x => nekretnineIds.find(y => y == x.id));
        //filtirianje na osnovu da li se promjenio broj klikova i pretraga za pojedine nekretnine u odnosu na prethodni poziv 
        result = klikovipretrage.filter(function(element){
            prethodniPozivNekretnina = prethodniPozivNekretnine.find(x => x.id == element.id);
            if(!prethodniPozivNekretnina) // ako je neka nova nekeretnina koje nije bilo u proslom pozivu
                return true;
            //provjera da li su se vrijednosti klikova i pretraga promjenile
            if(prethodniPozivNekretnina.pretrage != element.pretrage || prethodniPozivNekretnina.klikovi != element.klikovi)
                return true;
            else
                return false;
        });

        prethodniPozivNekretnine = klikovipretrage;
            res.status(200).json({
                nizNekretnina: result
            });
        }
    catch(ex){
        throw ex;
    }
});


app.listen(port);


// vidjeti smije li biti u index.js
async function updateEntityInJsonFile(entities, entity, JSONFile, res, responseMessage){
    entities = entities.filter(e => e.id!=entity.id);
    entities.push(entity);
    try{
        await fs.promises.writeFile(__dirname + `/data/${JSONFile}.json`,JSON.stringify(entities));
    }
    catch(err){
        throw err;
    }
    if(res){
        if(responseMessage)
            res.status(200).send({"poruka": responseMessage});
        else
            res.status(200).end();
    }
    return entities;
}