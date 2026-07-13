const apiUrl = "https://quiz-api.cesar-kastli.workers.dev/games";
const yourGames = document.getElementById('yourGames');

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

async function getGames() {
    try {
        const respuesta = await fetch(apiUrl);
        const games = await respuesta.json();

        games.forEach((game, index) => {
            console.log(games); 
            const li = document.createElement("li");
            li.innerHTML = `
                    <div id='games'>
                        <div class='imgGameContainer'>
                            <img src='${game.image}' class='imgGame'></img>
                        </div>
                        <div class='contentGame'>
                            <span class='tittleGame'>${game.title}</span>

                            <p>${game.questionCount} - ${game.difficulty}</p>

                            <div class='buttonsGame'>
                                <button class='playButton' id='play-${game.id}'><span class="material-icons">play_arrow</span>PLAY</button>
                                <button class='editButton' id='edit-${game.id}'><span class="material-icons">edit</span></button>
                            </div>  
                        </div>  
                    </div>`;
            yourGames.appendChild(li);
        });
    } catch (error) {
        const li = document.createElement("li");
        li.innerHTML = `Error al conectar con la API: ${error}` //terminar esta aprte
    }
}

getGames()
welcome()

