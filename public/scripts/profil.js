PoziviAjax.getKorisnik(displayUser);

function displayUser(error,data){
    if(error)
       return;
    document.getElementById('div_ime_input').getElementsByTagName('input')[0].value = data.ime; 
    document.getElementById('div_prezime_input').getElementsByTagName('input')[0].value = data.prezime; 
    document.getElementById('div_username_input').getElementsByTagName('input')[0].value = data.username; 
    document.getElementById('div_password_input').getElementsByTagName('input')[0].value = data.password; 
}