let username = null;

PoziviAjax.getKorisnik(function(error, data){
    if(error)
        return;
    username = data.username;
    napraviDivZaUnosUpita();  
});

document.body.addEventListener('click', function(event) {
    if (event.target.classList.contains('dugme_posalji_upit')) {
        let tekstUpita = document.querySelector('.tekst_upita').value;
        posaljiUpit(event, tekstUpita);
    }
});

function napraviDivZaUnosUpita(){
    let divUnos = document.createElement('div');

    let tekstUpitaElement = document.createElement('textarea');
    tekstUpitaElement.classList.add('tekst_upita');
    let posaljiUpitDugme = document.createElement('input');
    posaljiUpitDugme.setAttribute('type', 'button');
    posaljiUpitDugme.setAttribute('value', 'Pošalji upit');
    posaljiUpitDugme.classList.add('dugme_posalji_upit');

    divUnos.appendChild(tekstUpitaElement);
    divUnos.appendChild(posaljiUpitDugme);

    document.body.appendChild(divUnos);
}

function posaljiUpit(event, tekstUpita){
    PoziviAjax.postUpit(nekretninaId, tekstUpita, function (error, data){
        if(error)
        	return error;
        upit = {
            tekst_upita: tekstUpita,
            korisnik: {
                username: username
            }
        };
        prikaziUpit(upit, upitiElement);
    });
}