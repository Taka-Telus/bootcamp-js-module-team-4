
const nicknameInput = document.getElementById("nickname-player");
const nicknameButton = document.getElementById("nickname-button");
const form = document.getElementById("nickname-container");
const error = document.getElementById("nickname-error");
error.style.display = 'none';


function esVacio(texto) {
    return texto.trim().length === 0;
}
function alMenos3Caracteres(texto) {
    return texto.length >= 3;
}
function largoDelNombre(texto) {
    return texto.trim().length <= 15;
}


nicknameButton.addEventListener("click", (e) => {
    e.preventDefault();
    let nombre = nicknameInput.value
    
    if (!esVacio(nombre) && alMenos3Caracteres(nombre) && largoDelNombre(nombre)) {
        error.style.display = 'none';
        localStorage.setItem('nickname', nicknameInput.value);

         window.location.href = "../home/home.html" ;
    } else {
        mensajeError = 'Completa con al menos con 3 caracteres'
        
        if (!largoDelNombre(nombre)){
            mensajeError = 'El Maximo de caracteres es de 15'
        }
        error.textContent = mensajeError;
        error.style.display = 'block';
    }
});
