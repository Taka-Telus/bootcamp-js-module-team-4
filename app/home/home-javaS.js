const apiUrlGames = "https://quiz-api.cesar-kastli.workers.dev/games";
const apiUrlPoints = "https://quiz-api.cesar-kastli.workers.dev/scores"; // esperar al nuevo point general en la API
const yourGames = document.getElementById('yourGames');
const errorHTML = document.getElementById('opacity');

function welcome() {
    const nickname = localStorage.getItem('nickname')

    if (!nickname == "") {

        const saludo = document.getElementById('saludo');
        saludo.innerHTML = `
        Ready for the challenge, ${nickname}
        `
    } else {
        window.location.href = "../Login/login.html";
    }

}

async function getPointsPlayer() {
    try {
        const respuestaPoints = await fetch(apiUrlPoints);  //no existe el score
        const points = await respuestaPoints.json();
        const puntajeHTML = document.getElementById('puntaje');

        points.forEach((puntaje) => {

            if (puntaje.playerName == nickname) {
                puntajeHTML.innerHTML = `${puntaje.score}`;
            }
        });
    } catch {
        errorHTML.style.display = 'flex';
    }
    if (puntaje.score <= 0) {
        puntajeHTML.innerHTML = `0`;
    }

}

async function getGames() {
    try {
        const respuestaGames = await fetch(apiUrlGames);
        const games = await respuestaGames.json();

        games.forEach((game) => {

            const li = document.createElement("li");
            li.innerHTML = `
                <div id='games'>
                    <div class='imgGameContainer'>
                        <img src='${game.image}' class='imgGame'>
                    </div>
                    <div class='contentGame'>
                        <span class='tittleGame'>${game.title}</span>

                        <p>${game.questionCount} - ${game.difficulty}</p>

                        <div class='buttonsGame'>
                            <button class='playButton'>
                                <span class="material-icons">play_arrow</span>PLAY
                            </button>
                            <button class='editButton'>
                                <span class="material-icons">edit</span>
                            </button>
                        </div>  
                    </div>  
                </div>`;

            yourGames.appendChild(li);

            const playButton = li.querySelector(".playButton");

            playButton.addEventListener("click", () => {
                console.log("Jugando:", game.title);

                window.location.href = `../game-screen/game-screen.html?id=${game.id}`;;
            });
        });

    } catch (error) {
        errorHTML.style.display = 'flex';
    }
}

document.getElementById('createButton').addEventListener("click", () => {
    window.location.href = "../createEditGame/createEdit.html";
});

welcome()
getPointsPlayer()
getGames()

