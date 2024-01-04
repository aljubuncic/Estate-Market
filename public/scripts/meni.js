window.onload = function(){
    PoziviAjax.getKorisnik(function(error,data){
        if(data)
            displayAccordingMenuItems(true);
        else
            displayAccordingMenuItems(false);
    });
}

document.getElementById('odjava').addEventListener('click',function(event){
    event.preventDefault();
    PoziviAjax.postLogout(function(error,data){
        if(data)
            displayAccordingMenuItems(false)
    });
}); 

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
        displayMenuItem('prijava');
    }
    else{
        removeMenuItem('prijava');
        displayMenuItem('odjava');
        displayMenuItem('profil');
    }
}

function displayMenuItem(attributeId){
    let menuItemLink = document.getElementById(attributeId);
    menuItemLink.style.display = '';
}

function removeMenuItem(attributeId){
    
    let menuItemLink = document.getElementById(attributeId);
    menuItemLink.style.display = 'none';
}