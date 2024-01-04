const MarketingAjax = (()=>{
    
    let dohvaceniPodaci; //lista objekata nekretnina koji ce se dobaviti
    let nekretnineIds; // lista id-eva nekretnina koji ce se dobaviti
    let prethodniZahtjevNekretnineIds = []; // lista id-eva nekretnina koji su dobavljeni u proslom pozovu

    function impl_osvjeziPretrage(divNekretnine){
        function osvjezi(){
            let nizNekretnina = nekretnineIds;
            
            let ajax = new XMLHttpRequest();
    
            ajax.open('POST', 'http://localhost:3000/marketing/osvjezi', true);
            ajax.setRequestHeader('Content-Type','application/json');
            
            if(!dohvaceniPodaci)
                ajax.send(JSON.stringify({nizNekretnina: nizNekretnina}));
            else{
                if(nekretnineIds === prethodniZahtjevNekretnineIds){
                    ajax.send();
                }
                else
                    ajax.send(JSON.stringify({nizNekretnina: nizNekretnina}));
            }

            ajax.onreadystatechange = function(){
                if(ajax.readyState == 4 && ajax.status == 200){
                    dohvaceniPodaci = JSON.parse(ajax.responseText).nizNekretnina;
                    for(let podatak of dohvaceniPodaci){
                        let pretragaDiv = divNekretnine.querySelector(`#pretrage-${podatak.id}`);
                        if(pretragaDiv){
                            pretragaDiv.style.display = '';
                            pretragaDiv.textContent = '';
                            pretragaDiv.appendChild(document.createTextNode(`Pretrage: ${podatak.pretrage}`));
                        }
                    }
                    prethodniZahtjevNekretnineIds = nekretnineIds;
                    impl_osvjeziKlikove(divNekretnine);
                }
                else if(ajax.readyState == 4){
                    console.log('greska u fetchanju pretraga');
                    //nikada nije bilo uspješnog poziva
                    if(!dohvaceniPodaci){
                        let pretrageDivs = document.querySelectorAll('[id*=pretrage]');
                        for(let i = 0; i < pretrageDivs.length; i++ )
                            pretrageDivs[i].style.display = 'none';
                    }
                    impl_osvjeziKlikove(divNekretnine);
                }
            }
        }

        osvjezi();
        
        setInterval(function(){
            osvjezi()
        }, 500);
        
    }

    function impl_osvjeziKlikove(divNekretnine){
        //ako nikada nije bilo uspješnog poziva
        if(!dohvaceniPodaci){
            let klikoviDivs = document.querySelectorAll('[id*=klikovi]');
            for(let i = 0; i < klikoviDivs.length; i++ )
                klikoviDivs[i].style.display = 'none';
        }
        else{
            for(let podatak of dohvaceniPodaci){
                let klikoviDiv = divNekretnine.querySelector(`#klikovi-${podatak.id}`);
                if(klikoviDiv){
                    klikoviDiv.style.display = '';
                    klikoviDiv.textContent = '';
                    klikoviDiv.appendChild(document.createTextNode(`Klikovi: ${podatak.klikovi}`));
                }
            }
        }
    }

    function impl_novoFiltriranje(listaFiltriranihNekretnina){
        nekretnineIds = listaFiltriranihNekretnina.map(x => x.id);
        nizNekretnina = nekretnineIds;
       
        let ajax = new XMLHttpRequest();

        ajax.open('POST', 'http://localhost:3000/marketing/nekretnine', true);
        ajax.setRequestHeader('Content-Type','application/json');
        ajax.send(JSON.stringify({nizNekretnina: nizNekretnina}));

        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200){
                console.log('Pretrage nekretnina azurirane');
            }
            else if(ajax.readyState == 4){
                console.log('Greska u azuriranju pretraga nekretnina');
            }
        }
    }

    function impl_klikNekretnina(idNekretnine){
        nekretnineIds = [idNekretnine]; 
        let ajax = new XMLHttpRequest();

        ajax.open('POST', `http://localhost:3000/marketing/nekretnina/${idNekretnine}`, true);
        ajax.send();
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200){
                console.log('Klik nekretnine azuriran');
            }
            else if(ajax.readyState == 4){
                console.log('Greska u azuriranju klika nekretnine');
            }
        }
    }
    
    return {
        osvjeziPretrage: impl_osvjeziPretrage,
        osvjeziKlikove: impl_osvjeziKlikove,
        novoFiltriranje: impl_novoFiltriranje,
        klikNekretnina: impl_klikNekretnina
    }
})();