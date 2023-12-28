window.onload = function(){
    usernameElement = document.getElementById('username');
    passwordElement = document.getElementById('password');
    document.getElementById('submit_button').addEventListener('click',function(){
        PoziviAjax.postLogin(usernameElement.value, passwordElement.value, updateMenu);
    });
}

function updateMenu(error,data){
    if(error){
        displayErrorMessage();
        return;
    }
    const iframe = document.getElementById('meni');
    const iframeContent = iframe.contentWindow;

    iframeContent.postMessage({
        action: 'displayOdjavaAndProfil',
        data: data,
        error: error
    },'http://localhost:3000/meni.html');
    window.location.replace("http://localhost:3000/nekretnine.html");
}

function displayErrorMessage(){
    document.getElementById('error_message').textContent = 'Login credentials are not valid';
}


