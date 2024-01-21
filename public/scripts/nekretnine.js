const divNekretnine = document.getElementById('nekretnine');

const spisakSvihNekretnina = SpisakNekretnina();

document.getElementById('filtriraj_dugme').addEventListener('click',filtrirajNekretnine);

document.body.addEventListener('click', function(event) {
    if (event.target.classList.contains('dugme_detalji')) {
        klikNekretnina(event);
    }
    if (event.target.classList.contains('dugme_otvori_detalje')) {
        localStorage.setItem('nekretninaId',event.target.id);
        window.location.href = 'http://localhost:3000/detalji.html';
    }
});

PoziviAjax.getNekretnine(function(error,data){
    if(error)
        throw error;
    spisakSvihNekretnina.init(data, null);
    filtrirajNekretnine();
    MarketingAjax.osvjeziPretrage(divNekretnine);
});


function spojiNekretnine(divReferenca, instancaModula) {
    const divStan = divReferenca.querySelector("#stan");
    const divKuca = divReferenca.querySelector("#kuca");
    const divPp = divReferenca.querySelector("#pp");
    // pozivanje metode za filtriranje
    let listaNekretnina = instancaModula.filtrirajNekretnine({});
    // iscrtavanje elemenata u divReferenca element
    if(!divReferenca)
            return;
    //brisanje postojećih kartica nekretnina
    while(divStan.firstChild){
        divStan.removeChild(divStan.firstChild);
    }
    while(divKuca.firstChild){
        divKuca.removeChild(divKuca.firstChild);
    }
    while(divPp.firstChild){
        divPp.removeChild(divPp.firstChild);
    }
    for(let nekretnina of listaNekretnina){
        
        let nekretninaKartica = document.createElement('div');
        nekretninaKartica.classList.add('kartica');

        if(nekretnina.tip_nekretnine == 'Stan')
            divStan.appendChild(nekretninaKartica);
        else if(nekretnina.tip_nekretnine == 'Kuća')
            divKuca.appendChild(nekretninaKartica);
        else if(nekretnina.tip_nekretnine == 'Poslovni prostor')
            divPp.appendChild(nekretninaKartica);

        let slika = document.createElement('img');
        if(nekretnina.tip_nekretnine == "Stan"){
            slika.setAttribute("src","https://s9.pik.ba/galerija/2022-10/24/09/slika-2885239-63563a6a9db97-velika.jpg");
            slika.setAttribute("alt", "slika_stana");
        }
        else if(nekretnina.tip_nekretnine == "Kuća"){
            slika.setAttribute("src","https://d4n0y8dshd77z.cloudfront.net/listings/48402278/lg/RO1vWyR7XFjqRJUL9Fiv.jpg");
            slika.setAttribute("alt", "slika_kuce");
        }
        else if(nekretnina.tip_nekretnine == "Poslovni prostor"){
            slika.setAttribute("src","https://d4n0y8dshd77z.cloudfront.net/listings/51142555/lg/l23HkpEopo5thbnpFacF.jpg");
            slika.setAttribute("alt", "slika_poslovnog_prostora");
        }
        nekretninaKartica.appendChild(slika);

        let naziv = document.createElement('p');
        naziv.appendChild(document.createTextNode(nekretnina.naziv));
        naziv.classList.add('naziv_nekretnine');
        nekretninaKartica.appendChild(naziv);
        
        let kvadratura = document.createElement('p');
        kvadratura.appendChild(document.createTextNode(nekretnina.kvadratura + " m^2"));
        kvadratura.classList.add('kvadratura');
        nekretninaKartica.appendChild(kvadratura);

        let lokacija = document.createElement('p');
        lokacija.appendChild(document.createTextNode(`Lokacija: ${nekretnina.lokacija}`));
        lokacija.classList.add('lokacija');
        nekretninaKartica.appendChild(lokacija);
        lokacija.style.display = 'none';

        let godinaIzgradnje = document.createElement('p');
        godinaIzgradnje.appendChild(document.createTextNode(`Godina izgradnje: ${nekretnina.godina_izgradnje}`));
        godinaIzgradnje.classList.add('godina_izgradnje');
        nekretninaKartica.appendChild(godinaIzgradnje);
        godinaIzgradnje.style.display = 'none';
        
        let pretrage = document.createElement('div');
        pretrage.setAttribute('id',`pretrage-${nekretnina.id}`);
        pretrage.appendChild(document.createTextNode('Pretrage: '));
        pretrage.classList.add('kvadratura');
        nekretninaKartica.appendChild(pretrage);
        
        let klikovi = document.createElement('div');
        klikovi.setAttribute('id',`klikovi-${nekretnina.id}`);
        klikovi.appendChild(document.createTextNode('Klikovi: '));
        klikovi.classList.add('kvadratura');
        nekretninaKartica.appendChild(klikovi);

        let cijena = document.createElement('p');
        cijena.appendChild(document.createTextNode(nekretnina.cijena + " KM"));
        cijena.classList.add('cijena');
        nekretninaKartica.appendChild(cijena);

        let dugme_container = document.createElement('div');
        dugme_container.classList.add('dugme_container');

        let dugme_detalji = document.createElement('input');
        dugme_detalji.setAttribute("type","button");
        dugme_detalji.setAttribute("value","Detalji");
        dugme_detalji.setAttribute("id",nekretnina.id);
        dugme_detalji.classList.add('dugme_detalji');

        let dugme_otvori_detalje = document.createElement('input');
        dugme_otvori_detalje.setAttribute("type","button");
        dugme_otvori_detalje.setAttribute("value","Otvori detalje");
        dugme_otvori_detalje.setAttribute("id",nekretnina.id);
        dugme_otvori_detalje.classList.add('dugme_otvori_detalje');
        dugme_otvori_detalje.style.display = 'none';

        dugme_container.appendChild(dugme_detalji);
        dugme_container.appendChild(dugme_otvori_detalje);
        nekretninaKartica.appendChild(dugme_container);
    }
}


function filtrirajNekretnine(){
    detaljiAlreadyClicked = null;
    min_cijena = document.getElementById('min_cijena').value;
    max_cijena = document.getElementById('max_cijena').value;
    min_kvadratura = document.getElementById('min_kvadratura').value;
    max_kvadratura = document.getElementById('max_kvadratura').value;
    kriterij = {
        ...(min_cijena!='') && {min_cijena: parseFloat(min_cijena)},
        ...(max_cijena!='') && {max_cijena: parseFloat(max_cijena)},
        ...(min_kvadratura!='') && {min_kvadratura: parseFloat(min_kvadratura)},
        ...(max_kvadratura!='') && {max_kvadratura: parseFloat(max_kvadratura)}
    };
    filtriraneNekretnine = spisakSvihNekretnina.filtrirajNekretnine(kriterij);
    let spisakFiltriranihNekretnina = SpisakNekretnina();
    spisakFiltriranihNekretnina.init(filtriraneNekretnine,null);
    MarketingAjax.novoFiltriranje(filtriraneNekretnine);
    spojiNekretnine(divNekretnine, spisakFiltriranihNekretnina);
}

let detaljiAlreadyClicked = null;

function klikNekretnina(event){
    // ako je već neka kartica nekretnine kliknuta
    if(detaljiAlreadyClicked){
        let nekretninaKartica = detaljiAlreadyClicked.parentNode.parentNode;
        toggleDetalji(nekretninaKartica);
        //ako je kliknuta ista nekretnina, ne povećavaj karticu na 500 px i ne povećavaj klikove u bazi
        if(detaljiAlreadyClicked == event.target){
            detaljiAlreadyClicked = null;
            return;
        }
    }

    detaljiAlreadyClicked = event.target;

    let nekretninaKartica = event.target.parentNode.parentNode;
    
    toggleDetalji(nekretninaKartica);

    let idNekretnine = event.target.id;
    MarketingAjax.klikNekretnina(parseInt(idNekretnine));
}
//povećaj ili smanji karticu u ovisnosti da li je prethodno bilo kliknuto dugme detalji ili ne
function toggleDetalji(nekretninaKartica){
    let lokacijaElement = nekretninaKartica.querySelector('.lokacija');
    let godinaIzgradnjeElement = nekretninaKartica.querySelector('.godina_izgradnje');
    let dugmeOtvoriDetalje = nekretninaKartica.querySelector('.dugme_otvori_detalje');
    nekretninaKartica.classList.toggle('expanded');
    lokacijaElement.style.display = (lokacijaElement.style.display === 'block') ? 'none' : 'block';
    godinaIzgradnjeElement.style.display = (godinaIzgradnjeElement.style.display === 'block') ? 'none' : 'block';
    dugmeOtvoriDetalje.style.display = (dugmeOtvoriDetalje.style.display === 'inline') ? 'none' : 'inline';
}