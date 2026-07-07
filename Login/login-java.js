
const nicknameInput = document.getElementById("nickname-player");
const nicknameButton = document.getElementById("nickname-button");
const form = document.getElementById("nickname-container");
const error = document.getElementById("nickname-error");

function esVacio(texto) {
    return texto.trim().length === 0;
}
function alMenos3Caracteres(texto) {
    return texto.length >= 3;
}


nicknameButton.addEventListener("click", (e) => {
    e.preventDefault();
    let nombre = nicknameInput.value

    if (!esVacio(nombre) && alMenos3Caracteres(nombre)) {
        error.textContent = ``;
        localStorage.setItem('nickname', nicknameInput.value);

    } else {
        error.textContent = `Error`
    }
});
