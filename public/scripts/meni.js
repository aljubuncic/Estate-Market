window.onload = function(){
    PoziviAjax.getKorisnik(function(error,data){
        if(data)
            displayAccordingMenuItems(true);
        else
            displayAccordingMenuItems(false);
    });
    document.addEventListener('click', function(event) {
        if (event.target.id === 'odjava') {
                PoziviAjax.postLogout(function(error,data){
                    if(data){
                        window.location.href = 'http://localhost:3000/prijava.html';
                        displayAccordingMenuItems(false);
                }
            });
        }   
    });
}


/*document.addEventListener('DOMContentLoaded', function(){
    console.log(document.getElementById('odjava'));
document.getElementById('odjava').addEventListener('click',function(){
        PoziviAjax.postLogout(function(error,data){
            if(data)
                displayAccordingMenuItems(false)
            window.location.replace('http://localhost:3000/prijava.html');
        });
    }); 
});*/

window.addEventListener('message',function(event){
    const eventData = event.data;
    if(eventData.action === 'displayOdjavaAndProfil'){
        displayAccordingMenuItems(true);
    }
});

function displayAccordingMenuItems(loggedIn){
    if(!loggedIn){
        removeMenuItem('odjava');
        removeMenuItem('profil');
        displayMenuItem('/prijava.html','prijava','Prijava');
    }
    else{
        removeMenuItem('prijava');
        displayMenuItem(null,'odjava','Odjava');
        displayMenuItem('/profil.html','profil','Profil');
    }
}

function displayMenuItem(href,attributeId,linkText){
    menuList = document.getElementById('menu');

    let prijavaListItem = document.createElement('li');
    let prijavaLink = document.createElement('a');
    if(href)
        prijavaLink.setAttribute('href',href);
    prijavaLink.setAttribute('id',attributeId);
    prijavaLink.appendChild(document.createTextNode(linkText));
    prijavaListItem.appendChild(prijavaLink);
    menuList.appendChild(prijavaListItem);
}

function removeMenuItem(attributeId){
    try{
        menuList = document.getElementById('menu');
        menuItem = document.getElementById(attributeId);
        if(menuItem && menuList.contains(menuItem))
            menuList.removeChild(menuItem);
        }
    catch(ex){

    }
}