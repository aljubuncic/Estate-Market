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

let listaNekretnina = [{
    id: 1,
    tip_nekretnine: "Stan",
    naziv: "Useljiv stan Sarajevo",
    kvadratura: 58,
    cijena: 232000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},
{
    id: 2,
    tip_nekretnine: "Poslovni prostor",
    naziv: "Mali poslovni prostor",
    kvadratura: 20,
    cijena: 70000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
},
{
    id: 3,
    tip_nekretnine: "Stan",
    naziv: "Stan Dobrinja Novogradnja",
    kvadratura: 54,
    cijena: 149792,
    tip_grijanja: "plin",
    lokacija: "Dobrinja",
    godina_izgradnje: 2022,
    datum_objave: "28.11.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},
{
    id: 4,
    tip_nekretnine: "Stan",
    naziv: "Stan Sarajevo - Centar Poljine",
    kvadratura: 62,
    cijena: 250000,
    tip_grijanja: "plin",
    lokacija: "Centar",
    godina_izgradnje: 2022,
    datum_objave: "27.03.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},
{
    id: 5,
    tip_nekretnine: "Kuća",
    naziv: "Kuća na Vlakovu",
    kvadratura: 70,
    cijena: 330000,
    tip_grijanja: "plin",
    lokacija: "Ilidža",
    godina_izgradnje: 2020,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},
{
    id: 6,
    tip_nekretnine: "Kuća",
    naziv: "Kuća Bosanski Brod",
    kvadratura: 80,
    cijena: 110000,
    tip_grijanja: "plin",
    lokacija: "Bosanski Brod",
    godina_izgradnje: 2017,
    datum_objave: "13.08.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},
{
    id: 7,
    tip_nekretnine: "Kuća",
    naziv: "Kuća Sarajevo - Centar",
    kvadratura: 110,
    cijena: 220000,
    tip_grijanja: "plin",
    lokacija: "Centar",
    godina_izgradnje: 2020,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},
{
    id: 8,
    tip_nekretnine: "Poslovni prostor",
    naziv: "Poslovni prostor Gradačac",
    kvadratura: 130,
    cijena: 100000,
    tip_grijanja: "struja",
    lokacija: "Gradačac",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
},
{
    id: 9,
    tip_nekretnine: "Poslovni prostor",
    naziv: "Poslovni prostor Pofalići",
    kvadratura: 79,
    cijena: 158000,
    tip_grijanja: "struja",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2003,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
}
]

let listaKorisnika = [{
    id: 1,
    ime: "Neko",
    prezime: "Nekic",
    username: "username1",
},
{
    id: 2,
    ime: "Neko2",
    prezime: "Nekic2",
    username: "username2",
}]

//instanciranje modula
let nekretnine = SpisakNekretnina();
nekretnine.init(listaNekretnina, listaKorisnika);

//pozivanje funkcije
spojiNekretnine(divStan, nekretnine, "Stan");
spojiNekretnine(divKuca, nekretnine, "Kuća");
spojiNekretnine(divPp, nekretnine, "Poslovni prostor");