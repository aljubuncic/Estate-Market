function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {
    // pozivanje metode za filtriranje
    let listaNekretnina = instancaModula.filtrirajNekretnine({ tip_nekretnine: tip_nekretnine });
    // iscrtavanje elemenata u divReferenca element
    if(!divReferenca)
            return;
    for(let nekretnina of listaNekretnina){
        
        let nekretninaKartica = document.createElement('div');
        
        divReferenca.appendChild(nekretninaKartica);

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
        pretrage.appendChild(document.createTextNode());
        pretrage.classList.add('kvadratura');
        nekretninaKartica.appendChild(pretrage);
        
        let klikovi = document.createElement('div');
        klikovi.setAttribute('id',`klikovi-${nekretnina.id}`);
        klikovi.appendChild(document.createTextNode());
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
        dugme_detalji.classList.add('dugme_detalji');
        dugme_container.appendChild(dugme_detalji);
        nekretninaKartica.appendChild(dugme_container);
    }
}

const divStan = document.getElementById("stan");
const divKuca = document.getElementById("kuca");
const divPp = document.getElementById("pp");

let nekretnine = [];
let spisakNekretnina = SpisakNekretnina();

document.getElementById('filtriraj_dugme').addEventListener('click',filtrirajNekretnine);

PoziviAjax.getNekretnine(obradiNekretnine);

function obradiNekretnine(error,data){
    if(error)
        throw error;
    nekretnine = data;
    spisakNekretnina.init(nekretnine, null);
    prikaziNekretnine();
}

function filtrirajNekretnine(){
    min_cijena = document.getElementById('min_cijena').value;
    max_cijena = document.getElementById('max_cijena').value;
    min_kvadratura = document.getElementById('min_kvadratura').value;
    max_kvadratura = document.getElementById('max_kvadratura').value;
    kriterij = {
        ...(min_cijena!='') && {min_cijena: min_cijena},
        ...(max_cijena!='') && {max_cijena: max_cijena},
        ...(min_kvadratura!='') && {min_kvadratura: min_kvadratura},
        ...(max_kvadratura!='') && {max_kvadratura: max_kvadratura}
    };
    filtriraneNekretnine = spisakNekretnina.filtrirajNekretnine(kriterij);
    spisakNekretnina.init(filtriraneNekretnine);
    prikaziNekretnine();
}

function prikaziNekretnine(){
    spojiNekretnine(divStan, spisakNekretnina, "Stan");
    spojiNekretnine(divKuca, spisakNekretnina, "Kuća");
    spojiNekretnine(divPp, spisakNekretnina, "Poslovni prostor");
}
