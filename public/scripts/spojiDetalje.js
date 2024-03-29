const nekretninaId = parseInt(localStorage.getItem('nekretninaId'));
const upitiElement= document.getElementById('upiti');

window.onload =  function(){
    popuniDetaljeNekretnine();
}

function popuniDetaljeNekretnine(){
    PoziviAjax.getNekretninaById(nekretninaId,function(err,data){
        if(err)
            return;
        for(let key in data){
            let htmlElement = document.getElementById(key);
            if(htmlElement){
                if(key == 'upiti')
                    popuniUpite(data[key]);
                else
                    htmlElement.textContent = data[key];
            }
        }
    });
}

function popuniUpite(upiti){
    while(upitiElement.firstChild){
        upitiElement.removeChild(upitiElement.firstChild);
    }
    for(let upit of upiti){
        prikaziUpit(upit, upitiElement);
    }
}

function prikaziUpit(upit, upitiElement){
    let listElement = document.createElement('li');
        
    let usernameElement = document.createElement('b');
    usernameElement.appendChild(document.createTextNode(upit.korisnik.username));

    let tekstUpitaElement = document.createElement('p');
    tekstUpitaElement.appendChild(document.createTextNode(upit.tekst_upita));

    listElement.appendChild(usernameElement);
    listElement.appendChild(tekstUpitaElement);
    upitiElement.appendChild(listElement);
}
