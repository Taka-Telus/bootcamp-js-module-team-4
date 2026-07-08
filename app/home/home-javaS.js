const apiUrl = "https://quiz-api.cesar-kastli.workers.dev/games";
const yourGames = document.getElementById('your-games');

async function getGames() {
            try {
                const respuesta = await fetch (apiUrl);
                const datos = await respuesta.json();
                
                console.log(datos)

                datos.forEach((dato, index) => {
                    const li = document.createElement("li");
                    li.innerHTML = `
                    <div id='si'>
                    <span> titulo: ${dato.title}</span>
                    <img src='${dato.image}'></img>
                    <button>Editar</button>
                    <button>Jugar</button>
                    </div>`;
                    yourGames.appendChild(li);
                });
            } catch (error) {
                // console.error(`Error al conectar con la API: ${error}`);
            }
        }
        getGames()


