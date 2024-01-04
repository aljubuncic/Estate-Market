const divNekretnine = document.getElementById('nekretnine');

const spisakSvihNekretnina = SpisakNekretnina();

document.getElementById('filtriraj_dugme').addEventListener('click',filtrirajNekretnine);

document.body.addEventListener('click', function(event) {
    if (event.target.classList.contains('dugme_detalji')) {
        klikNekretnina(event);
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
        nekretninaKartica.setAttribute('id',nekretnina.id);
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
        dugme_container.appendChild(dugme_detalji);
        nekretninaKartica.appendChild(dugme_container);
    }
}


function filtrirajNekretnine(){
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

function klikNekretnina(event){
    let nekretninaKartica = event.target.parentNode.parentNode;
    nekretninaKartica.classList.toggle('expanded');
    let idNekretnine = event.target.id;
    MarketingAjax.klikNekretnina(parseInt(idNekretnine));
}

