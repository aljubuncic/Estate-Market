Pitanja postavljena AI:

why to use path module in node
is data from html forms always sent in x www url encoded format in post requests in express
so if the json middleware ofr express convrets data from html form in x ww url encoded to json format
but if the data is sent to server as x www urlencoded, to get it in a json format a can use both middlewares, for x www urlencoded and json
when html is brought in by iframe, are the scripts also included which  go with that html file
how to access an element in js which is in a page which is loaded through an iframe
how to modify page which is in iframe of teh current page (in my case it is a menu page) but i want to see the changes everwhere that menu is instanitaited through the iframe (so i want to modfiy menu.html)
so will the menu be changed on all pages that have a ifrmae containing menu
but stil when i switch to other pages, it does not show up new content in iframe, all pages are hosted on http://localhost:3000
does window.onload for a page in the iframe exectues every time a iframe is created
my menu item is not always there, in some cases iti is and i want to add an event listener to it when clicked in js file, but it says it cannot read properties of a null
it is always saying that it cannot read properties of a null
can it be because the elemnet id created dynamically 
can the click be registered ona <a> if there is no href attribute
can the fs.writeFile be used with await 
will the method fs.promises.writeFile throw an error if it is in a try catch block
I have a for loop where in every iteration there is a writing in the file, but the file is not how it should look like, i have used await and fs.promises.writeFile
klikovipretrage = klikovipretrage.filter(x => nekretnineIds.find(y => y.id == x.id)); why this does not work
if body for request is not sent is req.body null
is express session automatically started when the server is started through node server.js
how to remove all child nodes from parent node
if a have a divRefrenece which is a reference to a grid div how do i  get grid items through that 
how do i get all divs from that divReference
how to get a id atribute from a  html element
ajax.send(JSON.stringify({nizNekretnina: nizNekretnina}));  Unexpected end of JSON input
    at JSON.parse (<anonymous>)
if  nizNekretnina is empty, the object which is sent will have no properties?
how can i configure it so it always stringifies it to {"nizNekretnina":[]}
will teh sessionStorage be the same if i redirect to other page in the same tab for exammple http://localhost:3000/nekretnine.html to http://localhost:3000/profil.html
does the express session also work in that way
i have mutiple buttons on te website for each grid item and add an event listener, how do i access the button on whih the click action was executed
document.getElementsByClassName('dugme_detalji').addEventListener('click',klikNekretnine); so i cant do this?
my button is like a <input type = button>
my buttons are dynamically created
why do i need to use event delegation when buttons are dynamically cretaed
so if in the js script the function which dynamically creates buttons is before the code that adds event listeners to that buttons, it may also not work?
so you cannot add event listeners through a prevoous way of getting all html elements and adding event listeners in a loop, regardless 
SyntaxError: Unexpected end of JSON input
    at JSON.parse (<anonymous>)
    at C:\faks\5.semestar\WT\wt23p19023\index.js:182:32
    at FSReqCallback.readFileAfterClose [as oncomplete] (node:internal/fs/read/context:68:3)
how to remove text content from div
how to remove text node from div
how to set box sizing 
through js
SyntaxError: Unexpected end of JSON input at FSReqCallback.readFileAfterClose [as oncomplete] (node:internal/fs/read/context:68:3)
    at JSON.parse (<anonymous>)
undefined:1
async function updateEntityInJsonFile(entities, entity, JSONFile, res, responseMessage) {
    entities = entities.filter(e => e.id != entity.id);
    entities.push(entity);
    try {
        await fs.promises.writeFile(__dirname + `/data/${JSONFile}.json`, JSON.stringify(entities));
    }
    catch (err) {
        throw err;
    }
    if (res) {
        if (responseMessage)
            res.status(200).send({ "poruka": responseMessage });
        else
            res.status(200).end();
    }
    return entities;
} can this function sometimes delete everythong from the file but then dont populate with json data, just leave it empty?
if i have a <ul> and in that a have a <li> and in <li> i have <a> is <a> element a child of <ul>
in js if i execute remove child on the <ul> element and teh parameter is the <a> element will that work given the html structure in the prevoius example
if its not the direct child what would happen
vale uf href but  dose not redirecz anywhere?
no i want it to not redirect anywhere
so thois wont reload the page or redirect or anything
bu the link is in the iframe and it redirects to iframe page i want it o sty on the same page
does foreach change elemnts in a js array
how to change elements of array 
if two methods whic are async  and have await and write/read the same file and are called one after the other, will there be a prblem
im getting error unexpected edn of json input
app.post('/marketing/nekretnine', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    requestBody = req.body;
    nekretnineIds = requestBody.nizNekretnina;
    fs.readFile(__dirname + '/data/klikovipretrage.json', 'utf8', function (err, data) {
        if (err)
            throw err;
        klikovipretrage = JSON.parse(data);
        for(let nekretninaId of nekretnineIds){
            let index = klikovipretrage.findIndex(x => x.id == nekretninaId);
            if(index == -1)
                klikovipretrage.push({
                    id: nekretninaId,
                    pretrage: 1,
                    klikovi: 0
                });
            else
                klikovipretrage[index].pretrage++;
        }
        fs.writeFile(__dirname + '/data/klikovipretrage.json',JSON.stringify(klikovipretrage),function(error){
            if(error)
                throw error;
            res.status(200).end();
        });
    });
});

app.post('/marketing/nekretnina/:id', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    nekretnina_id = parseInt(req.params.id);
    fs.readFile(__dirname + '/data/klikovipretrage.json', function (err, data) {
        if (err)
            throw err;
        klikovipretrage = JSON.parse(data);
        klikpretraga = klikovipretrage.find(x => x.id == nekretnina_id);
        if (!klikpretraga)
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
        fs.writeFile(__dirname + '/data/klikovipretrage.json',JSON.stringify(klikovipretrage),function(error){
            if(error)
                throw error;
            res.status(200).end();
        });
    });
});

app.post('/marketing/osvjezi', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    let nekretnineIds = [];
    if (req.body.nizNekretnina) {
        nekretnineIds = req.body.nizNekretnina;
        req.session.nekretnineIds = nekretnineIds;
    }
    else {
        nekretnineIds = req.session.nekretnineIds;
    }
    
    fs.readFile(__dirname + '/data/klikovipretrage.json', 'utf8', function (error, data) {
        if(error)
            throw error;
        let klikovipretrage = JSON.parse(data); //line 245  
        klikovipretrage = klikovipretrage.filter(x => nekretnineIds.find(y => y == x.id));
        //provjera da li postoje neke nekretnine bez pretraga i klikova
        for(nekretninaId of nekretnineIds){
            if(!klikovipretrage.find(x => x.id == nekretninaId))
                klikovipretrage.push({
                    id: nekretninaId,
                    pretrage: 0,
                    klikovi: 0
                });
        }
        //filtirianje na osnovu da li se promjenio broj klikova i pretraga za pojedine nekretnine u odnosu na prethodni poziv 
        result = klikovipretrage.filter(function (element) {
            let prethodniPozivNekretnina = null;
            if (req.session.prethodniPozivNekretnine) // provjera da li je bilo poziva od prije
                prethodniPozivNekretnina = req.session.prethodniPozivNekretnine.find(x => x.id == element.id);
            if (!prethodniPozivNekretnina) // ako je neka nova nekeretnina koje nije bilo u proslom pozivu
                return true;
            //provjera da li su se vrijednosti klikova i pretraga promjenile
            if (prethodniPozivNekretnina.pretrage != element.pretrage || prethodniPozivNekretnina.klikovi != element.klikovi)
                return true;
            else
                return false;
        });

        req.session.prethodniPozivNekretnine = klikovipretrage;
        res.status(200).json({
            nizNekretnina: result
        });

    });
});

Unexpected end of JSON input
    at JSON.parse (<anonymous>)
    at C:\faks\5.semestar\WT\wt23p19023\index.js:245:36
    at FSReqCallback.readFileAfterClose [as oncomplete] (node:internal/fs/read/context:68:3)
when teh fs.write file is executed what is the default format
if i had a grid which had this: grid-template-columns: repeat(auto-fit,300px); now when the button is clicked i want that grid item to  have a 500px width but that grid item cant overlap the others
but i want only that grid utem to be 500 px, not all items in the spicified column
what does span do
i would like the height to stay the same
i want the gap between grid items to stay the same 
how to include express session in non express file
so i cannot use the session outside of the app. methods
i want tio access sesiion in the method that is not a method of express()
how to include express session in non express file
can i return a session object through a route
app.post('/marketing/osvjezi', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    let nekretnineIds = [];
    console.log('--------------------------');
    console.log('Request body: ', req.body);
    if (req.body.nizNekretnina) {
        nekretnineIds = req.body.nizNekretnina;
        req.session.nekretnineIds = nekretnineIds;
        console.log('req.session.nekretnineIds: (kada je req.body neprazan) ',req.session.nekretnineIds)
    }
    else {
        nekretnineIds = req.session.nekretnineIds;
    }
    console.log('req.session.nekretnineIds: ', req.session.nekretnineIds);
    console.log('NekretnineIds: ', nekretnineIds);   it does not store anything in req.sesion.nekretnineIds
whta does resave do in session object
in my case is set to true, is it causing a problem
i use this to strei arrays, is there a different way of storing arrays in session
i discovred teh problem was i was storing too much data in session 
does it take more memory a array of numbers of a json string representation of numbers 
what is req.sessionStore and how can i store data in that
why when i use req.session  i get undefined data i passed to
how to query selector all elemnts with id that has a always a same substring
is resqponse header Content-Type automaticlly set to application/json if i send a res.json()
what happens when a session is destroyed and i assign a req.sesionsomeVariable  = someValue
what is next parameter in  express route call back functions
what happens when you compare two arrays in js using ==
what if you compare it with ===