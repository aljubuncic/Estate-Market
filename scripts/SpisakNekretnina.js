let SpisakNekretnina = function () {
    //privatni atributi modula
    let listaNekretnina = [];
    let listaKorisnika = [];


    //implementacija metoda
    let init = function (nekretnine, korisnici) {
        listaNekretnina = nekretnine;
        listaKorisnika = korisnici;
    }

    let filtrirajNekretnine = function (kriterij) {
        let filtriraneNekretnine = listaNekretnina;
        for(let filter in kriterij){
            if(filter == "tip_nekretnine"){
                filtriraneNekretnine = filtriraneNekretnine.filter(nekretnina => nekretnina.tip_nekretnine == kriterij[filter]);
                continue;
            }
            if(filter == "min_kvadratura"){
                filtriraneNekretnine = filtriraneNekretnine.filter(nekretnina => nekretnina.kvadratura >= kriterij[filter]);
                continue;
            }
            if(filter == "max_kvadratura"){
                filtriraneNekretnine = filtriraneNekretnine.filter(nekretnina => nekretnina.kvadratura <= kriterij[filter]);
                continue;
            }
            if(filter == "min_cijena"){
                filtriraneNekretnine = filtriraneNekretnine.filter(nekretnina => nekretnina.cijena >= kriterij[filter]);
                continue;
            }
            if(filter == "max_cijena"){
                filtriraneNekretnine = filtriraneNekretnine.filter(nekretnina => nekretnina.cijena <= kriterij[filter]);
                continue;
            }
        }
        return filtriraneNekretnine;
    }

    let ucitajDetaljeNekretnine = function (id) {
        let nekretnina = listaNekretnina.find(nekretnina => nekretnina.id == id);
        if(nekretnina == undefined)
            return null;
        return nekretnina;
    }


    return {
        init: init,
        filtrirajNekretnine: filtrirajNekretnine,
        ucitajDetaljeNekretnine: ucitajDetaljeNekretnine
    }
};