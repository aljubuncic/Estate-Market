const PoziviAjax = (() => {

    // fnCallback se u svim metodama poziva kada stigne
    // odgovor sa servera putem Ajax-a
    // svaki callback kao parametre ima error i data,
    // error je null ako je status 200 i data je tijelo odgovora
    // ako postoji greška, poruka se prosljeđuje u error parametru
    // callback-a, a data je tada null

    // vraća korisnika koji je trenutno prijavljen na sistem
    function impl_getKorisnik(fnCallback) {
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200){
                let result = JSON.parse(ajax.responseText);
                fnCallback(null,result);
            }
            else if(ajax.readyState == 4){
                let errorMessage = JSON.parse(ajax.responseText);
                fnCallback(errorMessage,null);
            }
        }
        ajax.open('GET', 'http://localhost:3000/korisnik', true);
        ajax.send();
    }

    // ažurira podatke loginovanog korisnika
    function impl_putKorisnik(noviPodaci, fnCallback) {
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200){
                let result = JSON.parse(ajax.responseText);
                fnCallback(null,result);
            }
            else if(ajax.readyState == 4){
                let errorMessage = JSON.parse(ajax.responseText);
                fnCallback(errorMessage,null);
            }
        }
        ajax.open('PUT', 'http://localhost:3000/korisnik', true);
        ajax.setRequestHeader('Content-Type','application/json');
        ajax.send(JSON.stringify(noviPodaci));
    }

    // dodaje novi upit za trenutno loginovanog korisnika
    function impl_postUpit(nekretnina_id, tekst_upita, fnCallback) {
        let data = {
            nekretnina_id: nekretnina_id,
            tekst_upita: tekst_upita
        };
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200){
                let result = JSON.parse(ajax.responseText);
                fnCallback(null,result);
            }
            else if(ajax.readyState == 4){
                let errorMessage = JSON.parse(ajax.responseText);
                fnCallback(errorMessage,null);
            }
        }
        ajax.open('POST', 'http://localhost:3000/upit', true);
        ajax.setRequestHeader('Content-Type','application/json');
        ajax.send(JSON.stringify(data));
    }

    function impl_getNekretnine(fnCallback) {
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200){
                let result = JSON.parse(ajax.responseText);
                fnCallback(null,result);
            }
        }
        ajax.open('GET', 'http://localhost:3000/nekretnine', true);
        ajax.send();
    }

    function impl_postLogin(username, password, fnCallback) {
        let data = {
            username: username,
            password: password
        };
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200){
                let result = JSON.parse(ajax.responseText);
                fnCallback(null,result);
            }
            else if(ajax.readyState == 4){
                let errorMessage = JSON.parse(ajax.responseText);
                fnCallback(errorMessage,null);
            }
        }
        ajax.open('POST', 'http://localhost:3000/login', true);
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send(JSON.stringify(data));
    }

    function impl_postLogout(fnCallback) {
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200){
                let result = JSON.parse(ajax.responseText);
                fnCallback(null,result);
            }
            else if(ajax.readyState == 4){
                let errorMessage = JSON.parse(ajax.responseText);
                fnCallback(errorMessage,null);
            }
        }
        ajax.open('POST', 'http://localhost:3000/logout', true);
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send();
    }

    return {
        postLogin: impl_postLogin,
        postLogout: impl_postLogout,
        getKorisnik: impl_getKorisnik,
        putKorisnik: impl_putKorisnik,
        postUpit: impl_postUpit,
        getNekretnine: impl_getNekretnine
    };
})();